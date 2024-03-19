"use client"

import Image from "next/image"
import { useI18n } from "@/locales/client"
import { cn } from "@/lib/utils"

interface IQuestionsListProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IQuestionProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number
  questionId: number
  blob: string
}

export function QuestionsList({ className, ...props }: IQuestionsListProps) {
  return (
    <div
      className={cn("flex flex-col items-stretch gap-8", className)}
      {...props}
    />
  )
}

export function Question({
  children,
  className,
  number,
  questionId,
  blob,
  ...props
}: IQuestionProps) {
  const t = useI18n()

  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-4 rounded-lg border-0 bg-white p-4 shadow-lg ring-1 ring-zinc-950/10",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-start gap-2">
        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {t("testing.question", { number })}
        </div>
        <Image
          className="rounded"
          src={`data:image/png;base64, ${blob}`}
          alt={`question-image-${questionId}`}
          width={0}
          height={0}
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {t("testing.answers")}
        </div>
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </div>
  )
}
