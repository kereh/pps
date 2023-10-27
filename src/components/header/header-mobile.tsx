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
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { signOut, useSession } from "next-auth/react";
import { Transition } from "@headlessui/react";
import Icons from "@/components/icons";
import Link from "next/link";
import React from "react";

interface Props {
  isShowing: boolean;
  setShowing: React.Dispatch<boolean>;
}

export default function MobileMenu({ isShowing, setShowing }: Props) {
  const { data, status } = useSession();

  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed left-0 top-0 h-screen w-full backdrop-blur"
    >
      <div className="h-screen w-2/3 border-r bg-background">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            {/* brand */}
            <h1 className="text-2xl font-semibold">PPS</h1>
            <Icons.close onClick={() => setShowing(!isShowing)} />
          </div>
          <Separator className="mb-3 mt-8" />
          <p className="italic text-muted-foreground">
            Permintaan Pembuatan Surat
          </p>
          <Separator className="mb-8 mt-3" />
          <div className="flex flex-col gap-8">
            <Link href="/" onClick={() => setShowing(!isShowing)}>
              <div className="flex-items flex gap-2">
                <Icons.home className="h-5 w-5" />
                <span>Beranda</span>
              </div>
            </Link>
            {data?.user.role == "USER" && (
              <Link href="/surat">
                <div className="flex-items flex gap-2">
                  <Icons.mail className="h-5 w-5" />
                  <span>Buat Surat</span>
                </div>
              </Link>
            )}
            {data?.user.role == "ADMIN" && (
              <Link href="/admin">
                <div className="flex-items flex gap-2">
                  <Icons.admin className="h-5 w-5" />
                  <span>Admin</span>
                </div>
              </Link>
            )}
            {status == "unauthenticated" ? (
              <Link href="/masuk" onClick={() => setShowing(!isShowing)}>
                <div className="flex-items flex gap-2">
                  <Icons.login className="h-5 w-5" />
                  <span>Masuk</span>
                </div>
              </Link>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger className="text-destructive">
                  Log Out
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Log Out dari akun?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Apakah anda yakin ingin log out dari akun? Pilih YA untuk
                      Log Out
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Tidak</AlertDialogCancel>
                    <AlertDialogAction onClick={() => signOut()}>
                      YA
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </Transition>
  );
}
