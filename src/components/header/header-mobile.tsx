import { Transition } from "@headlessui/react"
import { Separator } from "@/components/ui/separator"
import Icons from "@/components/icons"
import Link from "next/link"
import React from "react"

interface Props {
  isShowing: boolean
  setShowing: React.Dispatch<boolean>
}

export default function MobileMenu({ isShowing, setShowing }: Props) {
  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="fixed top-0 left-0 h-screen w-full backdrop-blur"
    >
      <div className="h-screen w-2/3 border-r bg-background">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            {/* brand */}
            <h1 className="text-2xl font-semibold">PPS</h1>
            <Icons.close onClick={() => setShowing(!isShowing)} />
          </div>
          <Separator className="mb-3 mt-8" />
          <p className="text-muted-foreground italic">Permintaan Pembuatan Surat</p>
          <Separator className="mt-3 mb-8" />
          <div className="flex flex-col gap-8">
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
        </div>
      </div>
    </Transition>
  )
}