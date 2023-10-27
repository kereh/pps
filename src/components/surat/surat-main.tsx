import SuratUser from "@/components/surat/surat-user";
import SuratForm from "@/components/surat/surat-form";

export default function SuratMain() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      <div className="w-full md:max-w-sm">
        <SuratUser />
      </div>
      <div className="w-full md:col-span-2">
        <SuratForm />
      </div>
    </div>
  );
}
