import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Lam Thanh My Movie Collection",
  description: "Những bộ phim Lâm Thanh Mỹ đóng.",
  metadataBase: new URL("https://lamthanhmy.com"),
  openGraph: {
    title: "Lam Thanh My Movies Collection",
    description: "Những bộ phim Lâm Thanh Mỹ góp .",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center justify-between p-6 sm:p-8 border-b border-black/10 dark:border-white/10">
            <Link href="/" className="font-semibold">Lam Thanh My Movies Collection</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link className="opacity-90 hover:opacity-100" href="/movies">Movies</Link>
              <Link className="opacity-90 hover:opacity-100" href="/about">About</Link>
            </div>
          </nav>
          {children}
          <footer className="p-6 sm:p-8 text-sm opacity-70 border-t border-black/10 dark:border-white/10 mt-10">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Lam Thanh My Movies Collection
          </footer>
        </div>
      </body>
    </html>
  );
}
