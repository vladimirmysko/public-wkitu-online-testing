import Link from "next/link"
import { getI18n } from "@/locales/server"
import { Header } from "@/components/header"

export default async function InformationPage() {
  const t = await getI18n()

  return (
    <main className="flex min-h-screen flex-col items-stretch">
      <Header />
      <div className="m-auto flex w-full max-w-sm flex-col items-stretch gap-8">
        <h1 className="text-center text-2xl font-semibold tracking-tighter text-zinc-950">
          {t("information.text")}
        </h1>
        <Link
          href="/"
          className="self-center font-medium text-blue-500 hover:underline"
        >
          {t("information.back_to_home_page")}
        </Link>
      </div>
    </main>
  )
}
