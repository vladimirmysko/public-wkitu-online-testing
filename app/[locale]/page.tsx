import { getI18n } from "@/locales/server"

import { Header } from "@/components/header"
import { UserAuthForm } from "@/components/user-auth-form"

export default async function HomePage() {
  const t = await getI18n()

  return (
    <main className="flex min-h-screen flex-col items-stretch">
      <Header />
      <div className="m-auto flex w-full max-w-sm flex-col items-stretch gap-8">
        <div className="flex flex-col items-stretch gap-2">
          <h1 className="text-2xl font-semibold tracking-tighter text-zinc-950">
            {t("home.sign_in")}
          </h1>
          <div className="flex flex-row items-center gap-1">
            <span className="text-sm tracking-wide text-zinc-500">
              {t("home.dont_know_details")}
            </span>
            <button
              className="text-sm font-medium tracking-wide text-zinc-950 underline"
              type="button"
            >
              {t("home.get_info")}
            </button>
          </div>
        </div>
        <UserAuthForm />
      </div>
    </main>
  )
}
