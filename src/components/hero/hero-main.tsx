import { Button } from "@/components/ui/button";

export default function HeroMain() {
  return (
    <div className="grid h-screen w-full place-content-center md:h-[75vh] 2xl:h-[87vh]">
      <div className="w-full md:max-w-sm">
        <div className="flex flex-col space-y-3 md:items-center md:text-center">
          <h1 className="text-2xl font-semibold text-primary">
            Permintaan
            <span className="block">Pembuatan Surat</span>
          </h1>
          <h2 className="text-base text-muted-foreground">
            Aplikasi ini dibuat untuk mempermudah membuat surat di Kantor
            kelurahan.
          </h2>
          <Button className="w-full md:w-1/3">Buat Surat</Button>
        </div>
      </div>
    </div>
  );
}
