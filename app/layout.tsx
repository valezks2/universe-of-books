import type { Metadata } from "next";
import { Nunito_Sans, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
  
const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Universe of Books",
  description: "A chatbot website where you can search for a new book to read",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${poppins.variable} antialiased`}>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Header />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}