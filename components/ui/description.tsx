import { cn } from "@/lib/utils"

interface IDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  text: string
}

export function Description({
  className,
  label,
  text,
  ...props
}: IDescriptionProps) {
  return (
    <div className={cn("flex flex-col items-stretch", className)} {...props}>
      <p className="text-xs tracking-wide text-zinc-500">{label}</p>
      <p className="text-sm font-medium tracking-wide text-zinc-950">{text}</p>
    </div>
  )
}
