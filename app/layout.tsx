import NextTopLoader from "nextjs-toploader";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { neobrutalism } from "@clerk/themes";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { cn } from "@/lib/utils";
import ModalProvider from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guild chat app",
  description: "Generated by Joshua Arnaez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en">
        <body className={cn(font.className, "bg-white dark:bg-dark-theme")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="guild-chat-theme"
          >
            <Toaster position="top-right" />
            <SocketProvider>
              <ModalProvider />
              <NextTopLoader />
              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
