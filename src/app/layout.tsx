import type { Metadata } from "next";
import { Libre_Baskerville, Nunito_Sans } from "next/font/google";
import { TopBar } from "@/components/layout/top-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FoundationFab } from "@/components/shared/foundation-fab";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const nunitoSans = Nunito_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Manosuraksha - Nurturing Minds",
    template: "%s | Manosuraksha",
  },
  description:
    "Manosuraksha is a leading mental health clinic in Jayanagar, Bengaluru, offering psychiatry, clinical psychology, psychotherapy, child mental health, addiction treatment, and brain stimulation therapy. NIMHANS-trained team.",
  keywords: [
    "mental health clinic Bengaluru",
    "psychiatrist Jayanagar",
    "NIMHANS",
    "clinical psychologist",
    "psychotherapy",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: "Manosuraksha - Nurturing Minds",
    description:
      "Leading mental health clinic in Jayanagar, Bengaluru. Psychiatry, clinical psychology, psychotherapy, child mental health, addiction treatment, and brain stimulation therapy by a NIMHANS-trained team.",
    siteName: "Manosuraksha",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manosuraksha - Nurturing Minds",
    description:
      "Leading mental health clinic in Jayanagar, Bengaluru. NIMHANS-trained team offering comprehensive mental health care.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TopBar />
        <Navbar />
        <main className="min-h-screen flex-1" style={{ paddingTop: 108 }}>{children}</main>
        <Footer />
        <FoundationFab />
      </body>
    </html>
  );
}
