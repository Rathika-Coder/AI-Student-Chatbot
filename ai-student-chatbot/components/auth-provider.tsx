"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { students } from "@/lib/mock-data"
import type { Student } from "@/lib/types"

interface AuthContextValue {
  student: Student | null
  loading: boolean
  login: (id: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = "dte_student_session"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setStudent(JSON.parse(raw))
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  const login = (id: string, password: string) => {
    const match = students.find(
      (s) => s.id.toLowerCase() === id.trim().toLowerCase() && s.password === password,
    )
    if (!match) {
      return { ok: false, error: "Invalid Student ID or password. Try DTE2023CS045 / student123." }
    }
    setStudent(match)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(match))
    return { ok: true }
  }

  const logout = () => {
    setStudent(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ student, loading, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
