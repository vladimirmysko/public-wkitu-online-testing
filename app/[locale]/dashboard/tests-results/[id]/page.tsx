import { redirect } from "next/navigation"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { SubmitButtons } from "./submit-buttons"

interface ITestResultPageProps {
  params: { id: string }
}

export default async function TestResultPage({ params }: ITestResultPageProps) {
  const t = await getI18n()

  const testResult = await db.testResult.findUnique({
    where: { id: Number(params.id) },
    include: { student: true, test: true, eventLogs: true, voiceRecords: true },
  })

  if (!testResult) {
    redirect("/dashboard/tests-results")
  }

  return (
    <form
      className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-6 py-6"
      autoComplete="off"
    >
      <dl className="divide-y divide-zinc-100">
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">id</dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <input name="id" type="hidden" defaultValue={testResult.id} />
            {testResult?.id}
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.full_name")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            {testResult.student.fullName}
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.discipline")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            {testResult?.test.discipline}
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.digit")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <Input
              name="digit"
              defaultValue={testResult.digit}
              className="w-full"
            />
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.letter")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <Input
              name="letter"
              defaultValue={testResult.letter}
              className="w-full"
            />
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.percent")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <Input
              name="percent"
              defaultValue={testResult.percent}
              className="w-full"
            />
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.event_logs")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            <div className="overflow-auto p-3">
              <table>
                <tbody>
                  {testResult?.eventLogs.map((eventLog, index) => (
                    <tr
                      className={cn(
                        index !== testResult?.eventLogs.length - 1 &&
                          "border-b border-zinc-950/10",
                      )}
                      key={`event_log-${eventLog.id}`}
                    >
                      <td className="py-2 text-left align-top text-sm text-zinc-950">
                        {eventLog.timeCode}
                      </td>
                      <td className="py-2 pl-2 text-left align-top text-sm text-zinc-950">
                        {eventLog.event}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </dd>
        </div>
        <div className="px-4 py-6 tracking-wide sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-zinc-950">
            {t("table.voice_records")}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-zinc-700 sm:col-span-2 sm:mt-0">
            {testResult?.voiceRecords.map((voiceRecord) => (
              <p
                className="text-sm tracking-wide text-zinc-950"
                key={`voice-${voiceRecord.id}`}
              >
                {voiceRecord.text}
              </p>
            ))}
          </dd>
        </div>
      </dl>
      <div className="flex flex-row items-center justify-end gap-4">
        <SubmitButtons />
      </div>
    </form>
  )
}
