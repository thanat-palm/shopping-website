import type { Metadata } from "next";
import { Inter , Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "WebSHOP",
  description: "website shopping online !!",
  icons: {
    icon:['/favicon.ico'],
    apple: ['/apple-touch-icon.png'],
    shortcut:['/apple-touch-icon.png']
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
