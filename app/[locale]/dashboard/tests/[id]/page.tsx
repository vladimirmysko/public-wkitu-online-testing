import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"

import { SubmitButtons } from "./submit-buttons"

interface ITestPageProps {
  params: { id: string }
}

export default async function TestPage({ params }: ITestPageProps) {
  const t = await getI18n()

  const test = await db.test.findUnique({
    where: { id: Number(params.id) },
    include: { groups: true },
  })

  return (
    <form className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-6 py-6">
      <dl className="divide-y divide-zinc-100">
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">id</dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <input name="id" type="hidden" defaultValue={test?.id} />
            {test?.id}
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.discipline")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            {test?.discipline}
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.department")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            {test?.department}
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("dashboard.groups")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <div className="flex flex-col divide-y divide-zinc-100 overflow-auto">
              {test?.groups.map((group) => (
                <div className="py-2" key={`group-${group.id}`}>
                  {group.name}
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
