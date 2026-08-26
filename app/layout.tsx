import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "../components/SiteChrome";
import { COMPANY, AREAS } from "../lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://egebolgeteknikservis.com"),
  title: "Ege Bölge Teknik Servis | İzmir Beyaz Eşya ve Teknik Servis",
  description: "İzmir'de beyaz eşya, klima, kombi, TV, ısı pompası ve VRF için bağımsız özel teknik servis.",
  alternates: { canonical: "/" },
  openGraph: { title: "Ege Bölge Teknik Servis | İzmir Beyaz Eşya ve Teknik Servis", description: "İzmir'de bağımsız özel teknik servis hizmeti.", url: "/", locale: "tr_TR", type: "website", images: [{url:"/og.png",width:1200,height:630,alt:"Ege Bölge Teknik Servis"}] },
  twitter:{card:"summary_large_image",title:"Ege Bölge Teknik Servis | İzmir Beyaz Eşya ve Teknik Servis",description:"İzmir'de bağımsız özel teknik servis hizmeti.",images:["/og.png"]},
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico?v=ege-bolge-20260826", type: "image/x-icon", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=ege-bolge-20260826", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png?v=ege-bolge-20260826", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico?v=ege-bolge-20260826",
    apple: "/apple-touch-icon.png?v=ege-bolge-20260826",
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
        <main>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness",name:COMPANY.name,url:COMPANY.website,telephone:COMPANY.phoneDisplay,email:COMPANY.email,address:{"@type":"PostalAddress",streetAddress:"Fırat Mah. 289/59 Sk. No:7/A",postalCode:"35380",addressLocality:"Buca",addressRegion:"İzmir",addressCountry:"TR"},openingHours:"Mo-Su 08:00-19:00",areaServed:AREAS})}} />
      </body>
    </html>
  );
}
