"use client"

import { useState } from "react"
import { Pin, CalendarDays } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { notices } from "@/lib/mock-data"
import type { Notice } from "@/lib/types"

const categories = ["All", "Exam", "Placement", "Scholarship", "Event", "General"] as const

const categoryStyles: Record<Notice["category"], string> = {
  Exam: "bg-chart-5/15 text-chart-5",
  Placement: "bg-primary/15 text-primary",
  Scholarship: "bg-chart-3/15 text-chart-3",
  Event: "bg-chart-4/20 text-chart-4",
  General: "bg-muted text-muted-foreground",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function NoticesPage() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All")

  const filtered = notices.filter((n) => filter === "All" || n.category === filter)
  const sorted = [...filtered].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <>
      <PageHeader title="Notices" description="Department announcements and circulars" />
      <div className="flex flex-1 flex-col gap-5 p-4 md:p-6">
        {/* Filter chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-muted",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Notices list */}
        <div className="flex flex-col gap-4">
          {sorted.map((notice) => (
            <Card key={notice.id} className={cn(notice.pinned && "border-primary/40")}>
              <CardContent className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  {notice.pinned && (
                    <span className="flex items-center gap-1 text-xs font-medium text-primary">
                      <Pin className="size-3.5" aria-hidden="true" />
                      Pinned
                    </span>
                  )}
                  <Badge className={cn("border-0 font-medium", categoryStyles[notice.category])}>
                    {notice.category}
                  </Badge>
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" aria-hidden="true" />
                    {formatDate(notice.date)}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-foreground text-pretty">
                  {notice.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {notice.body}
                </p>
              </CardContent>
            </Card>
          ))}

          {sorted.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No notices in this category.
            </p>
          )}
        </div>
      </div>
    </>
  )
}
