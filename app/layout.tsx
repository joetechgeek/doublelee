import type { Metadata } from "next";
import { CartProvider } from '../contexts/CartContext';
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Store",
  description: "E-commerce store with affiliate program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
