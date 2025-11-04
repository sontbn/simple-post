"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await signIn("credentials", {
      redirect: true,
      callbackUrl: "/posts",
      email,
      password,
    })
    if (!res || res.error) setError("Invalid credentials")
    setLoading(false)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        name="email"
        type="email"
        className="input input-bordered w-full"
        placeholder="Email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
      />
      <input
        name="password"
        type="password"
        className="input input-bordered w-full"
        placeholder="Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />
      {error && <div className="alert alert-error">{error}</div>}
      <button className="btn btn-primary w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  )
}
