import { cn } from "@/lib/utils"

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
interface IInputFieldProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Input = ({ className, ...props }: IInputProps) => {
  return (
    <input
      className={cn(
        "h-9 rounded-md border-0 bg-white text-base tracking-wide text-zinc-950 shadow ring-1 ring-zinc-950/10 transition placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-ribbon-500 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 sm:text-sm",
        className,
      )}
      {...props}
    />
  )
}

export const InputField = ({ className, ...props }: IInputFieldProps) => {
  return (
    <div
      className={cn("flex flex-col items-stretch gap-2", className)}
      {...props}
    />
  )
}
