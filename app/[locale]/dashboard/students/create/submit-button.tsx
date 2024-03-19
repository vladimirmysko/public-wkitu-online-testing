"use client"

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { useI18n } from "@/locales/client"
import { Button } from "@/components/ui/button"

export const SubmitButton = () => {
  const t = useI18n()
  const { pending } = useFormStatus()

  return (
    <Button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className="self-end"
    >
      {t("dashboard.add_student")}
    </Button>
  )
}
