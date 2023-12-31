import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suratSchema } from "@/schemas/surat";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { z } from "zod";

export default function SuratForm() {
  const { data: surat, isLoading: suratLoading } = api.surat.tipe.useQuery();
  const { data: user } = useSession();
  const { toast } = useToast();
  const utils = api.useUtils();

  const mutation = api.surat.buat.useMutation({
    onSuccess(data) {
      toast({
        title: "Permintaan berhasil dikirim",
        description: (
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      form.reset();
      utils.surat.suratByUser.invalidate();
      utils.surat.suratUserByTipe.invalidate();
    },
    onError() {
      toast({
        title: "Permintaan gagal dikirim",
        description: "Periksa kembali data yang anda masukan di form",
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof suratSchema>>({
    resolver: zodResolver(suratSchema),
    defaultValues: {
      nama: "",
      nik: "",
      suratId: "",
      telpon: 0,
    },
  });

  function submitHandler(v: z.infer<typeof suratSchema>) {
    mutation.mutate({
      nama: user?.user.name!,
      nik: user?.user.nik!,
      telpon: v.telpon,
      suratId: v.suratId,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Permintaan</CardTitle>
        <CardDescription>
          Silahkan buat permintaan pembuatan surat dengan mengisi form dibawah
          ini
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Induk Kependudukan</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`${user?.user.nik}`}
                      value={user?.user.nik!}
                      readOnly
                    />
                  </FormControl>
                  <FormDescription>
                    Masukan NIK yang berjumlah 16 karakter dan diharapkan untuk
                    memasukan NIK yang valid.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`${user?.user.name}`}
                      value={user?.user.name!}
                      readOnly
                    />
                  </FormControl>
                  <FormDescription>
                    Nama lengkap mengikuti nama yang sudah didaftarkan pada akun
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telpon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Telepon</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="08XXXXXXXXXXX"
                      type="number"
                      inputMode="decimal"
                      {...field}
                      {...form.register("telpon", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukan nomor telepon yang masih AKTIF
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="suratId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surat</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih surat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suratLoading ? (
                        <SelectItem value="loading">Memuat...</SelectItem>
                      ) : (
                        surat?.map((s, i) => (
                          <SelectItem key={i} value={s.id}>
                            {s.tipe_surat}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Pilih surat yang ingin dibuat
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
