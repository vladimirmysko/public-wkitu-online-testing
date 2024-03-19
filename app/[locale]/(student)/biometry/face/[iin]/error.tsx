"use client"

import { useEffect } from "react"
import { useI18n } from "@/locales/client"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const t = useI18n()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <h2 className="text-center text-2xl font-semibold tracking-tight text-zinc-950">
        {t("errors.the_faces_dont_match")}
      </h2>
      <Button variant="secondary" onClick={() => reset()}>
        {t("try_again")}
      </Button>
    </>
  )
}
