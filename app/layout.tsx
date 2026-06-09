import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Eventos Tech — USIL",
  description:
    "Conferencias, talleres y charlas de Ingeniería de Sistemas, Software, Ciberseguridad e IA en la Universidad San Ignacio de Loyola.",
  openGraph: {
    title: "Eventos Tech — USIL",
    description: "Próximos eventos tech organizados por y para la comunidad USIL.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
