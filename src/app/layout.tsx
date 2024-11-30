import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../store/ReduxProvider";
import { UserProvider } from "@/context/user";

const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Лучший сервис в мире",
  description: "Skypromusic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
      <ReduxProvider>
        <body className={montserrat.className}>{children}</body>
      </ReduxProvider>
      </UserProvider>
    </html>
  );
}