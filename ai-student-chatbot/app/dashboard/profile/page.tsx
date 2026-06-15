"use client"

import { useRouter } from "next/navigation"
import {
  Mail,
  Phone,
  IdCard,
  Building2,
  GraduationCap,
  CalendarDays,
  TrendingUp,
  CalendarCheck,
  Hash,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const { student, logout } = useAuth()
  const router = useRouter()
  if (!student) return null

  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")

  const academic = [
    { label: "Student ID", value: student.id, icon: Hash },
    { label: "Register Number", value: student.registerNumber, icon: IdCard },
    { label: "Department", value: student.department, icon: Building2 },
    { label: "Course", value: student.course, icon: GraduationCap },
    { label: "Semester", value: student.semester, icon: CalendarDays },
    { label: "Admission Year", value: student.admissionYear, icon: CalendarDays },
  ]

  const contact = [
    { label: "Email", value: student.email, icon: Mail },
    { label: "Phone", value: student.phone, icon: Phone },
  ]

  const performance = [
    { label: "Current CGPA", value: student.cgpa, icon: TrendingUp },
    { label: "Attendance", value: student.attendance, icon: CalendarCheck },
  ]

  function handleLogout() {
    logout()
    router.replace("/")
  }

  return (
    <>
      <PageHeader title="Profile" description="Your account and academic details" />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {/* Header card */}
        <Card className="overflow-hidden">
          <div className="bg-sidebar px-6 py-8 text-sidebar-foreground">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <Avatar className="size-20 border-2 border-sidebar-primary">
                <AvatarFallback className="bg-sidebar-primary text-xl font-semibold text-sidebar-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{student.name}</h2>
                <p className="mt-1 text-sm text-sidebar-foreground/70">
                  {student.course} · {student.semester}
                </p>
                <p className="mt-0.5 text-sm text-sidebar-foreground/70">{student.id}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Academic info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {academic.map((item) => (
                <InfoRow key={item.label} {...item} />
              ))}
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {performance.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="size-4" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="text-lg font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Contact info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {contact.map((item) => (
              <InfoRow key={item.label} {...item} />
            ))}
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end">
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="size-4" aria-hidden="true" />
            Log Out
          </Button>
        </div>
      </div>
    </>
  )
}

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="size-4" aria-hidden={true} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
