"use client"

import { useTransition } from "react"
import { useI18n } from "@/locales/client"

import { Button } from "@/components/ui/button"

import { backToIinPage } from "./actions"

interface IBackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function BackButton({ className, ...props }: IBackButtonProps) {
  const t = useI18n()
  let [isPending, startTransition] = useTransition()

  return (
    <Button
      disabled={isPending}
      type="button"
      onClick={() => startTransition(() => backToIinPage())}
      {...props}
    >
      {isPending ? t("loading") : t("biometry.back")}
    </Button>
  )
}
