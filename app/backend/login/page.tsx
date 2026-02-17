"use client";
import { signIn } from "next-auth/react";

export default function BackendLoginPage() {
  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // We call signIn but explicitly tell it the redirect and the internal route
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/backend/dashboard",
      }, {
        // This is critical - it forces the library to use the custom route
        basePath: "/api/auth/backend",
      });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-20 flex flex-col gap-4">
       <h1 className="text-xl font-bold">Admin Login</h1>
       <input name="email" type="email" placeholder="Email" className="border p-2" />
       <input name="password" type="password" placeholder="Password" className="border p-2" />
       <button type="submit" className="bg-black text-white p-2">Login</button>
    </form>
  );
}