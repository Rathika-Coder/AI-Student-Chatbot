import type { Student, Notice, Faq } from "./types"

export const DEPARTMENT_NAME = "Department of Technical Education"
export const INSTITUTE_NAME = "Govt. Polytechnic College"

export const students: Student[] = [
  {
    id: "DTE2023CS045",
    password: "student123",
    name: "Aarav Sharma",
    registerNumber: "21CS045",
    department: "Computer Engineering",
    semester: "5th Semester",
    email: "aarav.sharma@dte.edu.in",
    phone: "+91 98765 43210",
    course: "Diploma in Computer Engineering",
    admissionYear: "2021",
    cgpa: "8.7",
    attendance: "86%",
  },
  {
    id: "DTE2023ME012",
    password: "student123",
    name: "Priya Nair",
    registerNumber: "21ME012",
    department: "Mechanical Engineering",
    semester: "3rd Semester",
    email: "priya.nair@dte.edu.in",
    phone: "+91 99887 76655",
    course: "Diploma in Mechanical Engineering",
    admissionYear: "2022",
    cgpa: "9.1",
    attendance: "92%",
  },
]

export const notices: Notice[] = [
  {
    id: "n1",
    title: "Semester 5 End Exam Timetable Released",
    body: "The theory examination for 5th semester begins on 18 December 2026. The detailed timetable is available on the exam portal. Practical exams will be conducted from 8 December. Students must carry their hall tickets.",
    category: "Exam",
    date: "2026-06-10",
    pinned: true,
  },
  {
    id: "n2",
    title: "Campus Placement Drive - TechWave Solutions",
    body: "TechWave Solutions will conduct an on-campus recruitment drive on 25 June 2026 for final year diploma students. Eligible CGPA: 7.5 and above. Register at the placement cell before 20 June.",
    category: "Placement",
    date: "2026-06-08",
    pinned: true,
  },
  {
    id: "n3",
    title: "Post-Matric Scholarship Applications Open",
    body: "Applications for the State Post-Matric Scholarship 2026-27 are now open. Submit income certificate, bank passbook, and previous marksheet to the scholarship desk by 30 June 2026.",
    category: "Scholarship",
    date: "2026-06-05",
  },
  {
    id: "n4",
    title: "Annual Technical Symposium - TechnoVision 2026",
    body: "The department is hosting TechnoVision 2026 on 12 July. Events include project expo, coding contest, and robotics challenge. Register your teams with the student coordinator.",
    category: "Event",
    date: "2026-06-02",
  },
  {
    id: "n5",
    title: "Revised Attendance Policy Notice",
    body: "As per the updated norms, a minimum of 75% attendance is mandatory to appear for end-semester examinations. Students below the threshold must submit a condonation request with valid documents.",
    category: "General",
    date: "2026-05-28",
  },
  {
    id: "n6",
    title: "Library Working Hours Extended",
    body: "During the exam period (1-20 December), the central library will remain open from 8:00 AM to 9:00 PM on all working days including Saturdays.",
    category: "General",
    date: "2026-05-20",
  },
]

export const faqs: Faq[] = [
  {
    id: "f1",
    question: "How do I check my exam timetable?",
    answer:
      "Exam timetables are published on the department notice board and the exam portal. You can also ask the Chat Assistant 'exam schedule' to get the latest dates instantly.",
    category: "Exams",
  },
  {
    id: "f2",
    question: "What is the minimum attendance required to write exams?",
    answer:
      "A minimum of 75% attendance is mandatory in each subject to be eligible for the end-semester examination. Students below this must apply for condonation with valid proof.",
    category: "Attendance",
  },
  {
    id: "f3",
    question: "How can I apply for a scholarship?",
    answer:
      "Submit your income certificate, bank passbook copy, and previous marksheet to the scholarship desk. Online applications are accepted via the state scholarship portal. Deadlines are announced under Notices.",
    category: "Scholarships",
  },
  {
    id: "f4",
    question: "When are the placement drives conducted?",
    answer:
      "Placement drives are organised throughout the final year. Keep an eye on the Notices section and register with the placement cell to be eligible for company drives.",
    category: "Placements",
  },
  {
    id: "f5",
    question: "How do I get a bonafide or course certificate?",
    answer:
      "Submit a written request at the department office along with your registration number. Certificates are typically issued within 3-5 working days.",
    category: "General",
  },
  {
    id: "f6",
    question: "Where can I find my class timetable?",
    answer:
      "Your weekly class timetable is shared by your class coordinator and is also displayed on the department board. Ask the Chat Assistant 'timetable' for a quick summary.",
    category: "Timetable",
  },
]

export const quickActions = [
  "Exam Schedule",
  "Attendance Rules",
  "Scholarships",
  "Placement Updates",
  "Timetable",
  "Course Information",
]
