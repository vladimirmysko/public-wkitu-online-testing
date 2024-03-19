import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Header } from "@/components/header"

interface IBiometryLayoutProps {
  children: React.ReactNode
}

export default async function BiometryLayout({
  children,
}: IBiometryLayoutProps) {
  const settings = await db.settings.findFirst()

  if (!settings || !settings.isTestingStarted) {
    redirect("/information")
  }

  return (
    <div className="flex min-h-screen flex-col items-stretch">
      <Header />
      <main className="flex flex-1 flex-row px-4">
        <div className="m-auto flex w-full max-w-sm flex-col items-stretch gap-8">
          {children}
        </div>
      </main>
    </div>
  )
}
