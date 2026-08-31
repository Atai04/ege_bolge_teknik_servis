import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header, Footer } from "../components/SiteChrome";
import { COMPANY, AREAS } from "../lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const serializeJsonLd = (value: unknown) =>
  JSON.stringify(value)
    .split(String.fromCharCode(60))
    .join(String.fromCharCode(92) + "u003c");

export const metadata: Metadata = {
  metadataBase: new URL("https://www.egebolgeteknikservis.com"),
  title: "Ege Bölge Teknik Servis | İzmir Beyaz Eşya ve Teknik Servis",
  description: "İzmir'de beyaz eşya, klima, kombi, TV, ısı pompası ve VRF için bağımsız özel teknik servis.",
  alternates: { canonical: "/" },
  openGraph: { title: "Ege Bölge Teknik Servis | İzmir Beyaz Eşya ve Teknik Servis", description: "İzmir'de bağımsız özel teknik servis hizmeti.", url: "/", locale: "tr_TR", type: "website", images: [{url:"/og.png",width:1200,height:630,alt:"Ege Bölge Teknik Servis"}] },
  twitter:{card:"summary_large_image",title:"Ege Bölge Teknik Servis | İzmir Beyaz Eşya ve Teknik Servis",description:"İzmir'de bağımsız özel teknik servis hizmeti.",images:["/og.png"]},
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico?v=ege-bolge-20260828", type: "image/x-icon", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=ege-bolge-20260828", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png?v=ege-bolge-20260828", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico?v=ege-bolge-20260828",
    apple: "/apple-touch-icon.png?v=ege-bolge-20260828",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} antialiased`}><Header />
        <main>{children}</main><Footer /><Script src="https://www.googletagmanager.com/gtag/js?id=AW-18410577740" strategy="afterInteractive" /><Script id="google-ads-tag" strategy="afterInteractive">{"window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18410577740');"}</Script><script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd({"@context":"https://schema.org","@type":"LocalBusiness",name:COMPANY.name,url:COMPANY.website,telephone:COMPANY.phoneDisplay,email:COMPANY.email,address:{"@type":"PostalAddress",streetAddress:"Fırat Mah. 289/59 Sk. No:7/A",postalCode:"35380",addressLocality:"Buca",addressRegion:"İzmir",addressCountry:"TR"},openingHours:"Mo-Su 08:00-19:00",areaServed:AREAS})}} />
      </body>
    </html>
  );
}
