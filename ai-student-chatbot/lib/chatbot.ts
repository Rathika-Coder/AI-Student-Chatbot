import type { Student } from "./types"

interface Rule {
  keywords: string[]
  answer: (student: Student | null) => string
}

const rules: Rule[] = [
  {
    keywords: ["exam", "schedule", "timetable exam", "end sem", "test date"],
    answer: () =>
      "The 5th semester theory examinations begin on 18 December 2026, with practical exams from 8 December. Hall tickets will be issued one week prior. You can view the full timetable on the exam portal or under the Notices section.",
  },
  {
    keywords: ["attendance", "present", "minimum attendance", "absent"],
    answer: (s) =>
      `As per department policy, a minimum of 75% attendance is mandatory in every subject to appear for end-semester exams.${
        s ? ` Your current attendance is ${s.attendance}.` : ""
      } If you fall below 75%, you must submit a condonation request with valid documents.`,
  },
  {
    keywords: ["scholarship", "fee waiver", "financial aid", "stipend"],
    answer: () =>
      "Post-Matric Scholarship applications for 2026-27 are currently open. Submit your income certificate, bank passbook, and previous marksheet to the scholarship desk by 30 June 2026. You can apply online through the state scholarship portal.",
  },
  {
    keywords: ["placement", "job", "recruit", "company", "interview", "career"],
    answer: () =>
      "TechWave Solutions is conducting an on-campus placement drive on 25 June 2026 for students with a CGPA of 7.5 and above. Register at the placement cell before 20 June. More drives will be announced in the Notices section.",
  },
  {
    keywords: ["timetable", "class schedule", "period", "lecture"],
    answer: (s) =>
      `Your weekly class timetable${
        s ? ` for ${s.semester}, ${s.department},` : ""
      } is shared by your class coordinator and displayed on the department board. Classes run Monday to Friday, 9:00 AM to 4:30 PM, with lab sessions in the afternoon.`,
  },
  {
    keywords: ["course", "subject", "syllabus", "curriculum", "credits"],
    answer: (s) =>
      `${
        s ? `You are enrolled in the ${s.course}. ` : ""
      }The current semester includes core subjects, laboratory work, and a mini-project. Detailed syllabus and credit distribution are available on the department portal under Academics.`,
  },
  {
    keywords: ["notice", "announcement", "circular", "update"],
    answer: () =>
      "Recent department notices include the Semester 5 exam timetable, the TechWave placement drive, and open scholarship applications. Visit the Notices section for the complete list of announcements.",
  },
  {
    keywords: ["cgpa", "grade", "marks", "result", "gpa"],
    answer: (s) =>
      s
        ? `Your current CGPA is ${s.cgpa}. Individual semester results are published on the exam portal. For revaluation requests, contact the exam cell within 7 days of result declaration.`
        : "Semester results are published on the exam portal. For revaluation, contact the exam cell within 7 days of result declaration.",
  },
  {
    keywords: ["certificate", "bonafide", "document", "transcript"],
    answer: () =>
      "To request a bonafide or course certificate, submit a written application at the department office with your registration number. Certificates are usually issued within 3-5 working days.",
  },
  {
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    answer: (s) =>
      `Hello${s ? ` ${s.name.split(" ")[0]}` : ""}! I'm your Department Assistant. You can ask me about exam schedules, attendance, scholarships, placements, timetables, and more. How can I help you today?`,
  },
  {
    keywords: ["thank", "thanks", "thank you"],
    answer: () => "You're welcome! Feel free to ask if you have any other questions about your academics.",
  },
]

export function getBotResponse(message: string, student: Student | null): string {
  const text = message.toLowerCase()
  for (const rule of rules) {
    if (rule.keywords.some((k) => text.includes(k))) {
      return rule.answer(student)
    }
  }
  return "I'm not sure about that yet, but I can help with exam schedules, attendance rules, scholarships, placement updates, timetables, course information, and department notices. Try asking one of those, or use the quick-action buttons below."
}
