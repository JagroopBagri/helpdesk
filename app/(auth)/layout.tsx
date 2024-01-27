import Link from "next/link"

export default function AuthLayout({ children }: any) {
  return (
    <>
      <nav>
        <h1>Helpdesk</h1>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Login</Link>
      </nav>
      {children}
    </>
  )
}