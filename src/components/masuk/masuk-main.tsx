import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MasukLogin from "@/components/masuk/masuk-login"
import MasukRegister from "@/components/masuk/masuk-register"

export default function MasukMain() {
  return (
    <div className="flex justify-center items-center w-full h-screen md:h-[90vh]">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Registrasi</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <MasukLogin />
        </TabsContent>
        <TabsContent value="register">
          <MasukRegister />
        </TabsContent>
      </Tabs>
    </div>
  )
}