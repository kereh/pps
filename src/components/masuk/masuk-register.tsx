import { Form, FormField, FormControl, FormItem, FormDescription, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { registerSchema } from "@/schemas/register"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { api } from "@/utils/api"
import { z } from "zod"

export default function MasukRegister() {

  const { toast } = useToast()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      name: ""
    }
  })

  const mutation = api.autentikasi.registrasi.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Registrasi berhasil!",
        description: (
          <pre className="p-4">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      })
      form.reset()
    },
    onError(error, variables, context) {
      toast({
        title: "Terjadi Kesalahan",
        description: JSON.stringify(error.data?.code)
      })
    },
  })

  function onSubmit(val: z.infer<typeof registerSchema>) {
    mutation.mutate({
      name: val.name,
      username: val.username,
      password: val.password
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat akun</CardTitle>
        <CardDescription>
          Pastikan anda tidak lupa dengan akun yang akan anda buat
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123" {...field} />
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
                    <Input placeholder="*****" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Save password</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}