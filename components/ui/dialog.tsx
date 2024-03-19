"use client"

import { Dialog as HeadelessDialog } from "@headlessui/react"
import { Button } from "@/components/ui/button"

interface IDialogProps {
  children?: React.ReactNode
  title: string
  cancelText: string
  confirmText: string
  isOpen: boolean
  onClose: () => void
  handleCancel: () => void
  handleConfirm: () => void
}

export const Dialog: React.FC<IDialogProps> = ({
  children,
  title,
  cancelText,
  confirmText,
  isOpen,
  onClose,
  handleCancel,
  handleConfirm,
}) => {
  return (
    <HeadelessDialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <HeadelessDialog.Panel className="mx-auto flex w-full max-w-sm flex-col items-stretch overflow-hidden rounded-xl border-0 bg-white shadow-lg ring-1 ring-zinc-950/10">
          <HeadelessDialog.Title className="p-4 text-center text-3xl font-semibold tracking-tighter text-zinc-950">
            {title}
          </HeadelessDialog.Title>
          {children}
          <div className="flex flex-row items-center justify-between gap-3 border-t border-zinc-200 bg-zinc-100 p-4">
            <Button variant="secondary" onClick={handleCancel}>
              {cancelText}
            </Button>
            <Button onClick={handleConfirm}>{confirmText}</Button>
          </div>
        </HeadelessDialog.Panel>
      </div>
    </HeadelessDialog>
  )
}
