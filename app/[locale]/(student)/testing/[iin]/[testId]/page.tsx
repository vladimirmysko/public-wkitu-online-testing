import { redirect } from "next/navigation"
import { db } from "@/lib/db"

import { Client } from "./client"

interface ITestingProps {
  params: {
    iin: string
    testId: string
  }
}

export const revalidate = 0

export default async function Testing({ params }: ITestingProps) {
  const student = await db.student.findFirst({ where: { iin: params.iin } })
  if (!student) redirect("/biometry/iin")

  const result = await db.testResult.findFirst({
    where: {
      AND: [{ testId: Number(params.testId) }, { studentId: student.id }],
    },
  })
  if (result) redirect(`/results/${params.iin}`)

  const settings = await db.settings.findFirst()
  const test = await db.test.findUnique({
    where: { id: Number(params.testId) },
    include: { questions: { include: { answers: true } } },
  })

  if (!student || !settings || !test || !student.isActive)
    redirect("/biometry/iin")

  if (!settings.isTestingStarted) {
    redirect("/information")
  }

  const questions = test.questions
    .map((question) => ({
      ...question,
      blob: question.blob.toString("base64"),
      answers: question.answers
        .map((answer) => ({
          ...answer,
          blob: answer.blob.toString("base64"),
        }))
        .sort(() => 0.5 - Math.random()),
    }))
    .sort(() => 0.5 - Math.random())
    .slice(0, settings.questionsPerTest)

  return (
    <Client
      isCapturing={settings.eventLogging || settings.voiceRecording}
      settings={settings}
      student={{ id: student.id, fullName: student.fullName, iin: student.iin }}
      test={{
        id: test.id,
        discipline: test.discipline,
        language: test.language,
      }}
      questions={questions}
    />
  )
}
