import React from "react";
import "@/app/admin.css";

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased cms">{children}</body>
    </html>
  );
}
