import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "admin" | "staff";
  }
  interface Session {
    user: {
      role?: "admin" | "staff";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "staff";
  }
}