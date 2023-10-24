import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import DesktopMenu from "@/components/header/header-desktop"
import MobileMenu from "@/components/header/header-mobile"
import ThemeChanger from "@/components/theme-changer"
import Icons from "@/components/icons"
import React from "react"

export default function HeaderMain() {

  const [show, setShow] = React.useState<boolean>(false)
  const { data, status } = useSession()

  return (
    <header className="sticky top-0 left-0 w-full border-b bg-transparent backdrop-blur-sm">
      <div className="container py-3 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* brand */}
          <div className="flex flex-items">
            <h1 className="text-2xl font-semibold">PPS</h1>
          </div>
          {/* desktop menu goes here */}
          {status == "loading" ? "loading..." : (<DesktopMenu />)}
        </div>
        {/* hamburger icon goes here */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeChanger />
          <Icons.menu onClick={() => setShow(!show)} />
        </div>
        <div className="hidden md:flex items-center gap-3">
          <ThemeChanger />
          {data?.user && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.split(" ").length! > 1
                        ? data.user.name?.split(" ")[0]?.[0] + data.user.name?.split(" ")[1]?.[0]!
                        : data.user.name?.split(" ")[0]?.[0]
                      }
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{data.user.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

          )}
        </div>
      </div>
      <MobileMenu
        isShowing={show}
        setShowing={setShow}
      />
    </header>
  )
}