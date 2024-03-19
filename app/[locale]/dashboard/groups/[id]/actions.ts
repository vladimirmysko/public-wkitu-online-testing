"use server"

import { redirect } from "next/navigation"
import { db } from "@/lib/db"

export async function deleteGroup(formData: FormData) {
  const id = formData.get("id")?.toString()

  if (!id) {
    throw new Error("No form data")
  }

  const group = await db.group.findUnique({ where: { id: Number(id) } })

  if (!group) throw new Error("No group")

  await db.group.delete({ where: { id: Number(id) } })

  redirect("/dashboard/groups")
}

export async function updateGroup(formData: FormData) {
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()

  if (!id || !name) {
    throw new Error("No form data")
  }

  await db.group.update({
    where: { id: Number(id) },
    data: {
      name,
    },
  })

  redirect(`/dashboard/groups/${id}`)
}
