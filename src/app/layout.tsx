import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "THE MANIFESTO // neporrex_",
  description: "A scroll-driven 3D manifesto. Built by neporrex_ with React Three Fiber, GSAP and a whole lot of black ink.",
  keywords: ["neporrex_", "webgl", "three.js", "neo-brutalism", "react three fiber", "gsap", "scroll"],
  authors: [{ name: "neporrex_" }],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23F2F0E9'/%3E%3Crect x='10' y='10' width='80' height='80' fill='%23000'/%3E%3Ctext x='50' y='68' font-family='monospace' font-size='50' fill='%23FF3131' text-anchor='middle' font-weight='bold'%3EN%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "THE MANIFESTO // neporrex_",
    description: "A scroll-driven 3D manifesto. Built by neporrex_ with React Three Fiber, GSAP and a whole lot of black ink.",
    url: "https://github.com/Neporrex/midnight-neporrex",
    siteName: "neporrex_",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE MANIFESTO // neporrex_",
    description: "A scroll-driven 3D manifesto.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
