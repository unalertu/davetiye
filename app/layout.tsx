import type { Metadata, Viewport } from "next";
import { Alex_Brush, Cormorant_Garamond, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import { COUPLE } from "@/lib/invitation";

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = `${COUPLE.bride} & ${COUPLE.groom} | Nişan Davetiyesi`;
const description = `${COUPLE.bride} & ${COUPLE.groom}'ın nişan davetiyesi. Bu özel günümüzde sizleri aramızda görmekten mutluluk duyarız.`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description: "Bu özel günümüzde sizleri aramızda görmekten mutluluk duyarız.",
    siteName: `${COUPLE.bride} & ${COUPLE.groom}`,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "Bu özel günümüzde sizleri aramızda görmekten mutluluk duyarız.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${baskerville.variable} ${alexBrush.variable} ${cormorant.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
