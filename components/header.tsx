import Image from "next/image"
import { getI18n } from "@/locales/server"
import { cn } from "@/lib/utils"

import logoPicture from "@/public/logo.png"
import { LocaleSwitcher } from "@/components/locale-switcher"

interface IHeaderProps extends React.HTMLAttributes<HTMLElement> {}

export const Header = async ({ className, ...props }: IHeaderProps) => {
  const t = await getI18n()

  return (
    <header className={cn("h-16 px-4", className)} {...props}>
      <div className="container mx-auto flex h-full flex-row items-center justify-between">
        <Image alt={t("wkitu_logo")} src={logoPicture} height={48} width={48} />
        <LocaleSwitcher />
      </div>
    </header>
  )
}
