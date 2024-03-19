"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/locales/client"
import { cn } from "@/lib/utils"

import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface ITestSelectionFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  fullName: string
  iin: string
  tests: { id: number; discipline: string }[]
}

export const TestSelectionForm = ({
  className,
  fullName,
  iin,
  tests,
  ...props
}: ITestSelectionFormProps) => {
  const router = useRouter()
  const t = useI18n()

  const [testId, setTestId] = useState(tests[0].id)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    router.push(`/testing/${iin}/${testId}`)
  }

  const handleBack = () => {
    setLoading(true)
    router.push("/biometry/iin")
  }

  return (
    <form
      className={cn("flex flex-col items-stretch gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <Select
        disabled={loading}
        onChange={(e) => setTestId(Number(e.target.value))}
      >
        {tests.map((test) => (
          <option key={test.id} value={test.id}>
            {test.discipline}
          </option>
        ))}
      </Select>
      <Button disabled={loading} type="submit">
        {loading ? t("loading") : t("biometry.continue")}
      </Button>
      <button
        className="self-center text-sm font-medium tracking-wide text-blue-ribbon-500 hover:underline disabled:cursor-not-allowed disabled:text-zinc-500"
        disabled={loading}
        onClick={handleBack}
      >
        {t("biometry.back")}
      </button>
    </form>
  )
}
