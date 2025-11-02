'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuth } from "@/app/AuthContext"
import { useRouter } from "next/navigation"

export function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter(); 
  const { login } = useAuth();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const[success, setSuccess] = useState(false)
  const[error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(false)
    setSuccess(false)
    setLoading(true)

    try {
      const res = await fetch("http://localhost:3001/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) throw new Error("Erro no login")

      const data = await res.json()
      setSuccess(true)

      // Exemplo: redirecionar ou salvar token
      login(data.accessToken)
      document.cookie = `session=${data.accessToken}`;
      await router.push("/market")

    } catch (err) {
      setError(true)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
              </Field>

              {error && <p className="text-red-600 text-sm">Anything goes wrong!</p>}
            {success && <p className="text-green-600 text-sm">Logged successfully!</p>}

              <Field>
                <Button type="submit" disabled={loading}>Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
