import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpringProvider } from "./context/SpringContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Framer Motion Test",
  description: "Testing Framer Motion animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpringProvider>
          {children}
        </SpringProvider>
      </body>
    </html>
  );
}
