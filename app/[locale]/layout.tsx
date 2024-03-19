import { Metadata } from "next"
import localFont from "next/font/local"
import { getServerSession } from "next-auth/next"
import { getI18n } from "@/locales/server"
import { authOptions } from "@/lib/auth"
import { cn } from "@/lib/utils"

import { Providers } from "./providers"

interface ILocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

const inter = localFont({
  src: [
    {
      path: "../../fonts/InterDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/InterDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/InterDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/InterDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n()

  return {
    title: t("title"),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: ILocaleLayoutProps) {
  const session = await getServerSession(authOptions)

  return (
    <html lang={params.locale}>
      <body
        className={cn(
          inter.variable,
          "font-inter antialiased selection:bg-blue-ribbon-500 selection:text-white",
        )}
        style={{ textRendering: "optimizeLegibility" }}
      >
        <Providers locale={params.locale} session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
