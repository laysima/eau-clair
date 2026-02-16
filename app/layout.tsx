import type { Metadata } from "next";
import { Encode_Sans_Condensed } from "next/font/google";
import "./globals.css";

const encodeSans = Encode_Sans_Condensed({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Eau Clair - Pure Water",
  description: "Pure water, simplified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={encodeSans.className}>
        {children}
      </body>
    </html>
  );
}