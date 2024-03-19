"use client"

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { useI18n } from "@/locales/client"

export const DeleteButton = () => {
  const t = useI18n()
  const { pending } = useFormStatus()

  return (
    <button
      className="text-sm font-medium text-red-600 hover:underline disabled:text-zinc-500"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? t("loading") : t("delete_all")}
    </button>
  )
}
