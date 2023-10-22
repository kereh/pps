import { Button } from "@/components/ui/button"

export default function HeroMain() {
  return (
    <div className="grid place-content-center h-screen md:h-[75vh] w-full">
      <div className="w-full md:max-w-sm">
        <div className="flex flex-col space-y-3">
          <h1 className="text-2xl text-primary font-semibold">Permintaan
            <span className="block">Pembuatan Surat</span>
          </h1>
          <h2 className="text-base text-muted-foreground">
            Aplikasi ini dibuat untuk mempermudah membuat surat di Kantor kelurahan.
          </h2>
          <Button className="w-full md:w-1/3">Buat Surat</Button>
        </div>
      </div>
    </div>
  )
}