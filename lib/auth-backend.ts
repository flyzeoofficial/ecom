import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db"; 
import { backendUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, auth: adminAuth, signIn, signOut } = NextAuth({
  basePath: "/api/auth/backend",
  session: { strategy: "jwt" },
  pages: { signIn: "/backend/login" },
  cookies: {
    sessionToken: {
      name: "next-auth.backend-token",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: true },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
  if (session.user) {
    // Cast token.role so TypeScript knows it's the correct string type
    session.user.role = token.role as "admin" | "staff";
  }
  return session;
},
  },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        const [user] = await db.select().from(backendUsers).where(eq(backendUsers.email, credentials.email as string)).limit(1);
        if (!user || !(await bcrypt.compare(credentials.password as string, user.password))) return null;
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
});