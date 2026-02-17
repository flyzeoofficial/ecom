import { SessionProvider } from "next-auth/react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    // Crucial: The provider must know the base path too!
    <SessionProvider basePath="/api/auth/backend">
      {children}
    </SessionProvider>
  );
}