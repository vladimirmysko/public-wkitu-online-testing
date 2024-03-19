import { NextRequest, NextResponse } from "next/server"
import { Settings } from "@prisma/client"
import { db } from "@/lib/db"

export const revalidate = 0

export async function POST(request: NextRequest) {
  const {
    id,
    eventLogging,
    faceCheck,
    minutesToTest,
    questionsPerTest,
    secondsToSkip,
    voiceRecording,
    isTestingStarted,
  } = (await request.json()) as Settings

  const settings = await db.settings.update({
    where: { id },
    data: {
      eventLogging,
      faceCheck,
      minutesToTest,
      questionsPerTest,
      secondsToSkip,
      voiceRecording,
      isTestingStarted,
    },
  })

  return NextResponse.json(settings)
}
