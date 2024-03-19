import Image from "next/image"
import { notFound } from "next/navigation"
import { getI18n } from "@/locales/server"
import { db } from "@/lib/db"

import logoPicture from "@/public/logo.png"

interface ITestsResultsReportPageProps {
  params: { groupId: string; testId: string }
}

export default async function TestsResultsReportPage({
  params,
}: ITestsResultsReportPageProps) {
  const { groupId, testId } = params
  const t = await getI18n()

  const date = new Date()
  const year = date.getFullYear()

  const group = await db.group.findUnique({
    where: { id: Number(groupId) },
    include: {
      tests: {
        where: { id: Number(testId) },
        include: {
          testResults: {
            where: {
              testId: Number(testId),
              student: { groupId: Number(groupId) },
            },
          },
        },
      },
      students: {
        orderBy: { fullName: "asc" },
        include: {
          testResult: {
            where: { testId: Number(testId) },
          },
        },
      },
    },
  })

  if (!group) {
    return notFound()
  }

  return (
    <div className="flex min-h-[210mm] w-[297mm] flex-col items-stretch gap-6 p-8 tracking-wider">
      <div className="flex flex-row items-center justify-between text-sm">
        <span>Батыс Қазақстан инновациялық-технологиялық университеті</span>
        <Image alt={t("wkitu_logo")} src={logoPicture} height={48} width={48} />
        <span>
          Западно-Казахстанский инновационно-технологический университет
        </span>
      </div>
      <div className="flex flex-col items-center text-sm">
        <div className="font-semibold">ВЕДОМОСТЬ №</div>
        <div>Без учета апелляции</div>
      </div>
      <table>
        <tbody>
          <tr>
            <td className="py-0.5 text-left text-sm font-normal tracking-wider">
              Дисциплина
            </td>
            <td className="py-0.5 text-left text-sm font-semibold tracking-wider">
              {group.tests[0].discipline}
            </td>
          </tr>
          <tr>
            <td className="py-0.5 text-left text-sm font-normal tracking-wider">
              Группа
            </td>
            <td className="py-0.5 text-left text-sm font-semibold tracking-wider">
              {group.name}
            </td>
          </tr>
          <tr>
            <td className="py-0.5 text-left text-sm font-normal tracking-wider">
              Преподаватель
            </td>
            <td className="py-0.5 text-left text-sm font-semibold tracking-wider">
              {group.tests[0].author}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="w-full border-collapse border border-neutral-950">
        <thead>
          <tr>
            <th className="border border-neutral-950 px-2 py-1 text-left text-sm font-semibold tracking-wider">
              №
            </th>
            <th className="border border-neutral-950 px-2 py-1 text-left text-sm font-semibold tracking-wider">
              Фамилия Имя Отчество
            </th>
            <th className="border border-neutral-950 px-2 py-1 text-left text-sm font-semibold tracking-wider">
              Цифр.
            </th>
            <th className="border border-neutral-950 px-2 py-1 text-left text-sm font-semibold tracking-wider">
              Букв.
            </th>
            <th className="border border-neutral-950 px-2 py-1 text-left text-sm font-semibold tracking-wider">
              Проц.
            </th>
          </tr>
        </thead>
        <tbody>
          {group.students.map((student, index) => (
            <tr key={`s-${student.id}`}>
              <td className="border border-neutral-950 px-2 py-1 text-left text-sm font-normal tracking-wider">
                {index + 1}
              </td>
              <td className="border border-neutral-950 px-2 py-1 text-left text-sm font-normal tracking-wider">
                {student.fullName}
              </td>
              <td className="border border-neutral-950 px-2 py-1 text-left text-sm font-normal tracking-wider">
                {student.testResult[0]
                  ? student.testResult[0].digit
                  : "Нет результата"}
              </td>
              <td className="border border-neutral-950 px-2 py-1 text-left text-sm font-normal tracking-wider">
                {student.testResult[0]
                  ? student.testResult[0].letter
                  : "Нет результата"}
              </td>
              <td className="border border-neutral-950 px-2 py-1 text-left text-sm font-normal tracking-wider">
                {student.testResult[0]
                  ? student.testResult[0].percent
                  : "Нет результата"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="max-w-fit">
        <tbody>
          <tr>
            <td className="py-0.5 pr-4 text-sm">Число обучающихся:</td>
            <td className="py-0.5 pr-4 text-sm">{group.students.length}</td>
          </tr>
          <tr>
            <td className="py-0.5 pr-4 text-sm">Сдали:</td>
            <td className="py-0.5 pr-4 text-sm">
              {group.tests[0].testResults.length}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="max-w-fit">
        <tbody>
          <tr>
            <td className="py-2 pr-4 text-sm">Подпись преподавателя</td>
            <td className="inline-block space-x-2 whitespace-nowrap py-2 pr-4 text-sm">
              <div className="flex flex-row items-end gap-1">
                <div className="w-36 border-b border-neutral-950"></div>
                <div>/</div>
                <div className="flex w-56 flex-row items-end border-b border-neutral-950">
                  <span>«</span>
                  <span className="w-2"></span>
                  <span>»</span>
                  <span className="flex-1"></span>
                  <span>{`${year} г.`}</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-2 pr-4 text-sm">Офис регистратор</td>
            <td className="inline-block space-x-2 whitespace-nowrap py-2 pr-4 text-sm">
              <div className="flex flex-row items-end gap-1">
                <div className="w-36 border-b border-neutral-950"></div>
                <div>/</div>
                <div className="flex w-56 flex-row items-end border-b border-neutral-950">
                  <span>«</span>
                  <span className="w-2"></span>
                  <span>»</span>
                  <span className="flex-1"></span>
                  <span>{`${year} г.`}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
