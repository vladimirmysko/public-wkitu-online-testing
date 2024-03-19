"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useI18n } from "@/locales/client"
import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"
import { Select, SelectField } from "@/components/ui/select"
import { Input, InputField } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface IUserAuthFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {}

export function UserAuthForm({ className, ...props }: IUserAuthFormProps) {
  const router = useRouter()
  const t = useI18n()

  const users = [
    { id: 1, username: t("home.student") },
    { id: 3, username: t("home.admin") },
  ]

  const [userId, setUserId] = useState(users[0].id)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const signInResult = await signIn("credentials", {
      userId,
      password,
      redirect: false,
    })

    if (!signInResult) {
      alert(t("errors.next_auth_error"))
      setLoading(false)
      return
    }

    if (signInResult.error) {
      alert(t("errors.credentials_error"))
      setLoading(false)
      return
    }

    const redirectPath =
      userId === 1 ? "/biometry/iin" : "/dashboard/tests-results"

    router.push(redirectPath)
  }

  return (
    <form
      className={cn("flex flex-col items-stretch gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-stretch gap-4">
        <SelectField>
          <Label htmlFor="user_id">{t("home.user_type")}</Label>
          <Select
            disabled={loading}
            id="user_id"
            onChange={(e) => setUserId(Number(e.target.value))}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </Select>
        </SelectField>
        <InputField>
          <Label htmlFor="password">{t("home.password")}</Label>
          <Input
            disabled={loading}
            id="password"
            placeholder={t("home.enter_password")}
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputField>
      </div>
      <Button disabled={loading} type="submit">
        {loading ? t("loading") : t("home.sign_in_to_account")}
      </Button>
    </form>
  )
}
