import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

interface ICreateTestResultDto {
  answers: number[]
  studentdId: number
  testId: number
}

export async function POST(request: NextRequest) {
  const { answers, studentdId, testId }: ICreateTestResultDto =
    await request.json()

  const student = await db.student.findUnique({ where: { id: studentdId } })
  const settings = await db.settings.findFirst()

  if (!student || !settings)
    return NextResponse.json("Student or settings not found", { status: 404 })

  const _answersId = answers.slice(0, settings.questionsPerTest)

  for (let answerId of _answersId) {
    await db.studentAnswer.create({
      data: { answerId: Number(answerId), studentId: student.id },
    })
  }

  const rightAnswers = await db.answer.findMany({
    where: { isRight: true },
  })

  const intersection = rightAnswers.filter((a) => _answersId.includes(a.id))

  const percent = Math.round(
    100 * (intersection.length / settings.questionsPerTest),
  )

  const score = await db.scoreComparison.findFirst({
    where: { start: { lte: percent }, end: { gte: percent } },
  })

  console.log({
    _answersId: _answersId,
    intersection: intersection,
    percent: percent,
    questionsPerTest: settings.questionsPerTest,
    score: score,
  })

  if (!score) return NextResponse.json("Score not found", { status: 404 })

  const testResult = await db.testResult.create({
    data: {
      addedAt: new Date(Date.now()),
      digit: score.digit + "",
      letter: score.letter,
      percent: percent,
      studentId: student.id,
      testId: testId,
    },
  })

  return NextResponse.json(testResult)
}
