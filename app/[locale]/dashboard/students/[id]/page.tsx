import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButtons } from "./submit-buttons"

interface IStudentPageProps {
  params: { id: string }
}

export default async function StudentPage({ params }: IStudentPageProps) {
  const t = await getI18n()

  const student = await db.student.findUnique({
    where: { id: Number(params.id) },
    include: { group: true, testResult: { include: { test: true } } },
  })

  if (!student) {
    redirect("/dashboard/students")
  }

  return (
    <form className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-6 py-6">
      <dl className="divide-y divide-zinc-100">
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">id</dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <input name="id" type="hidden" defaultValue={student.id} />
            {student?.id}
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.full_name")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <Input
              name="fullName"
              defaultValue={student.fullName}
              className="w-full"
            />
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.iin")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <Input name="iin" defaultValue={student.iin} className="w-full" />
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.status")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <div className="flex flex-row items-center gap-3">
              <input
                className="rounded border-0 text-blue-ribbon-500 shadow ring-1 ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
                defaultChecked={student?.isActive}
                type="checkbox"
                id="isActive"
                name="isActive"
              />
              <Label htmlFor="isActive">{t("table.status")}</Label>
            </div>
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.group")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <Input
              name="groupName"
              defaultValue={student.group.name}
              className="w-full"
            />
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.results")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <div className="overflow-auto">
              <table>
                <tbody>
                  {student?.testResult.map((testResult, index) => (
                    <tr
                      className={cn(
                        index !== student?.testResult.length - 1 &&
                          "border-b border-zinc-950/10",
                      )}
                      key={`event_log-${testResult.id}`}
                    >
                      <td className="py-2 text-left align-top text-sm text-zinc-950">
                        {testResult.test.discipline}
                      </td>
                      <td className="py-2 pl-2 text-left align-top text-sm text-zinc-950">
                        {testResult.percent}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </dd>
        </div>
      </dl>
      <div className="flex flex-row items-center justify-end gap-4">
        <SubmitButtons />
      </div>
    </form>
  )
}
