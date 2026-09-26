import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/dasen/Header";
import { Footer } from "@/components/dasen/Footer";
import { clinic, openingHoursSpecification } from "@/data/clinic";

export const metadata: Metadata = {
  metadataBase: new URL(clinic.siteUrl),
  title: {
    default: `${clinic.shortName}.cz – Zubní ordinace Rožnov pod Radhoštěm`,
    template: `%s | ${clinic.shortName}.cz`,
  },
  description:
    "Zubní ordinace MDDr. Jitky Baslové v Rožnově pod Radhoštěm. Šetrná péče o chrup pro dospělé i děti, individuální přístup a moderní ošetření.",
  keywords: [
    "zubař Rožnov pod Radhoštěm",
    "zubní ordinace Rožnov",
    "MDDr. Jitka Baslová",
    "zubní lékař Rožnov pod Radhoštěm",
    "ZUBUM",
  ],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: clinic.siteUrl,
    siteName: `${clinic.shortName}.cz`,
    title: `${clinic.shortName}.cz – Zubní ordinace Rožnov pod Radhoštěm`,
    description:
      "Zubní ordinace MDDr. Jitky Baslové v Rožnově pod Radhoštěm. Šetrná péče o chrup pro dospělé i děti.",
    images: [{ url: "/images/favicon-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: `${clinic.shortName}.cz – Zubní ordinace Rožnov pod Radhoštěm`,
    description: "Zubní ordinace MDDr. Jitky Baslové v Rožnově pod Radhoštěm.",
  },
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/images/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/favicon-180.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  image: `${clinic.siteUrl}/images/favicon-512.png`,
  url: clinic.siteUrl,
  telephone: clinic.phoneHref,
  email: clinic.email,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.street,
    addressLocality: clinic.address.city,
    postalCode: clinic.address.zip,
    addressCountry: "CZ",
  },
  openingHoursSpecification: openingHoursSpecification.map((d) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: d.dayOfWeek,
    opens: d.opens,
    closes: d.closes,
  })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="cs" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:opsz,wght,SOFT@9..144,400..700,0..100&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
