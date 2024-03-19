"use client"

import { Session } from "next-auth"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import { I18nProviderClient } from "@/locales/client"

interface SessionProviderProps {
  children: React.ReactNode
  locale: string
  session: Session | null
}

export const Providers = ({
  children,
  locale,
  session,
}: SessionProviderProps) => {
  return (
    <I18nProviderClient locale={locale}>
      <NextAuthSessionProvider session={session}>
        {children}
      </NextAuthSessionProvider>
    </I18nProviderClient>
  )
}
