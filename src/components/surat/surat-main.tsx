import SuratUser from "@/components/surat/surat-user"
import SuratForm from "@/components/surat/surat-form"

export default function SuratMain() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="w-full md:max-w-sm">
        <SuratUser />
      </div>
      <div className="w-full md:col-span-2">
        <SuratForm />
      </div>
    </div>
  )
}