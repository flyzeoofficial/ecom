import { SessionProvider } from "next-auth/react";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    // Crucial: The provider must know the base path too!
    <SessionProvider basePath="/api/auth/seller">
      {children}
    </SessionProvider>
  );
}