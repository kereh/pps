import Link from "next/link"
import Icons from "@/components/icons"

export default function DesktopMenu() {
  return (
    <div className="md:flex flex-items gap-8 text-sm hidden">
      <Link href="/">
        <div className="flex flex-items gap-2">
          <Icons.home className="w-5 h-5" />
          <span>Beranda</span>
        </div>
      </Link>
      <Link href="/">
        <div className="flex flex-items gap-2">
          <Icons.mail className="w-5 h-5" />
          <span>Buat Surat</span>
        </div>
      </Link>
      <Link href="/masuk">
        <div className="flex flex-items gap-2">
          <Icons.login className="w-5 h-5" />
          <span>Masuk</span>
        </div>
      </Link>
    </div>
  )
}