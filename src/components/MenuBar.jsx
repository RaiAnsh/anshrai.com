"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const sectionLabels = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/experience": "Experience",
  "/skills": "Skills",
  "/contact": "Contact",
};

const MENUS = {
  File: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/experience" },
    { label: "Skills", href: "/skills" },
    { label: "Contact", href: "/contact" },
    null,
    { label: "Close Window", href: "/" },
  ],
  Edit: [
    { label: "Select All", action: () => document.execCommand("selectAll") },
    { label: "Copy", action: () => document.execCommand("copy") },
    null,
    {
      label: "Find on Page",
      action: () => {
        const term = prompt("Find:");
        if (term) window.find(term);
      },
    },
  ],
  View: [
    {
      label: "Toggle Fullscreen",
      action: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      },
    },
    { label: "Zoom In", action: () => { document.body.style.zoom = String(parseFloat(document.body.style.zoom || "1") + 0.1); } },
    { label: "Zoom Out", action: () => { document.body.style.zoom = String(Math.max(0.5, parseFloat(document.body.style.zoom || "1") - 0.1)); } },
    { label: "Reset Zoom", action: () => { document.body.style.zoom = "1"; } },
  ],
  Help: [
    { label: "GitHub", href: "https://github.com/raiansh", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/raiansh", external: true },
    null,
    { label: "Email Me", href: "mailto:anshr792@gmail.com", external: true },
    { label: "arweb.co", href: "/arweb" },
  ],
};

export default function MenuBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [time, setTime] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const menuBarRef = useRef(null);

  // Live clock
  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-CA", {
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

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on route change
  useEffect(() => { setOpenMenu(null); }, [pathname]);

  function toggleMenu(name) {
    setOpenMenu((o) => (o === name ? null : name));
  }

  function runItem(item) {
    setOpenMenu(null);
    if (item.href) {
      if (item.external) {
        window.open(item.href, "_blank");
      } else {
        router.push(item.href);
      }
    } else if (item.action) {
      item.action();
    }
  }

  const section = sectionLabels[pathname] ?? "";

  return (
    <div className="menuBar" ref={menuBarRef}>
      {/* Left */}
      <div className="menuLeft">
        <Link href="/" className="menuAppName" aria-label="Home">
          <img src="/logo.png" alt="AR" width="14" height="14" className="menuLogo" />
          <span>Ansh Rai</span>
        </Link>
        <span className="menuSep" />

        {Object.entries(MENUS).map(([name, items]) => (
          <div key={name} className="menuItemWrap">
            <span
              className={`menuItem${openMenu === name ? " menuItemActive" : ""}`}
              onClick={() => toggleMenu(name)}
            >
              {name}
            </span>

            {openMenu === name && (
              <div className="menuDropdown">
                {items.map((item, i) =>
                  item === null ? (
                    <div key={i} className="menuDropSep" />
                  ) : (
                    <div
                      key={item.label}
                      className="menuDropItem"
                      onClick={() => runItem(item)}
                    >
                      {item.label}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Center */}
      {section && (
        <div className="menuCenter">
          <span className="menuSection">{section}</span>
        </div>
      )}

      {/* Right */}
      <div className="menuRight">
        <span className="menuMeta menuHideMobile">Toronto, ON</span>
        <span className="menuSep menuHideMobile" />
        <span className="menuMeta menuTime">{time}</span>
      </div>
    </div>
  );
}
