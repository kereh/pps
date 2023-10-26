import { useSession } from "next-auth/react"
import AdminUserInfo from "@/components/admin/admin-user-info"

export default function AdminMain() {

  const { status } = useSession()

  return (
    <div className="w-full">
      {status == "loading" && (
        <div className="w-full h-screen grid place-content-center">
          <h1>Memuat Data...</h1>
        </div>
      )}
      <div className="grid grid-cols-1 place-content-center py-5 gap-6">
        <AdminUserInfo />
        <div className="w-full">
        </div>
      </div>
    </div>
  )
}