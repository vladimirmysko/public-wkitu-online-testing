"use client"

import { useChangeLocale, useCurrentLocale } from "@/locales/client"
import { cn } from "@/lib/utils"

interface ILocaleSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
}

export const LocaleSwitcher = ({
  className,
  disabled = false,
  ...props
}: ILocaleSwitcherProps) => {
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  const locales: { value: "en" | "ru" | "kk"; label: string }[] = [
    { value: "ru", label: "РУ" },
    { value: "kk", label: "ҚЗ" },
    { value: "en", label: "EN" },
  ]

  return (
    <div
      className={cn(
        "flex h-7 flex-row items-stretch overflow-hidden rounded-lg bg-zinc-100 p-0.5",
        className,
      )}
      {...props}
    >
      {locales.map((locale) => (
        <button
          className={cn(
            "relative inline-flex h-full items-center justify-center rounded-md px-3 text-xs font-medium tracking-wide outline-none transition",
            "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-950",
            "disabled:cursor-not-allowed disabled:text-zinc-500",
            currentLocale === locale.value && "bg-white text-zinc-950 shadow",
            currentLocale !== locale.value &&
              "text-zinc-500 hover:text-zinc-950",
          )}
          key={locale.value}
          disabled={disabled}
          onClick={() => changeLocale(locale.value)}
        >
          {locale.label}
        </button>
      ))}
    </div>
  )
}
