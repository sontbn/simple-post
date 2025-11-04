import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import SignInForm from "@/components/SignInForm"

export default async function SignIn() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/posts")
  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Sign In</h2>
        <SignInForm />
      </div>
    </div>
  )
}
