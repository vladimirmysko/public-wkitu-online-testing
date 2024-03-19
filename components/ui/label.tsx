import { cn } from "@/lib/utils"

interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ className, ...props }: ILabelProps) => {
  return (
    <label
      className={cn(
        "text-xs font-medium tracking-wide text-neutral-950",
        className,
      )}
      {...props}
    />
  )
}
