import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getServerAuthSession } from "@/server/auth"
import AdminMain from "@/components/admin/admin-main"

export default function index() {
  return (
    <div className="container">
      <AdminMain />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx)
  if (!session) {
    return {
      redirect: {
        destination: "/masuk",
        permanent: false
      }
    }
  } else if (session.user.role == "USER") {
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