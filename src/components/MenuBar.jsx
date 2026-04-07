"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const sectionLabels = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/experience": "Experience",
  "/skills": "Skills",
  "/contact": "Contact",
};

export default function MenuBar() {
  const pathname = usePathname();
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-CA", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const section = sectionLabels[pathname] ?? "";

  return (
    <div className="menuBar">
      {/* Left side */}
      <div className="menuLeft">
        <Link href="/" className="menuAppName" aria-label="Home">
          <img src="/logo.png" alt="AR" width="14" height="14" className="menuLogo" />
          <span>Ansh Rai</span>
        </Link>
        <span className="menuSep" />
        <span className="menuItem">File</span>
        <span className="menuItem">Edit</span>
        <span className="menuItem">View</span>
        <span className="menuItem">Help</span>
      </div>

      {/* Center — current section */}
      {section && (
        <div className="menuCenter">
          <span className="menuSection">{section}</span>
        </div>
      )}

      {/* Right side */}
      <div className="menuRight">
        <span className="menuMeta">Toronto, ON</span>
        <span className="menuSep" />
        <span className="menuMeta menuTime">{time}</span>
      </div>
    </div>
  );
}
