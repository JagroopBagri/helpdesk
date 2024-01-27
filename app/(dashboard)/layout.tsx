// components
import Navbar from '@/app/components/Navbar'

export default function DashboardLayout({ children }: any) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}