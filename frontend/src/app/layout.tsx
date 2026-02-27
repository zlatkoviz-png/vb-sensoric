import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VB Sensoric | Индустриални сензори и визуални системи",
    template: "%s | VB Sensoric",
  },
  description:
    "Дистрибутор на индустриални сензори и визуални системи за автоматизация. SICK, Datasensing, BD Sensors, Hikrobot, Mech-Mind, SinceVision.",
  keywords: [
    "индустриални сензори",
    "визуални системи",
    "автоматизация",
    "SICK",
    "Datasensing",
    "machine vision",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0A0E1A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-scada-bg text-scada-text antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
