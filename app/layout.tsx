import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogs Box",
  description: "The box contains interesting content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-slate-100/30 text-slate-700")}>
        {/* <nav className="">This is navbar</nav> */}
        {children}
      </body>
    </html>
  );
}
