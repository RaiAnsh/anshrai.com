import "./globals.css";

export const metadata = {
  title: "Ansh Rai",
  description: "Personal website and projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Ansh Rai</a>
            <div>
              <a href="/projects">Projects</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </div>
          </nav>
        </header>

        {children}

        <footer>
          <p>© {new Date().getFullYear()} Ansh Rai</p>
        </footer>
      </body>
    </html>
  );
}