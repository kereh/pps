import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function MasukRegister() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat akun</CardTitle>
        <CardDescription>
          Pastikan anda tidak lupa dengan akun yang akan anda buat
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save password</Button>
      </CardFooter>
    </Card>
  )
}