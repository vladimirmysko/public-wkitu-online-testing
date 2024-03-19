import Image from "next/image"
import { getI18n } from "@/locales/server"

import logoPicture from "@/public/logo.png"
import { NavLink } from "@/components/nav-link"
import { LogOut } from "@/components/log-out"

interface IDashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: IDashboardLayoutProps) {
  const t = await getI18n()

  const links = [
    { href: "/dashboard/tests-results", label: t("dashboard.tests_results") },
    { href: "/dashboard/tests", label: t("dashboard.tests") },
    { href: "/dashboard/students", label: t("dashboard.students") },
    { href: "/dashboard/groups", label: t("dashboard.groups") },
    { href: "/dashboard/settings", label: t("dashboard.settings") },
  ]

  return (
    <div className="flex min-h-screen flex-col items-stretch">
      <header className="flex h-16 flex-row items-center gap-10 border-b border-zinc-950/10 px-4">
        <Image alt={t("wkitu_logo")} src={logoPicture} height={48} width={48} />
        <nav className="flex flex-row items-center gap-1">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <LogOut className="ml-auto h-8" />
      </header>
      <main className="flex-1 px-4">{children}</main>
    </div>
  )
}
