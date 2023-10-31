import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { registerSchema } from "@/schemas/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { z } from "zod";

export default function MasukRegister() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      nik: "",
    },
  });

  const mutation = api.autentikasi.registrasi.useMutation({
    onSuccess: (data) => {
      toast({
        title: "Registrasi berhasil!",
        description: "Akun anda berhasil didaftarkan",
      });
      form.reset();
    },
    onError(error) {
      toast({
        title: "Terjadi Kesalahan",
        description: JSON.stringify(error.data?.code),
      });
    },
  });

  function onSubmit(val: z.infer<typeof registerSchema>) {
    mutation.mutate({
      nik: val.nik,
      name: val.name,
      username: val.username,
      password: val.password,
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Buat akun</CardTitle>
        <CardDescription>
          Pastikan anda tidak lupa dengan akun yang akan anda buat
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        {mutation.isLoading ? (
          <CardContent>Mendaftarkan akun...</CardContent>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Induk Kependudukan (NIK)</FormLabel>
                    <FormControl>
                      <Input placeholder="7173XXXXXXXXXX" {...field} />
                    </FormControl>
                    <FormDescription>
                      Harap memasukan NIK dengan benar yang berjumlah 16 digit.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Masukan nama lengkap sesuai KTP
                    </FormDescription>
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
              <Button type="submit" disabled={mutation.isLoading}>
                Save password
              </Button>
            </CardFooter>
          </form>
        )}
      </Form>
    </Card>
  );
}
