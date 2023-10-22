import { SessionProvider } from "next-auth/react"
import { type Session } from "next-auth"
import { type AppType } from "next/app"
import { api } from "@/utils/api"
// components
import ThemeProvider from "@/components/theme-provider"
import HeaderMain from "@/components/header/header-main"
import Head from "next/head"
// tailwindcss
import "@/styles/globals.css"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <Head>
          <title>Permintaan Pembuatan Surat</title>
        </Head>
        <div className="flex flex-col h-screen">
          <HeaderMain />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default api.withTRPC(MyApp)
