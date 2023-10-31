import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import AdminSurat from "@/components/admin/admin-surat";
import AdminUser from "@/components/admin/admin-users";

export default function AdminMain() {
  const { status } = useSession();
  const { data: users, isLoading: loadingUser } =
    api.users.semuaUser.useQuery();
  const { data: surat, isLoading: loadingSurat } =
    api.surat.semuaSurat.useQuery();

  if (status == "loading")
    return (
      <div className="grid h-screen w-full place-content-center">
        <h1>Memuat...</h1>
      </div>
    );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 place-content-center gap-6 py-10">
        {/* surat masuk */}
        {loadingSurat ? (
          <div className="grid h-screen place-content-center">
            Memuat Daftar Surat...
          </div>
        ) : (
          // @ts-ignore
          <AdminSurat data={surat} />
        )}
        {/* daftar user */}
        {loadingUser ? (
          <div className="grid h-screen place-content-center">
            Memuat Daftar Pengguna...
          </div>
        ) : (
          // @ts-ignore
          <AdminUser data={users} />
        )}
      </div>
    </div>
  );
}
