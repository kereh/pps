import { type DefaultSession, type Session } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      nik: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role: string;
    nik: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    nik: string;
  }
}
