import Link from "next/link"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"

import { DashboardPageTitle } from "@/components/dashboard-page-title"
import { SearchInput } from "@/components/search-input"

interface IGroupsPageProps {
  searchParams: { search?: string }
}

export const revalidate = 0

export default async function GroupsPage({ searchParams }: IGroupsPageProps) {
  const t = await getI18n()

  const groups = await db.group.findMany({
    orderBy: { id: "desc" },
  })

  const { search } = searchParams
  let filteredGroups

  if (search) {
    filteredGroups = groups.filter((g) =>
      g.name.toLowerCase().includes(search.toLowerCase()),
    )
  } else {
    filteredGroups = groups
  }

  return (
    <div className="flex flex-col items-stretch gap-6 py-6">
      <DashboardPageTitle count={groups.length} title={t("dashboard.groups")} />
      <SearchInput pathname="/dashboard/groups" className="max-w-xs" />
      <div className="overflow-auto whitespace-nowrap">
        <table className="w-full tracking-wide">
          <thead>
            <tr className="border-b border-zinc-950/10">
              <th className="w-20 p-3 text-left text-sm font-normal text-zinc-500">
                Id
              </th>
              <th className="p-3 text-left text-sm font-normal text-zinc-500">
                {t("table.group")}
              </th>
              <th className="w-48 p-3 text-left text-sm font-normal text-zinc-500 opacity-0">
                {t("table.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group, index) => (
              <tr
                className={cn(
                  index !== groups.length - 1 && "border-b border-zinc-950/10",
                )}
                key={group.id}
              >
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {group.id}
                </td>
                <td className="px-3 py-4 text-sm font-normal text-zinc-950">
                  {group.name}
                </td>
                <td className="flex flex-col items-end gap-2 px-3 py-4  text-sm font-normal text-zinc-950">
                  <Link
                    className="appearance-none text-sm font-medium tracking-wide text-blue-600 hover:underline"
                    href={`/dashboard/groups/${group.id}`}
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
