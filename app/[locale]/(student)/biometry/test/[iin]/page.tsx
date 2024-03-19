import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"

import { TestSelectionForm } from "./form"

interface ITestSelectionProps {
  params: { iin: string }
}

export const revalidate = 0

export default async function TestSelection({ params }: ITestSelectionProps) {
  const t = await getI18n()

  const student = await db.student.findFirst({
    where: { iin: params.iin },
    include: { group: { include: { tests: true } } },
  })

  if (!student || !student.isActive) redirect("/biometry/iin")

  return (
    <>
      <h1 className="text-center text-2xl font-semibold tracking-tighter text-zinc-950">
        {t("biometry.select_test", { fullName: student.fullName })}
      </h1>
      <TestSelectionForm
        className="m-auto w-full max-w-sm"
        fullName={student.fullName}
        iin={student.iin}
        tests={student.group.tests}
      />
    </>
  )
}
