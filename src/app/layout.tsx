import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import VitalsClient from "./vitals-client";
import { Inter, Kaushan_Script, Cinzel_Decorative, Bebas_Neue } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const kaushan = Kaushan_Script({ weight: "400", subsets: ["latin"], variable: "--font-kaushan" });
const cinzel = Cinzel_Decorative({ weight: "400", subsets: ["latin"], variable: "--font-cinzel" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "SparkCreatives Inc.",
  description: "Turning excess to empowerment."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${kaushan.variable} ${cinzel.variable} ${bebas.variable}`}>
      <body>
        <Header />
        <div className="pt-16">{children}</div>
        <VitalsClient />
      </body>
    </html>
  );
}
