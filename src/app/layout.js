import "./globals.css";
import OSChrome from "../components/OSChrome";

export const metadata = {
  title: "Ansh Rai",
  description:
    "Ansh Rai — Database Developer & CS student at TMU. SQL, Python, data analytics, and client web projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body>
        <OSChrome>{children}</OSChrome>
      </body>
    </html>
  );
}
