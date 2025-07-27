import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Canale Telegram Punti Furbi - Offerte Voli Esclusive in Tempo Reale",
  description:
    "Unisciti al canale Telegram ufficiale di Punti Furbi! Ricevi notifiche istantanee su tariffe errore e offerte esclusive per risparmiare fino al 90% sui voli. Gratuito per sempre.",
  keywords: [
    "telegram punti furbi",
    "offerte voli telegram",
    "tariffe errore telegram",
    "notifiche voli economici",
    "canale telegram viaggi",
    "offerte esclusive voli",
    "risparmio voli telegram",
    "deal voli italia",
    "voli low cost telegram",
    "punti furbi telegram ufficiale"
  ].join(", "),
  authors: [{ name: "Punti Furbi" }],
  creator: "Punti Furbi",
  publisher: "Punti Furbi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://puntifurbi.com"),
  alternates: {
    canonical: "https://puntifurbi.com/telegram",
  },
  openGraph: {
    title: "Canale Telegram Punti Furbi - Offerte Voli Esclusive",
    description:
      "Ricevi notifiche istantanee su tariffe errore e offerte esclusive per risparmiare fino al 90% sui voli. Unisciti a 50.000+ viaggiatori smart!",
    url: "https://puntifurbi.com/telegram",
    siteName: "Punti Furbi",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-telegram.jpg",
        width: 1200,
        height: 630,
        alt: "Canale Telegram Punti Furbi - Offerte Voli Esclusive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canale Telegram Punti Furbi - Offerte Voli Esclusive",
    description:
      "Ricevi notifiche istantanee su tariffe errore e offerte esclusive per risparmiare fino al 90% sui voli. Gratuito per sempre!",
    creator: "@puntifurbi",
    images: ["/og-telegram.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
}

export default function TelegramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}