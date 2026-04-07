"use client";
import { usePathname } from "next/navigation";
import Starfield from "./Starfield";
import MenuBar from "./MenuBar";
import Dock from "./Dock";

// Routes that get their own full-page layout (no OS chrome)
const PLAIN_ROUTES = ["/arweb", "/projects/broadview-preview"];

export default function OSChrome({ children }) {
  const pathname = usePathname();

  const isPlain = PLAIN_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));

  if (isPlain) {
    return <>{children}</>;
  }

  return (
    <>
      <Starfield />
      <MenuBar />
      <div className="desktop">{children}</div>
      <Dock />
    </>
  );
}
