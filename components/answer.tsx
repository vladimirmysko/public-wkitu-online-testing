"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface Answer {
  id: number
  checked: boolean
}

interface IAnswerProps extends React.HTMLAttributes<HTMLDivElement> {
  answerId: number
  blob: string
  onAnswerChange: (answer: Answer) => void
}

export const Answer: React.FC<IAnswerProps> = ({
  className,
  answerId,
  blob,
  onAnswerChange,
  ...props
}) => {
  return (
    <div className={cn("flex", className)} {...props}>
      <input
        className="peer sr-only"
        type="checkbox"
        id={`answer-${answerId}`}
        name="answers"
        value={answerId}
        onChange={(e) =>
          onAnswerChange({
            id: Number(e.target.value),
            checked: e.target.checked,
          })
        }
      />
      <label
        className={cn(
          "cursor-pointer rounded-md border border-zinc-200 bg-white p-3 hover:border-zinc-400 peer-checked:border-blue-ribbon-500 peer-checked:bg-blue-ribbon-500/20",
          className,
        )}
        htmlFor={`answer-${answerId}`}
      >
        <Image
          className="rounded"
          src={`data:image/png;base64, ${blob}`}
          alt={`answer-image-${answerId}`}
          width={0}
          height={0}
          style={{ width: "auto", height: "auto" }}
        />
      </label>
    </div>
  )
}
