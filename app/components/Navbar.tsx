import Link from "next/link";
import Logo from "../../public/help-desk-logo.png";
import Image from "next/image";
import LogoutButton from './LogoutButton'

export default function Navbar({ user }: any) {
  return (
    <nav>
      <Image
        src={Logo}
        alt='Helpdesk logo'
        width={200}
        placeholder='blur'
        quality={100}
      />
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">Tickets</Link>
      {user && <span>Hello, {user.email}</span>}
      {user && <LogoutButton />}
    </nav>
  )
}

