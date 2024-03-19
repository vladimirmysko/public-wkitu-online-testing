"use server"

import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export async function addStudent(formData: FormData) {
  const fullName = formData.get("full_name")!.toString()
  const iin = formData.get("iin")!.toString()
  const group = formData.get("group")!.toString()
  const isActive = formData.get("is_active")?.toString()

  console.log({ fullName, iin, group, isActive })

  let groupFromDb = await db.group.findFirst({ where: { name: group } })

  if (!groupFromDb) {
    groupFromDb = await db.group.create({ data: { name: group } })
  }

  await db.student.create({
    data: {
      fullName,
      iin,
      isActive: isActive ? true : false,
      groupId: groupFromDb.id,
    },
  })

  redirect("/dashboard/students")
}
