import { useI18n } from "@/locales/client"
import { cn } from "@/lib/utils"

import Webcam from "react-webcam"
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface IConfirmDialogProps extends React.ComponentProps<typeof Dialog> {
  answersIdCount: number
}

export const ConfirmDialog = ({
  answersIdCount,
  ...props
}: IConfirmDialogProps) => {
  const t = useI18n()

  return (
    <Dialog {...props}>
      <div className="flex flex-col items-center gap-2 p-4">
        <p className="text-xs font-medium uppercase text-zinc-500">
          {t("testing.selected_answers")}
        </p>
        <p className="text-5xl font-semibold tracking-tighter text-zinc-950">
          {answersIdCount}
        </p>
      </div>
    </Dialog>
  )
}

interface ILoadingDialogProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LoadingDialog = ({ className, ...props }: ILoadingDialogProps) => {
  const t = useI18n()

  return (
    <div className={cn("relative z-50", className)} {...props}>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="mx-auto flex max-w-sm flex-col items-stretch overflow-hidden rounded-lg border-0 bg-white p-4 shadow-lg ring-1 ring-zinc-950/10">
          <p className="animate-pulse text-base font-medium">{t("loading")}</p>
        </div>
      </div>
    </div>
  )
}

interface IStartVideoDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  handleStart: () => void
}

export const StartVideoDialog = ({
  className,
  handleStart,
  ...props
}: IStartVideoDialogProps) => {
  const t = useI18n()

  return (
    <div className={cn("relative z-50", className)} {...props}>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="mx-auto flex w-full max-w-xs flex-col items-stretch gap-6 overflow-hidden rounded-lg border-0 bg-white p-4 shadow-lg ring-1 ring-zinc-950/10">
          <p className="text-center text-2xl font-semibold tracking-tighter text-zinc-950">
            {t("testing.press_start")}
          </p>
          <Button onClick={handleStart}>{t("testing.start")}</Button>
        </div>
      </div>
    </div>
  )
}
