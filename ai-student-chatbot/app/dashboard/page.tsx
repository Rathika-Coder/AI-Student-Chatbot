"use client"

import Link from "next/link"
import {
  IdCard,
  Building2,
  GraduationCap,
  CalendarDays,
  MessageSquare,
  Bell,
  TrendingUp,
  CalendarCheck,
  ArrowRight,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { notices, quickActions } from "@/lib/mock-data"

export default function DashboardHome() {
  const { student } = useAuth()
  if (!student) return null

  const detailItems = [
    { label: "Register Number", value: student.registerNumber, icon: IdCard },
    { label: "Department", value: student.department, icon: Building2 },
    { label: "Course", value: student.course, icon: GraduationCap },
    { label: "Semester", value: student.semester, icon: CalendarDays },
  ]

  const stats = [
    { label: "Current CGPA", value: student.cgpa, icon: TrendingUp },
    { label: "Attendance", value: student.attendance, icon: CalendarCheck },
    { label: "Active Notices", value: String(notices.length), icon: Bell },
  ]

  const recentNotices = notices.slice(0, 3)

  return (
    <>
      <PageHeader title="Home" description="Overview of your academic profile" />
      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        {/* Welcome / profile card */}
        <Card className="overflow-hidden">
          <div className="bg-sidebar px-6 py-6 text-sidebar-foreground">
            <p className="text-sm text-sidebar-foreground/70">Welcome back,</p>
            <h2 className="mt-0.5 text-2xl font-semibold">{student.name}</h2>
            <p className="mt-1 text-sm text-sidebar-foreground/70">
              {student.id} · Admitted {student.admissionYear}
            </p>
          </div>
          <CardContent className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {detailItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <item.icon className="size-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="truncate text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{stat.value}</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="size-5" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick assistant CTA */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="size-4 text-primary" aria-hidden="true" />
                Ask the Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Have a question? Get instant answers on these topics:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickActions.slice(0, 4).map((q) => (
                  <Badge key={q} variant="secondary" className="font-normal">
                    {q}
                  </Badge>
                ))}
              </div>
              <Button
                className="mt-1 w-full"
                nativeButton={false}
                render={
                  <Link href="/dashboard/chat">
                    Open Chat Assistant
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                }
              />
            </CardContent>
          </Card>

          {/* Recent notices */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="size-4 text-primary" aria-hidden="true" />
                Recent Notices
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href="/dashboard/notices">View all</Link>}
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {recentNotices.map((notice) => (
                <Link
                  key={notice.id}
                  href="/dashboard/notices"
                  className="flex items-start justify-between gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/60"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{notice.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{notice.body}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {notice.category}
                  </Badge>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
