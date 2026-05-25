import type { Metadata, Viewport } from "next";
import { Sora, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Arduwyn — Modern Cybersecurity Architecture & Zero Trust Engineering",
  description:
    "Principal-level Zero Trust engineering. Architecture, recovery, and hardening for Zscaler, SASE, and identity-centric cloud at enterprise scale.",
};

export const viewport: Viewport = {
  themeColor: "#070a12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${instrumentSerif.variable} js`}
    >
      <body>
        <Header />
        <main id="top">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
