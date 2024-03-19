import Link from "next/link"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"

import { Input } from "@/components/ui/input"
import { SubmitButtons } from "./submit-buttons"

interface IGroupPageProps {
  params: { id: string }
}

export default async function GroupPage({ params }: IGroupPageProps) {
  const t = await getI18n()

  const group = await db.group.findUnique({
    where: { id: Number(params.id) },
    include: { students: true, tests: true },
  })

  return (
    <form
      autoComplete="off"
      className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-6 py-6"
    >
      <dl className="divide-y divide-zinc-100">
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">id</dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <input name="id" type="hidden" defaultValue={group?.id} />
            {group?.id}
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.group")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <Input name="name" defaultValue={group?.name} className="w-full" />
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("dashboard.students")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <div className="flex flex-col divide-y divide-zinc-100 overflow-auto">
              {group?.students.map((student) => (
                <div className="py-2" key={`student-${student.id}`}>
                  {student.fullName}
                </div>
              ))}
            </div>
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("dashboard.tests")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <div className="flex flex-col divide-y divide-zinc-100 overflow-auto">
              {group?.tests.map((test) => (
                <div
                  className="flex flex-row justify-between gap-4 py-2"
                  key={`test-${test.id}`}
                >
                  <span>{test.discipline}</span>
                  <Link
                    href={`/report/${group.id}/${test.id}`}
                    className="inline-flex items-center gap-2 font-medium text-blue-500 hover:underline"
                    target="_blank"
                  >
                    {t("dashboard.get_report")}
                  </Link>
                </div>
              ))}
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
