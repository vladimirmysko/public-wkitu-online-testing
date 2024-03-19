import Link from "next/link"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"

import { DashboardPageTitle } from "@/components/dashboard-page-title"
import { SearchInput } from "@/components/search-input"

export const revalidate = 0

interface ITestsResultsPageProps {
  searchParams: { search?: string }
}

export default async function TestsResultsPage({
  searchParams,
}: ITestsResultsPageProps) {
  const t = await getI18n()

  const testsResults = await db.testResult.findMany({
    orderBy: { id: "desc" },
    include: { student: true, test: true },
  })

  const { search } = searchParams
  let filteredTestsResults

  if (search) {
    filteredTestsResults = testsResults.filter(
      (r) =>
        r.student.fullName.toLowerCase().includes(search.toLowerCase()) ||
        r.student.iin.toLowerCase().includes(search.toLowerCase()) ||
        r.test.discipline.toLowerCase().includes(search.toLowerCase()),
    )
  } else {
    filteredTestsResults = testsResults
  }

  return (
    <div className="flex flex-col items-stretch gap-6 py-6">
      <div className="flex flex-row items-center justify-between gap-6">
        <DashboardPageTitle
          count={testsResults.length}
          title={t("dashboard.tests_results")}
        />
        <Link
          href="/api/tests-results/report"
          target="_blank"
          className="flex h-8 items-center justify-center rounded-md border-0 bg-blue-ribbon-500 px-3 text-sm font-medium tracking-wider text-white shadow-button ring-1 ring-blue-ribbon-600 transition hover:bg-blue-ribbon-600"
          prefetch={false}
        >
          {t("dashboard.export_csv")}
        </Link>
      </div>
      <SearchInput pathname="/dashboard/tests-results" className="max-w-xs" />
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
                {t("table.discipline")}
              </th>
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.digit")}
              </th>
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.letter")}
              </th>
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.percent")}
              </th>
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.added_at")}
              </th>
              <th className="w-48 p-3 text-left text-sm font-normal text-zinc-500 opacity-0">
                {t("table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTestsResults.map((testResult, index) => (
              <tr
                className={cn(
                  index !== testsResults.length - 1 &&
                    "border-b border-zinc-950/10",
                )}
                key={testResult.id}
              >
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {testResult.id}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {testResult.student.fullName}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {testResult.test.discipline}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {testResult.digit}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {testResult.letter}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {testResult.percent}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {testResult.addedAt.toLocaleString()}
                </td>
                <td className="flex flex-col items-end gap-2 px-3 py-4  text-sm font-normal text-zinc-950">
                  <Link
                    className="appearance-none text-sm font-medium tracking-wide text-blue-600 hover:underline"
                    href={`/dashboard/tests-results/${testResult.id}`}
                    prefetch={false}
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
