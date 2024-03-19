"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface INavLinkProps {
  children: React.ReactNode
  href: string
}

export const NavLink = ({ children, href }: INavLinkProps) => {
  const pathname = usePathname()

  const isSimilar =
    pathname.split("/").slice(-1).toString() ===
      href.split("/").slice(-1).toString() ||
    pathname.split("/").slice(-2)[0].toString() ===
      href.split("/").slice(-1).toString()

  return (
    <Link
      className={cn(
        "flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium tracking-wide transition",
        isSimilar
          ? "bg-zinc-100 text-zinc-950"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
1
