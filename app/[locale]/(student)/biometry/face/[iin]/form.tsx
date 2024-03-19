"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/locales/client"
import { cn } from "@/lib/utils"

import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"

import { checkFace } from "./actions"

interface IFaceCheckFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  iin: string
}

export const FaceCheckForm = ({
  className,
  iin,
  ...props
}: IFaceCheckFormProps) => {
  const router = useRouter()
  const t = useI18n()

  const webcamRef = useRef<Webcam>(null)
  const [loading, setLoading] = useState(false)
  let [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!webcamRef.current) {
      alert(t("errors.webcam_ref_not_found"))
      return
    }

    const image = webcamRef.current.getScreenshot()

    startTransition(() => checkFace({ iin, image: image! }))
  }

  const handleBack = () => {
    setLoading(true)
    router.push("/biometry/iin")
  }

  return (
    <form
      className={cn("flex flex-col items-stretch gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <Webcam
        audio={false}
        className="rounded-xl"
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        audioConstraints={{ channelCount: 1 }}
        videoConstraints={{ facingMode: "user" }}
      />
      <Button disabled={loading || isPending} type="submit">
        {loading ? t("loading") : t("biometry.continue")}
      </Button>
      <button
        className="self-center text-sm font-medium tracking-wide text-blue-ribbon-500 hover:underline disabled:cursor-not-allowed disabled:text-zinc-500"
        disabled={loading || isPending}
        onClick={handleBack}
      >
        {t("biometry.back")}
      </button>
    </form>
  )
}
