import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "./ProviderWrapper";
import { AgeChecker } from "./AgeChecker";
import TopLoader from "./TopLoader";
import React from "react";

export const metadata: Metadata = {
  title: "Sweepstake",
  description: "Sweepstake - Online Gaming Platform",
  icons: {
    icon: "/assets/images/logo.png",
  },
};

const inter = Inter({
  subsets: ['latin'],
  fallback: ['sans-serif'],
  weight: ['300', '400', '500', '700'],
  adjustFontFallback: false
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* className="dark" */}
      <body className={`${inter.className} scroll-smooth dark`} cz-shortcut-listen="true">
        <ProviderWrapper>
          <React.Suspense fallback={<div />}>
            <TopLoader />
          </React.Suspense>
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
