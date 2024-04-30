import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import "./globals.css";
import ModalProvider from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toast-provider";
import { EdgeStoreProvider } from '../lib/edgestore';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BgPretty",
  description: "AI Product background generator",
  manifest:"/manifest.json"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider/>
          <ModalProvider/>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </body>
      </html>
    </ClerkProvider>  
  );
}
