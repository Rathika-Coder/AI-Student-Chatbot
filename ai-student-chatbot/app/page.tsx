"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap, Lock, User, Loader2, Info } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEPARTMENT_NAME, INSTITUTE_NAME } from "@/lib/mock-data"

export default function LoginPage() {
  const router = useRouter()
  const { student, loading, login } = useAuth()
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && student) router.replace("/dashboard")
  }, [loading, student, router])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    setTimeout(() => {
      const res = login(id, password)
      if (res.ok) {
        router.replace("/dashboard")
      } else {
        setError(res.error ?? "Login failed")
        setSubmitting(false)
      }
    }, 600)
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <section className="relative hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GraduationCap className="size-6" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{INSTITUTE_NAME}</p>
            <p className="text-xs text-sidebar-foreground/70">{DEPARTMENT_NAME}</p>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="text-balance text-3xl font-semibold leading-tight">
            Your AI-powered campus assistant, available around the clock.
          </h1>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-sidebar-foreground/70">
            Get instant answers about exam schedules, attendance, scholarships, placements, and
            department notices — all in one place.
          </p>
          <ul className="mt-8 grid gap-3 text-sm">
            {["Exam schedules & results", "Attendance & scholarship help", "Placement & course updates"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3 text-sidebar-foreground/80">
                  <span className="size-1.5 rounded-full bg-sidebar-primary" aria-hidden="true" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <p className="text-xs text-sidebar-foreground/50">
          {"© "}
          {new Date().getFullYear()} {INSTITUTE_NAME}. For demonstration purposes.
        </p>
      </section>

      {/* Form panel */}
      <section className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center text-center lg:hidden">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-7" aria-hidden="true" />
            </div>
            <p className="mt-3 font-semibold text-foreground">{INSTITUTE_NAME}</p>
            <p className="text-xs text-muted-foreground">{DEPARTMENT_NAME}</p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground">Student Sign In</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your credentials to access the student portal.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="studentId">Student ID</Label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="studentId"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="DTE2023CS045"
                  autoComplete="username"
                  required
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="pl-9"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 flex items-start gap-2 rounded-lg border border-border bg-muted/50 p-3 text-xs text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <p>
              <span className="font-medium text-foreground">Demo credentials:</span> ID{" "}
              <code className="rounded bg-background px-1 py-0.5 font-mono">DTE2023CS045</code>, password{" "}
              <code className="rounded bg-background px-1 py-0.5 font-mono">student123</code>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
