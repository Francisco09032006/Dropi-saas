import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dropi SaaS — Multi-Agent Dropshipping",
  description:
    "SaaS multi-agente para operación de dropshipping: investigación, validación, tienda, contenido orgánico.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
