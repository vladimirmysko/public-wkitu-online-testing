"use client"

import { useState } from "react"

export function useAnswers() {
  const [answers, setAnswers] = useState<number[]>([])

  const changeAnswers = (answer: { id: number; checked: boolean }) => {
    const { checked, id } = answer

    if (checked) {
      const answer = answers.find((a) => a == id)
      !answer && setAnswers((prev) => [...prev, id])
    } else {
      const _answers = [...answers]
      const index = answers.findIndex((a) => a == id)
      _answers.splice(index, 1)

      setAnswers(_answers)
    }
  }

  return { answers, changeAnswers }
}
