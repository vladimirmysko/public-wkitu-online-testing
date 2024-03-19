import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"
import { FaceCheckForm } from "./form"

interface IFaceCheckProps {
  params: { iin: string }
}

export const revalidate = 0

export default async function FaceCheck({ params }: IFaceCheckProps) {
  const t = await getI18n()

  const student = await db.student.findFirst({
    where: { iin: params.iin },
    include: { group: { include: { tests: true } } },
  })

  if (!student) redirect("/biometry/iin")

  return (
    <>
      <h1 className="text-center text-2xl font-semibold tracking-tighter text-zinc-950">
        {t("biometry.get_face_check", { fullName: student.fullName })}
      </h1>
      <FaceCheckForm iin={student.iin} />
    </>
  )
}
