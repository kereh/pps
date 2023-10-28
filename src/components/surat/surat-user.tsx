import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@/utils/api";

export default function SuratUser() {
  const { data: surat, isLoading: suratLoading } =
    api.surat.suratUserByTipe.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permintaan saya</CardTitle>
        <CardDescription>Daftar permintaan yang anda buat</CardDescription>
      </CardHeader>
      <CardContent>
        {suratLoading ? (
          <p>Memuat...</p>
        ) : (
          <Accordion type="single" collapsible>
            {surat?.map((s, i) => (
              <AccordionItem key={i} value={`item-${i + 1}`}>
                <AccordionTrigger>{s.tipe_surat}</AccordionTrigger>
                <AccordionContent>{s.daftar_surat.length}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
