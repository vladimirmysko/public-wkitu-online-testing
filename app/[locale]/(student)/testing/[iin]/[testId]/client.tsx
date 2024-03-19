"use client"

import axios from "axios"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isMobile } from "react-device-detect"
import { useI18n } from "@/locales/client"

import { TimeLeft } from "@/components/time-left"
import { Question, QuestionsList } from "@/components/question"
import { Answer } from "@/components/answer"
import { Description } from "@/components/ui/description"
import { Button } from "@/components/ui/button"
import { LoadingDialog, StartVideoDialog, ConfirmDialog } from "./dialogs"

import { useAnswers } from "./use-answers"
import { useMediaRecorder } from "./use-media-recorder"

interface IClientProps {
  isCapturing: boolean
  settings: {
    minutesToTest: number
    questionsPerTest: number
    secondsToSkip: number
    eventLogging: boolean
    faceCheck: boolean
    voiceRecording: boolean
  }
  student: {
    id: number
    fullName: string
    iin: string
  }
  test: {
    id: number
    discipline: string
    language: string
  }
  questions: {
    id: number
    blob: string
    answers: { id: number; blob: string }[]
  }[]
}

export function Client({
  isCapturing,
  settings,
  student,
  test,
  questions,
}: IClientProps) {
  const router = useRouter()
  const t = useI18n()

  const { answers, changeAnswers } = useAnswers()

  const { recordingStatus, getMediaBlob, startRecording, stopRecording } =
    useMediaRecorder()

  const [resultId, setResultId] = useState<number | null>(null)

  const [isStartDialogOpen, setIsStartDialogOpen] = useState(isCapturing)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false)

  const handleFinis = async () => {
    if (settings.eventLogging || settings.voiceRecording) {
      stopRecording()
    }

    setIsConfirmDialogOpen(false)
    setIsLoadingDialogOpen(true)

    try {
      const response = await axios.post<{ id: number }>("/api/tests-results", {
        answers,
        studentdId: student.id,
        testId: test.id,
      })

      setResultId(response.data.id)

      if (!settings.eventLogging && !settings.voiceRecording)
        router.push(`/results/${student.iin}`)
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    const sendVideo = async () => {
      try {
        const { screenBlob, videoBlob } = await getMediaBlob()

        const videoType = videoBlob.type.includes("mp4") ? "mp4" : "webm"

        const formData = new FormData()
        formData.set("video", videoBlob)
        formData.set("iin", student.iin)
        formData.set("resultId", resultId + "")
        formData.set("testId", test.id + "")
        formData.set("videoFormat", videoType)
        formData.set("language", test.language)

        if (!isMobile) formData.set("screen", screenBlob as Blob)

        await axios.post("/api/event-logs", formData, {
          timeout: 1800000,
          signal: AbortSignal.timeout(1800000),
        })

        router.push(`/results/${student.iin}`)
      } catch (error) {
        alert(error)
        router.push(`/results/${student.iin}`)
      }
    }

    if (resultId && recordingStatus === "stopped") {
      sendVideo()
    }
  }, [
    resultId,
    recordingStatus,
    test.id,
    test.language,
    student.iin,
    router,
    getMediaBlob,
  ])

  return (
    <div className="relative flex min-h-screen flex-col items-stretch">
      {isLoadingDialogOpen && <LoadingDialog />}
      {isStartDialogOpen && (
        <>
          <StartVideoDialog
            handleStart={() => {
              setIsStartDialogOpen(false)
              startRecording()
            }}
          />
        </>
      )}
      <ConfirmDialog
        cancelText={t("cancel")}
        confirmText={t("confirm")}
        handleCancel={() => setIsConfirmDialogOpen(false)}
        handleConfirm={() => handleFinis()}
        isOpen={isConfirmDialogOpen}
        onClose={() => {}}
        title={t("testing.are_you_sure")}
        answersIdCount={answers.length}
      />
      <header className="fixed flex w-full flex-col items-center border-b border-zinc-950/10 bg-white/80 px-6 backdrop-blur">
        <div className="container flex h-16 flex-row items-center justify-between gap-3">
          <div className="flex flex-row items-center gap-3 overflow-auto whitespace-nowrap">
            <Description
              label={t("testing.full_name")}
              text={student.fullName}
            />
            <Description
              label={t("testing.discipline")}
              text={test.discipline}
            />
            <TimeLeft
              minutesToTest={settings.minutesToTest}
              onExpire={handleFinis}
            />
          </div>
          <Button
            className="h-8 rounded-md text-sm"
            type="button"
            onClick={() => setIsConfirmDialogOpen(true)}
          >
            {t("testing.finish")}
          </Button>
        </div>
      </header>
      <main className="mt-16 flex flex-1 flex-row bg-zinc-50 p-6">
        <div className="container mx-auto">
          <QuestionsList>
            {questions.map((question, index) => (
              <Question
                key={question.id}
                blob={question.blob}
                number={index + 1}
                questionId={question.id}
              >
                {question.answers.map((answer) => (
                  <Answer
                    key={answer.id}
                    answerId={answer.id}
                    blob={answer.blob}
                    onAnswerChange={(answer) => changeAnswers(answer)}
                  />
                ))}
              </Question>
            ))}
          </QuestionsList>
        </div>
      </main>
    </div>
  )
}
