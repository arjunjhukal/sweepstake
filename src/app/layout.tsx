import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "./ProviderWrapper";
import { AgeChecker } from "./AgeChecker";
import TopLoader from "./TopLoader";
import React from "react";
import { pageSEO } from "@/serverApi/game";

const metadata: Metadata = {
  title: "Sweepstake",
  description: "Sweepstake - Online Gaming Platform",
  icons: {
    icon: "/assets/images/logo.png",
  },
};
export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await pageSEO();
    const seoData = response;

    console.log(response);
    return {
      title: seoData?.data?.site_name || metadata.title,
      description: seoData?.data?.description || metadata.description,
      openGraph: {
        title: seoData?.data?.site_name || seoData?.data?.site_name || metadata.title,
        description: seoData?.data?.description || seoData?.data?.description || metadata.description,
        images: seoData?.data?.logo ? [seoData.logo] : ["/assets/images/logo.png"],
      },
      icons: seoData?.favicon || metadata.icons,
    };
  } catch (error) {
    console.error("SEO metadata fetch failed:", error);
    return metadata;
  }
}
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
      <body className={`${inter.className} scroll-smooth`} cz-shortcut-listen="true">
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
