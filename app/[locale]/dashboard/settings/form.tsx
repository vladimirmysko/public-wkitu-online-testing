"use client"

import axios from "axios"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/locales/client"
import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"
import { Input, InputField } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  currentSettings: {
    id: number
    minutesToTest: number
    questionsPerTest: number
    secondsToSkip: number
    eventLogging: boolean
    faceCheck: boolean
    voiceRecording: boolean
    isTestingStarted: boolean
  }
}

export const Form = ({ className, currentSettings, ...props }: IFormProps) => {
  const router = useRouter()
  const t = useI18n()

  const [settings, setSettings] = useState({ ...currentSettings })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.post("/api/settings", JSON.stringify(settings))
    router.refresh()
    setIsLoading(false)
  }

  return (
    <form className={cn("", className)} onSubmit={handleSubmit} {...props}>
      <InputField>
        <Label htmlFor="minutes_to_test">
          {t("dashboard.minutes_to_test")}
        </Label>
        <Input
          disabled={isLoading}
          id="minutes_to_test"
          defaultValue={currentSettings.minutesToTest}
          type="number"
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              minutesToTest: Number(e.target.value),
            }))
          }
        />
      </InputField>
      <InputField>
        <Label htmlFor="questions_per_test">
          {t("dashboard.questions_per_test")}
        </Label>
        <Input
          disabled={isLoading}
          id="questions_per_test"
          defaultValue={currentSettings.questionsPerTest}
          type="number"
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              questionsPerTest: Number(e.target.value),
            }))
          }
        />
      </InputField>
      <InputField>
        <Label htmlFor="seconds_to_skip">
          {t("dashboard.seconds_to_skip")}
        </Label>
        <Input
          disabled={isLoading}
          id="seconds_to_skip"
          defaultValue={currentSettings.secondsToSkip}
          type="number"
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              secondsToSkip: Number(e.target.value),
            }))
          }
        />
      </InputField>
      <div className="flex flex-row items-center gap-3">
        <input
          className="rounded border-0 text-blue-ribbon-500 shadow ring-1 ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
          disabled={isLoading}
          defaultChecked={currentSettings.eventLogging}
          type="checkbox"
          id="event_logging"
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              eventLogging: e.target.checked,
            }))
          }
        />
        <Label htmlFor="event_logging">{t("dashboard.event_logging")}</Label>
      </div>
      <div className="flex flex-row items-center gap-3">
        <input
          className="rounded border-0 text-blue-ribbon-500 shadow ring-1 ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
          disabled={isLoading}
          defaultChecked={currentSettings.faceCheck}
          type="checkbox"
          id="face_check"
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              faceCheck: e.target.checked,
            }))
          }
        />
        <Label htmlFor="face_check">{t("dashboard.face_check")}</Label>
      </div>
      <div className="flex flex-row items-center gap-3">
        <input
          className="rounded border-0 text-blue-ribbon-500 shadow ring-1 ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
          disabled={isLoading}
          defaultChecked={currentSettings.voiceRecording}
          type="checkbox"
          id="voice_recording"
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              voiceRecording: e.target.checked,
            }))
          }
        />
        <Label htmlFor="voice_recording">
          {t("dashboard.voice_recording")}
        </Label>
      </div>
      <div className="flex flex-row items-center gap-3">
        <input
          className="rounded border-0 text-blue-ribbon-500 shadow ring-1 ring-zinc-950/10 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-500"
          disabled={isLoading}
          defaultChecked={currentSettings.isTestingStarted}
          type="checkbox"
          id="is_testing_started"
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              isTestingStarted: e.target.checked,
            }))
          }
        />
        <Label htmlFor="is_testing_started">
          {t("dashboard.is_testing_started")}
        </Label>
      </div>
      <Button className="mt-4" disabled={isLoading} type="submit">
        {t("dashboard.save")}
      </Button>
    </form>
  )
}
