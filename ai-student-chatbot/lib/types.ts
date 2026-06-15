export interface Student {
  id: string
  password: string
  name: string
  registerNumber: string
  department: string
  semester: string
  email: string
  phone: string
  course: string
  admissionYear: string
  cgpa: string
  attendance: string
}

export interface Notice {
  id: string
  title: string
  body: string
  category: "Exam" | "Placement" | "Scholarship" | "General" | "Event"
  date: string
  pinned?: boolean
}

export interface Faq {
  id: string
  question: string
  answer: string
  category: string
}

export interface ChatMessage {
  id: string
  role: "user" | "bot"
  content: string
  timestamp: number
}
