"use server"

import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export async function deleteTestResult(formData: FormData) {
  const id = formData.get("id")?.toString()

  if (!id) {
    throw new Error("No form data")
  }

  const result = await db.testResult.findUnique({
    where: { id: Number(id) },
    include: {
      eventLogs: true,
      voiceRecords: true,
      student: true,
      test: { include: { questions: { include: { answers: true } } } },
    },
  })

  if (!result) throw new Error("No test result")

  await db.testResult.delete({ where: { id: Number(id) } })

  redirect("/dashboard/tests-results")
}

export async function updateTestResult(formData: FormData) {
  const id = formData.get("id")?.toString()
  const digit = formData.get("digit")?.toString()
  const letter = formData.get("letter")?.toString()
  const percent = formData.get("percent")?.toString()

  if (!id || !digit || !letter || !percent) {
    throw new Error("No form data")
  }

  await db.testResult.update({
    where: { id: Number(id) },
    data: {
      digit,
      letter,
      percent: Number(percent),
    },
  })

  redirect(`/dashboard/tests-results/${id}`)
}
