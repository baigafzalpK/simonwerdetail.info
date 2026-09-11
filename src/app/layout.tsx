import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simonwerdetail.info"),
  title: {
    default: "SIM Utility Hub - 200+ Telecom Guides, USSD Codes & Utilities",
    template: "%s | SIM Utility Hub",
  },
  description: "Comprehensive telecom portal with 200+ verified guides, USSD dial codes, SIM owner verification facts, PTA DIRBS registration, and developer utilities.",
  keywords: [
    "sim owner details",
    "pakistan telecom codes",
    "jazz ussd codes",
    "zong balance check",
    "telenor packages",
    "ufone super card",
    "pta dirbs verification",
    "esim activation pakistan"
  ],
  authors: [{ name: "SIM Utility Hub" }],
  creator: "SIM Utility Hub",
  publisher: "SIM Utility Hub",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://simonwerdetail.info",
    siteName: "SIM Utility Hub",
    title: "SIM Utility Hub - 200+ Telecom Guides & Utilities",
    description: "Explore 200+ verified guides, USSD dial codes, SIM verification rules, and telecom tools in Pakistan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIM Utility Hub - 200+ Telecom Guides & Utilities",
    description: "Explore 200+ verified guides, USSD dial codes, SIM verification rules, and telecom tools in Pakistan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-24 pb-12">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
