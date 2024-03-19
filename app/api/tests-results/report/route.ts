import { NextRequest, NextResponse } from "next/server"
import { json2csv } from "json-2-csv"
import { nanoid } from "nanoid"
import { db } from "@/lib/db"
import fs from "fs"

export const revalidate = 0

export async function GET(request: NextRequest) {
  const rawResults = await db.testResult.findMany({
    orderBy: { addedAt: "desc" },
    include: { test: true, student: { include: { group: true } } },
  })

  const results = rawResults.map((r) => ({
    id: r.id,
    fullName: r.student.fullName,
    group: r.student.group.name,
    discipline: r.test.discipline,
    digit: r.digit,
    letter: r.letter,
    percent: r.percent,
    addedAt: r.addedAt,
  }))

  console.log(results.length)

  const csv = await json2csv(results)
  const fileName = nanoid()
  const savePath = `${process.env.STORAGE_TESTS_RESULTS}/${fileName}.csv`

  await fs.promises.writeFile(savePath, csv, {
    encoding: "utf-8",
  })

  const file = await fs.promises.readFile(savePath)
  const blob = new Blob([
    new Uint8Array(file.buffer, file.byteOffset, file.byteLength),
  ])

  const headers = new Headers()
  headers.set("Content-Type", "text/csv; charset=utf-8")

  return new NextResponse(blob, { status: 200, statusText: "OK", headers })
}
