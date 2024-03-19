import { getI18n } from "@/locales/server"
import { cn } from "@/lib/utils"

interface IDashboardPageTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  count: number
  title: string
}

export const DashboardPageTitle = async ({
  className,
  count,
  title,
  ...props
}: IDashboardPageTitleProps) => {
  const t = await getI18n()

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {t("dashboard.count", { count })}
      </p>
      <h1 className="text-2xl font-semibold tracking-tighter text-zinc-950">
        {title}
      </h1>
    </div>
  )
}
