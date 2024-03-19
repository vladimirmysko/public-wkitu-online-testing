"use client"

import { useTimer } from "react-timer-hook"
import { useI18n } from "@/locales/client"

import { Description } from "@/components/ui/description"

interface ITimeLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  minutesToTest: number
  onExpire: () => void
}

export function TimeLeft({ minutesToTest, onExpire }: ITimeLeftProps) {
  const t = useI18n()

  const time = new Date()
  time.setMinutes(time.getMinutes() + minutesToTest)

  const { seconds, minutes } = useTimer({
    expiryTimestamp: time,
    onExpire: () => onExpire(),
  })

  return (
    <Description
      label={t("testing.time_left")}
      text={`${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`}
    />
  )
}
