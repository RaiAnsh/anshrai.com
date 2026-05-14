import "./globals.css";
import { DM_Serif_Display, Inter } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Ansh Rai",
  description:
    "Ansh Rai — Database Developer & CS student at TMU. SQL, Python, data analytics, and client web projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className="font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
