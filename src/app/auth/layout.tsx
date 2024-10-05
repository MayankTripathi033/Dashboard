// src/app/auth/layout.tsx
"use client";

import type { Metadata } from "next";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="auth-container">
          {children} {/* This will render the login/register pages */}
        </div>
      </body>
    </html>
  );
}
