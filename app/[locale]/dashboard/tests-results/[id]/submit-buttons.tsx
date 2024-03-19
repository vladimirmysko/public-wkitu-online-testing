"use client"

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom"

import { useI18n } from "@/locales/client"
import { BackButton } from "@/components/back-button"
import { Button } from "@/components/ui/button"

import { updateTestResult, deleteTestResult } from "./actions"

export const SubmitButtons = () => {
  const t = useI18n()
  const { pending } = useFormStatus()

  return (
    <>
      <BackButton
        href="/dashboard/tests-results"
        aria-disabled={pending}
        disabled={pending}
      />
      <Button
        aria-disabled={pending}
        disabled={pending}
        formAction={deleteTestResult}
        variant="danger"
        type="submit"
      >
        {t("delete")}
      </Button>
      <Button
        aria-disabled={pending}
        disabled={pending}
        formAction={updateTestResult}
        type="submit"
      >
        {t("dashboard.save")}
      </Button>
    </>
  )
}
