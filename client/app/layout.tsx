import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeRegistry } from "./layout/theme-registry";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ibrahim W. Batambuze",
  description: "I am a Strategic Communications Advisor, Digital Innovator, and Project Manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry options={{ key: "mui" }}>
          <Providers>
            <Navbar />
            <div style={{ paddingTop: "64px" }}>{children}</div>
            <Footer />
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
