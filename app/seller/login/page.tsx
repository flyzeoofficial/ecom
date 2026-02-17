"use client";
import { signIn } from "next-auth/react";

export default function SellerLoginPage() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // THE FIX: Point to the seller API
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: "/seller/dashboard",
      redirect: true,
    }, { 
      basePath: "/api/auth/seller" 
    });
  };

  return (
    <form onSubmit={handleLogin} className="p-20 flex flex-col gap-4">
       <h1 className="text-xl font-bold text-blue-600">Seller Login</h1>
       <input name="email" type="email" placeholder="Email" className="border p-2" />
       <input name="password" type="password" placeholder="Password" className="border p-2" />
       <button type="submit" className="bg-blue-600 text-white p-2">Login</button>
    </form>
  );
}