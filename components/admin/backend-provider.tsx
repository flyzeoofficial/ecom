"use client";

import { SessionProvider } from "next-auth/react";

export function BackendProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider basePath="/api/auth/backend">
      {children}
    </SessionProvider>
  );
}