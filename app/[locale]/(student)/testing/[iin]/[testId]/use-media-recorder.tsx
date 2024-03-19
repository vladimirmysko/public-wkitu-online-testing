"use client"

import { useCallback, useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { isMobile } from "react-device-detect"

export function useMediaRecorder() {
  const [recordingStatus, setRecordingStatus] = useState<
    "inactive" | "recording" | "stopped"
  >("inactive")

  const {
    status: videoStatus,
    startRecording: startVideoRecording,
    stopRecording: stopVideoRecording,
    mediaBlobUrl: videoMediaBlobUrl,
  } = useReactMediaRecorder({ video: true, audio: true })

  const {
    status: screenStatus,
    startRecording: startScreenRecording,
    stopRecording: stopScreenRecording,
    mediaBlobUrl: screenMediaBlobUrl,
  } = useReactMediaRecorder({
    screen: !isMobile,
    video: false,
    audio: false,
  })

  const startRecording = () => {
    startVideoRecording()

    if (!isMobile) {
      startScreenRecording()
    }

    setRecordingStatus("recording")
  }

  const stopRecording = () => {
    stopVideoRecording()

    if (!isMobile) {
      stopScreenRecording()
    }

    setRecordingStatus("stopped")
  }

  const getMediaBlob = useCallback(async () => {
    const videoBlob: Blob = await fetch(videoMediaBlobUrl as string).then((r) =>
      r.blob(),
    )

    let screenBlob: Blob | null = null

    if (!isMobile) {
      screenBlob = await fetch(screenMediaBlobUrl as string)
        .then((r) => r.blob())
        .then(
          (blobFile) => new File([blobFile], "screen", { type: "video/webm" }),
        )
    }

    console.log({ videoBlob, screenBlob })

    return { videoBlob, screenBlob }
  }, [screenMediaBlobUrl, videoMediaBlobUrl])

  return { recordingStatus, startRecording, stopRecording, getMediaBlob }
}
