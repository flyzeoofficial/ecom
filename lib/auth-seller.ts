import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db"; 
import { sellers } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, auth: sellerAuth, signIn, signOut } = NextAuth({
  basePath: "/api/auth/seller",
  session: { strategy: "jwt" },
  pages: { signIn: "/seller/login" },
  cookies: {
    sessionToken: {
      name: "next-auth.seller-token",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: true },
    },
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const [user] = await db.select().from(sellers).where(eq(sellers.email, credentials.email as string)).limit(1);
        if (!user || !(await bcrypt.compare(credentials.password as string, user.password))) return null;
        return { id: user.id, email: user.email };
      },
    }),
  ],
});