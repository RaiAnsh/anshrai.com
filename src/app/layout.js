import "./globals.css";
import Starfield from "../components/Starfield";

export const metadata = {
  title: "Ansh Rai",
  description:
      "Ansh Rai — Computer Science student focused on data analytics, SQL/Python, and dashboards. Projects, case studies, and client work.",};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body>
        <Starfield />

        <header>
          <nav>
              <a className="brand" href="/" aria-label="Home">
                <span className="logoWrap">
                <img className="logoImg" src="/logo.png" alt="AR logo" width="28" height="28" />
                </span>
                <span className="brandText">Ansh Rai</span>
              </a>  
            <div>
              <a href="/projects">Projects</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>
          </nav>
        </header>

        {/* IMPORTANT: children should appear ONLY ONCE */}
        {children}

        <footer>
          <p>© {new Date().getFullYear()} Ansh Rai</p>
        </footer>
      </body>
    </html>
  );
}