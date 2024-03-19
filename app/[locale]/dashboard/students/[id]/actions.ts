"use server"

import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export async function deleteStudent(formData: FormData) {
  const id = formData.get("id")?.toString()

  if (!id) {
    throw new Error("No form data")
  }

  const student = await db.student.findUnique({
    where: { id: Number(id) },
    include: {
      studentAnswers: true,
      studentPhoto: true,
      testResult: {
        include: {
          eventLogs: true,
          voiceRecords: true,
          student: true,
          test: { include: { questions: { include: { answers: true } } } },
        },
      },
    },
  })

  if (!student) throw new Error("No student")

  await db.student.delete({ where: { id: Number(id) } })

  redirect("/dashboard/students")
}

export async function updateStudent(formData: FormData) {
  const id = formData.get("id")?.toString()
  const fullName = formData.get("fullName")?.toString()
  const iin = formData.get("iin")?.toString()
  const isActive = formData.get("isActive")?.toString()
  const groupName = formData.get("groupName")?.toString()

  if (!id || !fullName || !iin || !groupName) {
    throw new Error("No form data")
  }

  let group = await db.group.findFirst({ where: { name: groupName } })

  if (!group) {
    group = await db.group.create({ data: { name: groupName } })
  }

  await db.student.update({
    where: { id: Number(id) },
    data: {
      fullName,
      iin,
      isActive: isActive ? true : false,
      groupId: group.id,
    },
  })

  redirect(`/dashboard/students/${id}`)
}
