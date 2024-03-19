import { getI18n } from "@/locales/server"
import { EnteringIinForm } from "./form"

export default async function EnteringIin() {
  const t = await getI18n()

  return (
    <>
      <h1 className="text-center text-2xl font-semibold tracking-tighter text-zinc-950">
        {t("biometry.enter_your_iin")}
      </h1>
      <EnteringIinForm />
    </>
  )
}
