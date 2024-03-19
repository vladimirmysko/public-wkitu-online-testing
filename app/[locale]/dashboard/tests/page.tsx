import Link from "next/link"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"

import { DashboardPageTitle } from "@/components/dashboard-page-title"
import { SearchInput } from "@/components/search-input"

interface ITestsPageProps {
  searchParams: { search?: string }
}

export const revalidate = 0

export default async function TestsPage({ searchParams }: ITestsPageProps) {
  const t = await getI18n()

  const tests = await db.test.findMany({ orderBy: { id: "desc" } })

  const { search } = searchParams
  let filteredTests

  if (search) {
    filteredTests = tests.filter(
      (t) =>
        t.discipline.toLowerCase().includes(search.toLowerCase()) ||
        t.author.toLowerCase().includes(search.toLowerCase()) ||
        t.department.toLowerCase().includes(search.toLowerCase()),
    )
  } else {
    filteredTests = tests
  }

  return (
    <div className="flex flex-col items-stretch gap-6 py-6">
      <DashboardPageTitle count={tests.length} title={t("dashboard.tests")} />
      <SearchInput pathname="/dashboard/tests" className="max-w-xs" />
      <div className="overflow-auto whitespace-nowrap">
        <table className="w-full tracking-wide">
          <thead>
            <tr className="border-b border-zinc-950/10">
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                Id
              </th>
              <th className="p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.author")}
              </th>
              <th className="p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.department")}
              </th>
              <th className="p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.discipline")}
              </th>
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.language")}
              </th>
              <th className="w-36 p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.added_at")}
              </th>
              <th className="w-48 p-3 text-left text-sm font-normal text-zinc-500 opacity-0">
                {t("table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTests.map((test, index) => (
              <tr
                className={cn(
                  index !== tests.length - 1 && "border-b border-zinc-950/10",
                )}
                key={test.id}
              >
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {test.id}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {test.author}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {test.department}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {test.discipline}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {test.language}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {test.addedAt.toLocaleDateString()}
                </td>
                <td className="flex flex-col items-end gap-2 px-3 py-4  text-sm font-normal text-zinc-950">
                  <Link
                    className="appearance-none text-sm font-medium tracking-wide text-blue-600 hover:underline"
                    href={`/dashboard/tests/${test.id}`}
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
