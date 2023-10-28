import { type GetServerSideProps, GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import SuratList from "@/components/surat/surat-list";

export default function Daftar() {
  const { data: surat, isLoading: loading } = api.surat.suratByUser.useQuery();
  return (
    <div className="container">
      {loading ? (
        <div className="grid h-screen place-content-center">Memuat...</div>
      ) : (
        // @ts-ignore
        <SuratList data={surat} />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const session = await getServerAuthSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/masuk",
        permanent: false,
      },
    };
  } else if (session.user.role == "ADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
