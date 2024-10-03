import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personality Quiz App",
  description: "Discover your personality type through a series of engaging questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
