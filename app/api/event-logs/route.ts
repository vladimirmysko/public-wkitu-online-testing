import { NextRequest, NextResponse } from "next/server"
import { Options, PythonShell } from "python-shell"
import { db } from "@/lib/db"
import fs from "fs"

export const revalidate = 0

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const file = formData.get("video") as unknown as File
  const screenFile = formData.get("screen") as unknown as File
  const iin = formData.get("iin") as unknown as string
  const resultId = formData.get("resultId") as unknown as string
  const testId = formData.get("testId") as unknown as string
  const videoFormat = formData.get("videoFormat") as unknown as string
  const language = formData.get("language") as unknown as string

  const savePath = `${process.env.STORAGE_VIDEOS}/${iin}/${testId}`

  const settings = await db.settings.findFirst()
  if (!settings) return NextResponse.json("Settings not found", { status: 404 })

  try {
    await fs.promises.access(savePath)
  } catch {
    await fs.promises.mkdir(savePath, { recursive: true })
  }

  const stream = file.stream()
  await stream.pipeTo(
    new WritableStream({
      write(chunk) {
        return new Promise((resolve, reject) => {
          const buffer = Buffer.from(chunk)
          fs.appendFileSync(`${savePath}/webcam.${videoFormat}`, buffer)
          resolve()
        })
      },
      abort(err) {
        console.log("Sink error:", err)
      },
    }),
  )

  if (screenFile) {
    const screenStream = screenFile.stream()
    await screenStream.pipeTo(
      new WritableStream({
        write(chunk) {
          return new Promise((resolve, reject) => {
            const buffer = Buffer.from(chunk)
            fs.appendFileSync(`${savePath}/screen.webm`, buffer)
            resolve()
          })
        },
        abort(err) {
          console.log("Sink error:", err)
        },
      }),
    )
  }

  const options: Options = {
    mode: "text",
    pythonPath: process.env.PYTHON_PATH,
    args: [
      String(resultId),
      String(`${savePath}/webcam.${videoFormat}`),
      String(settings.secondsToSkip),
    ],
  }

  const workingService = await db.workingService.create({
    data: { name: `Logs for result with id ${resultId}`, status: "WORKING" },
  })

  PythonShell.run(process.env.PYTHON_SCRIPT_VIDEO_ANALYSIS as string, options)
    .then(async (messages) => {
      console.log(`Logs for result with id ${resultId} created`)

      await db.workingService.update({
        where: { id: workingService.id },
        data: { status: "DONE" },
      })

      if (settings.voiceRecording) {
        const voiceOptions: Options = {
          mode: "text",
          pythonPath: process.env.PYTHON_PATH,
          args: [
            String(`${savePath}/webcam_converted.mp4`),
            String(language),
            String(resultId),
          ],
        }

        PythonShell.run(
          process.env.PYTHON_SCRIPT_VOICE_ANALYSIS as string,
          voiceOptions,
        )
          .then((message) =>
            console.log(`Voice record for result with id ${resultId} created`),
          )
          .catch((err) => {
            console.log(
              `Get error for result with id ${resultId} with message: ${err}`,
            )
          })
      }
    })
    .catch(async (err) => {
      console.log(
        `Get error for result with id ${resultId} with message: ${err}`,
      )

      await db.workingService.update({
        where: { id: workingService.id },
        data: { status: "ERROR", error: String(err) },
      })
    })

  return NextResponse.json({ success: true })
}
