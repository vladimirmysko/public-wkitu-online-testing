"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { useI18n } from "@/locales/client"
import { cn } from "@/lib/utils"

import { IMaskInput } from "react-imask"
import { Button } from "@/components/ui/button"

import { checkIin } from "./actions"

interface IEnteringIinFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

export const EnteringIinForm = ({
  className,
  ...props
}: IEnteringIinFormProps) => {
  const router = useRouter()
  const t = useI18n()

  const [iin, setIin] = useState("")
  const [loading, setLoading] = useState(false)
  let [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(() => checkIin(iin))
  }

  const handleBack = async () => {
    setLoading(true)
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <form
      className={cn("flex flex-col items-stretch gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <IMaskInput
        className="h-9 rounded-md border-0 bg-white text-base tracking-wide text-zinc-950 shadow ring-1 ring-zinc-950/10 transition placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-ribbon-500 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 sm:text-sm"
        disabled={loading || isPending}
        mask="0000 0000 0000"
        placeholder="0000 0000 0000"
        required
        unmask
        onAccept={(value) => setIin(value)}
      />
      <Button disabled={loading || isPending} type="submit">
        {loading || isPending ? t("loading") : t("biometry.continue")}
      </Button>
      <button
        className="self-center text-sm font-medium tracking-wide text-blue-ribbon-500 hover:underline disabled:cursor-not-allowed disabled:text-zinc-500"
        disabled={loading || isPending}
        onClick={handleBack}
      >
        {t("biometry.back")}
      </button>
    </form>
  )
}
