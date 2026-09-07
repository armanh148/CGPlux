import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { getSiteSettings, urlFor } from "@/lib/data";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const faviconUrl = settings?.favicon ? urlFor(settings.favicon).width(32).height(32).url() : undefined;
  
  return {
    title: settings?.title || "CGplux - Full-Cycle Web, Mobile & CRM Development Studio",
    description: "Full-cycle digital engineering studio. Bespoke web development, enterprise CRM platforms, mobile applications, and high-conversion UI/UX design.",
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings().catch(() => null);
  const logoUrl = settings?.logo ? urlFor(settings.logo).url() : undefined;

  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#000000]" suppressHydrationWarning>
        <SmoothScroll>
          <div className="noise-overlay" aria-hidden="true" />
          <div className="mx-auto w-full min-h-screen flex flex-col relative bg-brand-dark">
            <div className="bg-grid absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />
            <Header logoUrl={logoUrl} />
            <main id="top" className="relative z-10 flex-1">
              {children}
            </main>
            <Footer
              instagramUrl={settings?.instagramUrl}
              behanceUrl={settings?.behanceUrl}
              linkedinUrl={settings?.linkedinUrl}
            />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
