"use server"

import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"

export async function checkIin(iin: string) {
  const t = await getI18n()

  const student = await db.student.findFirst({ where: { iin } })
  const settings = await db.settings.findFirst()

  if (!student || !settings) throw new Error(t("errors.student_not_found"))

  if (settings.faceCheck) redirect(`/biometry/face/${iin}`)
  else redirect(`/biometry/test/${iin}`)
}
