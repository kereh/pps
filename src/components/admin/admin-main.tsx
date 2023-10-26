import { useSession } from "next-auth/react"
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "../ui/card"

export default function AdminMain() {

  const { data: user, status } = useSession()

  return (
    <div className="w-full">
      {status == "loading" && (
        <div className="w-full h-screen grid place-content-center">
          <h1>Memuat Data...</h1>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 place-content-center py-5 gap-6">
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
        <div className="w-full">
          right side
        </div>
      </div>
    </div>
  )
}