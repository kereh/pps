import { useSession } from "next-auth/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "@/components/ui/card"


export default function AdminUserInfo() {

  const { data: user, status } = useSession()

  return (
    <Card className="w-full md:max-w-sm">
      <CardHeader>
        <CardTitle>User Info</CardTitle>
        <CardDescription>USER ID{" "}
          <span className="text-primary dark:text-green-700">{user?.user.id}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}