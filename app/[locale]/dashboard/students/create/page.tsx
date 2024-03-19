import { getI18n } from "@/locales/server"

import { Label } from "@/components/ui/label"
import { InputField, Input } from "@/components/ui/input"
import { SubmitButton } from "./submit-button"

import { addStudent } from "./actions"

export const revalidate = 0

export default async function StudentCreatePage() {
  const t = await getI18n()

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-6 py-6">
      <h1 className="text-2xl font-semibold text-zinc-950">
        {t("dashboard.add_student")}
      </h1>
      <form action={addStudent} className="flex flex-col items-stretch gap-4">
        <InputField>
          <Label htmlFor="full_name">{t("table.full_name")}</Label>
          <Input id="full_name" name="full_name" required />
        </InputField>
        <InputField>
          <Label htmlFor="iin">{t("table.iin")}</Label>
          <Input id="iin" name="iin" required />
        </InputField>
        <InputField>
          <Label htmlFor="group">{t("table.group")}</Label>
          <Input id="group" name="group" required />
        </InputField>
        <div className="flex flex-row items-center gap-3">
          <input
            className="rounded border-0 text-blue-ribbon-500 shadow ring-1 ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
            defaultChecked={true}
            type="checkbox"
            id="is_active"
            name="is_active"
          />
          <Label htmlFor="is_active">{t("table.status")}</Label>
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}
