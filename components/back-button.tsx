"use client"

import { useRouter } from "next/navigation"
import { useI18n } from "@/locales/client"

import { Button } from "@/components/ui/button"

interface IBackButton {
  disabled?: boolean
  href?: string
}

export const BackButton = ({
  disabled = false,
  href = "",
}: IBackButton): JSX.Element => {
  const router = useRouter()
  const t = useI18n()

  const handleBack = () => {
    if (!href) {
      router.back()
    }

    router.push(href)
  }

  return (
    <Button
      variant="secondary"
      type="button"
      disabled={disabled}
      onClick={() => handleBack()}
    >
      {t("biometry.back")}
    </Button>
  )
}
