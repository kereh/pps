import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { signOut, useSession } from "next-auth/react"
import Icons from "@/components/icons"
import Link from "next/link"

export default function DesktopMenu() {

  const { data, status } = useSession()

  return (
    <div className="md:flex flex-items gap-8 text-sm hidden">
      <Link href="/">
        <div className="flex flex-items gap-2">
          <Icons.home className="w-5 h-5" />
          <span>Beranda</span>
        </div>
      </Link>
      {data?.user.role == "USER" && (
        <Link href="/">
          <div className="flex flex-items gap-2">
            <Icons.mail className="w-5 h-5" />
            <span>Buat Surat</span>
          </div>
        </Link>
      )}
      {data?.user.role == "ADMIN" && (
        <Link href="/">
          <div className="flex flex-items gap-2">
            <Icons.mail className="w-5 h-5" />
            <span>Admin</span>
          </div>
        </Link>
      )}
      {status == "unauthenticated" && (
        <Link href="/masuk">
          <div className="flex flex-items gap-2">
            <Icons.login className="w-5 h-5" />
            <span>Masuk</span>
          </div>
        </Link>
      )}
      {status == "authenticated" && (
        <AlertDialog>
          <AlertDialogTrigger className="text-destructive">Log Out</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Log Out dari akun?</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah anda yakin ingin log out dari akun? Pilih YA untuk Log Out
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Tidak</AlertDialogCancel>
              <AlertDialogAction onClick={() => signOut()}>YA</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}