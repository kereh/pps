import { Form, FormField, FormControl, FormItem, FormMessage, FormLabel } from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/schemas/login"
import { useToast } from "../ui/use-toast"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { z } from "zod"

export default function MasukLogin() {

  const { toast } = useToast()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  })

  async function onSubmit(val: z.infer<typeof loginSchema>) {
    await signIn("login_pps", {
      username: val.username,
      password: val.password,
      redirect: false
    }).then((val) => {
      if (!val?.error) {
        toast({
          title: "Login OK",
          description: "Login berhasil"
        })
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Silahkan isi form dibawah ini untuk login
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Masuk</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}