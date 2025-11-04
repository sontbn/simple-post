import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

async function create(data: FormData) {
  'use server'
  const name = String(data.get('name')||'')
  const email = String(data.get('email')||'')
  const password = String(data.get('password')||'')
  const hashed = await bcrypt.hash(password, 10)
  await prisma.user.create({ data: { name, email, password: hashed } })
  redirect('/sign-in')
}

export default function SignUp() {
  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title">Sign Up</h2>
        <form action={create} className="space-y-3">
          <input name="name" className="input input-bordered w-full" placeholder="Name" />
          <input name="email" type="email" className="input input-bordered w-full" placeholder="Email" />
          <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" />
          <button className="btn btn-primary w-full">Create Account</button>
        </form>
      </div>
    </div>
  )
}
