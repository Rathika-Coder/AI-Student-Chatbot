"use client"

import { useState } from "react"
import { Search, HelpCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/mock-data"

export default function FaqsPage() {
  const [query, setQuery] = useState("")

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(query.toLowerCase()) ||
      f.answer.toLowerCase().includes(query.toLowerCase()) ||
      f.category.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <>
      <PageHeader title="FAQs" description="Common student queries answered" />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-5 p-4 md:p-6">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search frequently asked questions…"
            aria-label="Search FAQs"
            className="pl-9"
          />
        </div>

        <Card>
          <CardContent className="px-5 py-1">
            {filtered.length > 0 ? (
              <Accordion>
                {filtered.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger>
                      <span className="flex items-start gap-3 pr-2">
                        <HelpCircle
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pl-7 leading-relaxed text-muted-foreground text-pretty">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No FAQs match your search.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
