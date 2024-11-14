import type { Metadata } from "next";
import "./globals.css";
import TanstackProvider from "../../providers/TanstackProvider";
import CartProviders from "../../providers/CartProvider";

export const metadata: Metadata = {
  title: "Midcommerces",
  description: "next js midcommerces template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <TanstackProvider>
        {children}
      </TanstackProvider>
      </body>
    </html>
  );
}
