import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"

import { Form } from "./form"

export const revalidate = 0

export default async function SettingsPage() {
  const t = await getI18n()

  const settings = await db.settings.findFirst()

  if (!settings) throw new Error("Settings not found!")

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-6 py-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-950">
        {t("dashboard.settings")}
      </h1>
      <Form
        className="flex max-w-sm flex-col gap-4"
        currentSettings={settings}
      />
    </div>
  )
}
