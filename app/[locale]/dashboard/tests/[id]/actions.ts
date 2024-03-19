"use server"

import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export async function deleteTest(formData: FormData) {
  const id = formData.get("id")?.toString()

  if (!id) {
    throw new Error("No form data")
  }

  const test = await db.test.findUnique({
    where: { id: Number(id) },
  })

  if (!test) throw new Error("No test")

  await db.test.delete({ where: { id: Number(id) } })

  redirect("/dashboard/tests")
}
