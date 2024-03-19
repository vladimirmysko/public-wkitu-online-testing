"use server"

import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export async function deleteAllStudents() {
  await db.student.deleteMany()
  redirect("/dashboard/students")
}
