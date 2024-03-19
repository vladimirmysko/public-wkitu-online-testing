"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/locales/client"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"

interface ISearchInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {
  search?: string
  pathname: string
}

export function SearchInput({
  search,
  pathname,
  className,
  ...props
}: ISearchInputProps) {
  const t = useI18n()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const isSearching = timeoutId || isPending

  return (
    <Input
      className={cn("", className)}
      name="search"
      id="search"
      type="search"
      placeholder={t("search")}
      defaultValue={search}
      onChange={(event) => {
        clearTimeout(timeoutId)

        const id = setTimeout(() => {
          startTransition(() => {
            if (event.target.value) {
              router.push(`${pathname}/?search=${event.target.value}`)
            } else {
              router.push(pathname)
            }

            setTimeoutId(undefined)
          })
        }, 500)

        setTimeoutId(id)
      }}
      {...props}
    />
  )
}
