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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suratSchema } from "@/schemas/surat";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import { z } from "zod";

export default function SuratForm() {
  const { data: surat, isLoading: suratLoading } = api.surat.tipe.useQuery();
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
      // reset the form when success
      form.reset();
      // invalidate queries
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
      nik: "",
      nama: "",
      suratId: "",
      telpon: 0,
    },
  });

  function submitHandler(v: z.infer<typeof suratSchema>) {
    mutation.mutate({
      nik: v.nik,
      nama: v.nama,
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
                      disabled={field.value.length == 16 ? true : false}
                      placeholder="7173XXXXXXXXXX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukan NIK yang berjumlah 16 karakter dan diharapkan untuk
                    memasukan NIK yang valid, karena akan di cek data peminta
                    berdasarkan NIK
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
                  <FormLabel>Nama Lengkap (KTP)</FormLabel>
                  <FormControl>
                    <Input placeholder="Dian Ronaldo Kereh" {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukan nama lengkap sesuai dengan KTP
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
