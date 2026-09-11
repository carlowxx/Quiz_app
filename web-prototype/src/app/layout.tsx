import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import "./globals.css";
import { RegisterSW } from "@/components/RegisterSW";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nurse GO",
  description:
    "Trilha gamificada de fisiologia e anatomia — sistema cardiovascular e respiratório, com roleta, Show do Milhão e casos de emergência.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nurse GO",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A2540",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${publicSans.variable}`}>
      <body>
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
