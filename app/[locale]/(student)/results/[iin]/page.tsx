import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"

import { Description } from "@/components/ui/description"
import { BackButton } from "./back-button"

interface IResultsProps {
  params: { iin: string }
}

export const revalidate = 0

export default async function Results({ params }: IResultsProps) {
  const t = await getI18n()

  const student = await db.student.findFirst({
    where: { iin: params.iin },
    include: { testResult: { include: { test: true } } },
  })

  if (!student) redirect("/biometry/iin")

  return (
    <div className="flex-rox flex min-h-screen p-4">
      <div className="m-auto flex w-full max-w-sm flex-col overflow-hidden rounded-lg border-0 bg-white shadow-lg ring-1 ring-zinc-950/10">
        <h2 className="p-3 text-center text-2xl font-semibold tracking-tighter text-zinc-950">
          {student.fullName}
        </h2>
        <div className="flex flex-col items-stretch">
          {student.testResult.map((testResult) => (
            <div
              className="flex flex-row items-start justify-between gap-3 border-t border-zinc-200 bg-white p-3"
              key={testResult.id}
            >
              <Description
                label={t("results.discipline")}
                text={testResult.test.discipline}
              />
              <Description
                label={t("results.percent")}
                text={testResult.percent + "%"}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-stretch border-t border-zinc-200 bg-zinc-50 p-3">
          <BackButton />
        </div>
      </div>
    </div>
  )
}
