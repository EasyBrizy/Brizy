import React from "react";
import { getProjectSettings } from "@/lib/projectSettings";

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { code } = getProjectSettings() ?? {};
  const { customCss, codeInjectionFooter, codeInjectionHeader } = code || {};

  return (
    <html lang="en">
      <head>
        <style>{customCss}</style>
      </head>
      <body className="antialiased">
        {codeInjectionHeader && (
          <div
            dangerouslySetInnerHTML={{
              __html: codeInjectionHeader,
            }}
          />
        )}
        {children}
        {codeInjectionFooter && (
          <div
            dangerouslySetInnerHTML={{
              __html: codeInjectionFooter,
            }}
          />
        )}
      </body>
    </html>
  );
}
