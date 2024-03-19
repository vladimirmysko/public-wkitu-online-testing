import { cn } from "@/lib/utils"

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
interface ISelectFieldProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Select = ({ className, ...props }: ISelectProps) => {
  return (
    <select
      className={cn(
        "h-9 cursor-pointer rounded-md border-0 bg-white text-base tracking-wide text-zinc-950 shadow ring-1 ring-zinc-950/10 transition focus-visible:ring-2 focus-visible:ring-blue-ribbon-500 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 sm:text-sm",
        className,
      )}
      {...props}
    />
  )
}

export const SelectField = ({ className, ...props }: ISelectFieldProps) => {
  return (
    <div
      className={cn("flex flex-col items-stretch gap-2", className)}
      {...props}
    />
  )
}
