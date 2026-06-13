import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "MenuQuill — AI Menu Generator for Restaurants",
  description:
    "Generate professional restaurant menus with AI in 10 seconds. Perfect menu descriptions, smart pricing suggestions, ready-to-print PDF. No design skills needed.",
  keywords: [
    "AI menu generator",
    "restaurant menu maker",
    "AI menu creator",
    "menu description generator",
    "restaurant menu design",
    "AI menu writer",
  ],
  openGraph: {
    title: "MenuQuill — AI Menu Generator for Restaurants",
    description:
      "Create professional restaurant menus with AI. Perfect descriptions, smart pricing, beautiful templates.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
