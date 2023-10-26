import { useSession } from "next-auth/react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from "@/components/ui/card"


export default function AdminUserInfo() {

  const { data: user, status } = useSession()

  return (
    <Card className="w-full md:max-w-sm">
      <CardHeader>
        <CardTitle>Login as {user?.user.name}</CardTitle>
        <CardDescription>USER ID{" "}
          <span className="text-primary dark:text-green-700">{user?.user.id}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  )
}