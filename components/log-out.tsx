"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { useI18n } from "@/locales/client"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

export const LogOut = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) => {
  const router = useRouter()
  const t = useI18n()

  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <Button
      className={cn(className)}
      disabled={isLoading}
      variant="secondary"
      type="button"
      onClick={handleClick}
      {...props}
    >
      {isLoading ? t("loading") : t("log_out")}
    </Button>
  )
}
