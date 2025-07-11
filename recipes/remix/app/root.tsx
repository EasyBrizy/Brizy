import type { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useMatches } from "@remix-run/react";
import { ReactNode } from "react";
import appStylesHref from "./tailwind.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: appStylesHref }];

export function Layout({ children }: { children: ReactNode }) {
  const [, template] = useMatches();
  const isEditor = typeof template?.params?.collection === "string";
  const className = isEditor ? "editor" : "cms";
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={className}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
