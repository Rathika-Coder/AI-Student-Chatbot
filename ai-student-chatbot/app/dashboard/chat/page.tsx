"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { Bot, Send, Sparkles, Trash2, GraduationCap } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { getBotResponse } from "@/lib/chatbot"
import { quickActions } from "@/lib/mock-data"
import type { ChatMessage } from "@/lib/types"

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function ChatPage() {
  const { student } = useAuth()
  const storageKey = `dte_chat_history_${student?.id ?? "guest"}`

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Load history from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) {
        setMessages(JSON.parse(raw))
      } else {
        setMessages([
          {
            id: makeId(),
            role: "bot",
            content: `Hi${
              student ? ` ${student.name.split(" ")[0]}` : ""
            }! I'm your Department Assistant. Ask me about exam schedules, attendance, scholarships, placements, timetables, or course information.`,
            timestamp: Date.now(),
          },
        ])
      }
    } catch {
      // ignore
    }
    setHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  // Persist history
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(storageKey, JSON.stringify(messages))
    }
  }, [messages, hydrated, storageKey])

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, typing])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || typing) return
    const userMsg: ChatMessage = {
      id: makeId(),
      role: "user",
      content: trimmed,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTyping(true)

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: makeId(),
        role: "bot",
        content: getBotResponse(trimmed, student),
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, botMsg])
      setTyping(false)
    }, 900)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    send(input)
  }

  function clearChat() {
    const greeting: ChatMessage = {
      id: makeId(),
      role: "bot",
      content: "Chat cleared. How can I help you now?",
      timestamp: Date.now(),
    }
    setMessages([greeting])
  }

  return (
    <>
      <PageHeader title="Chat Assistant" description="Ask academic questions anytime" />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 p-4 md:p-6">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} studentInitials={initialsOf(student?.name)} />
            ))}

            {typing && (
              <div className="flex items-end gap-3">
                <BotAvatar />
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3">
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
                  <span className="sr-only">Assistant is typing</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-border bg-background">
          <div className="mx-auto w-full max-w-3xl p-4">
            <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1">
              <Sparkles className="size-4 shrink-0 text-primary" aria-hidden="true" />
              {quickActions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  disabled={typing}
                  className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                aria-label="Message"
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || typing} aria-label="Send">
                <Send className="size-4" aria-hidden="true" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={clearChat}
                aria-label="Clear chat history"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

function initialsOf(name?: string) {
  if (!name) return "ST"
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
}

function BotAvatar() {
  return (
    <Avatar className="size-8 shrink-0">
      <AvatarFallback className="bg-primary text-primary-foreground">
        <Bot className="size-4" aria-hidden="true" />
      </AvatarFallback>
    </Avatar>
  )
}

function MessageBubble({
  message,
  studentInitials,
}: {
  message: ChatMessage
  studentInitials: string
}) {
  const isUser = message.role === "user"
  return (
    <div className={cn("flex items-end gap-3", isUser && "flex-row-reverse")}>
      {isUser ? (
        <Avatar className="size-8 shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
            {studentInitials}
          </AvatarFallback>
        </Avatar>
      ) : (
        <BotAvatar />
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm border border-border bg-card text-card-foreground",
        )}
      >
        <p className="whitespace-pre-wrap text-pretty">{message.content}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  )
}
