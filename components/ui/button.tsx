import { cn } from "@/lib/utils"

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger"
}

export const Button = ({
  className,
  variant = "primary",
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(
        "h-9 rounded-md border-0 px-3 text-sm font-medium tracking-wide transition disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400",
        variant === "primary" &&
          "bg-blue-ribbon-500 text-white shadow-button ring-1 ring-blue-ribbon-600 hover:bg-blue-ribbon-600 active:bg-blue-ribbon-700 disabled:ring-zinc-950/10",
        variant === "secondary" &&
          "bg-white text-zinc-950 shadow ring-1 ring-zinc-950/10 hover:bg-zinc-50 active:bg-zinc-50 active:text-zinc-500",
        variant === "ghost" &&
          "text-zinc-950 hover:bg-zinc-950/5 active:bg-zinc-950/10",
        variant === "danger" &&
          "bg-red-500 text-white shadow-button ring-1 ring-red-600 hover:bg-red-600 active:bg-red-700 disabled:ring-zinc-950/10",
        className,
      )}
      {...props}
    />
  )
}
