"use server"

import { redirect } from "next/navigation"
import { promises as fs } from "fs"
import { Options, PythonShell } from "python-shell"

enum Result {
  true = "True",
  false = "False",
}

interface ICheckFaceParams {
  iin: string
  image: string
}

export async function checkFace({ iin, image }: ICheckFaceParams) {
  const savePath = `${process.env.STORAGE_FACES}/${iin}.jpg`

  await fs.writeFile(savePath, image.split(";base64,").pop() || "", {
    encoding: "base64",
  })

  const options: Options = {
    mode: "text",
    pythonPath: process.env.PYTHON_PATH,
    args: [String(savePath), String(iin)],
  }

  const message = await PythonShell.run(
    process.env.PYTHON_SCRIPT_CHECK_FACE as string,
    options,
  )

  console.log(message)

  const response = JSON.parse(String(message))
  const result: Result = response.result

  if (result !== Result.true) throw new Error("The faces doesn't mathed")

  redirect(`/biometry/test/${iin}`)
}
