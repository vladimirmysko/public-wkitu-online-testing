import Link from "next/link"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"

import { DashboardPageTitle } from "@/components/dashboard-page-title"
import { SearchInput } from "@/components/search-input"
import { DeleteButton } from "./delete-button"

import { deleteAllStudents } from "./actions"

export const revalidate = 0

interface IStudentsPageProps {
  searchParams: { search?: string }
}

export default async function StudentsPage({
  searchParams,
}: IStudentsPageProps) {
  const t = await getI18n()

  const students = await db.student.findMany({
    orderBy: { id: "desc" },
    include: { group: true },
  })

  const { search } = searchParams
  let filteredStudents

  if (search) {
    filteredStudents = students.filter(
      (s) =>
        s.fullName.toLowerCase().includes(search.toLowerCase()) ||
        s.group.name.toLowerCase().includes(search.toLowerCase()),
    )
  } else {
    filteredStudents = students
  }

  return (
    <div className="flex flex-col items-stretch gap-6 py-6">
      <div className="flex flex-row items-center justify-between gap-6">
        <DashboardPageTitle
          count={students.length}
          title={t("dashboard.students")}
        />
        <div className="flex flex-row items-center gap-8">
          <form action={deleteAllStudents}>
            <DeleteButton />
          </form>
          <Link
            href="/dashboard/students/create"
            className="text-sm font-medium text-blue-500 hover:underline"
          >
            {t("dashboard.add_student")}
          </Link>
        </div>
      </div>

      <SearchInput pathname="/dashboard/students" className="max-w-xs" />

      <div className="overflow-auto whitespace-nowrap">
        <table className="w-full tracking-wide">
          <thead>
            <tr className="border-b border-zinc-950/10">
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                Id
              </th>
              <th className="p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.full_name")}
              </th>
              <th className="p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.iin")}
              </th>
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.status")}
              </th>
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.group")}
              </th>
              <th className="w-48 p-3 text-left text-sm font-normal text-zinc-500 opacity-0">
                {t("table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr
                className={cn(
                  index !== students.length - 1 &&
                    "border-b border-zinc-950/10",
                )}
                key={student.id}
              >
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {student.id}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {student.fullName}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {student.iin}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      student.isActive ? "bg-green-600" : "bg-red-600",
                    )}
                  />
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {student.group.name}
                </td>
                <td className="flex flex-col items-end gap-2 px-3 py-4  text-sm font-normal text-zinc-950">
                  <Link
                    className="appearance-none text-sm font-medium tracking-wide text-blue-600 hover:underline"
                    href={`/dashboard/students/${student.id}`}
                  >
                    {t("edit")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
