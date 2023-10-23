import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getServerAuthSession } from "@/server/auth"
import MasukMain from "@/components/masuk/masuk-main"

export default function Masuk() {
  return (
    <div className="container">
      <MasukMain />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx)
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}