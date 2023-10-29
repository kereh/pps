import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import AdminUser from "@/components/admin/admin-users";

export default function AdminMain() {
  const { status } = useSession();
  const { data: users, isLoading: loading } = api.users.semuaUser.useQuery();

  if (status == "loading")
    return (
      <div className="grid h-screen w-full place-content-center">
        <h1>Memuat...</h1>
      </div>
    );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 place-content-center gap-6 py-5 md:grid-cols-2">
        {/* daftar user */}
        {loading ? (
          <div className="grid h-screen place-content-center">Memuat...</div>
        ) : (
          // @ts-ignore
          <AdminUser data={users} />
        )}
        {/* surat masuk */}
      </div>
    </div>
  );
}
