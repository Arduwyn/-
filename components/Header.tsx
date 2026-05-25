"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./BrandMark";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/architecture", label: "Architecture" },
  { href: "/engineering", label: "Engineering" },
  { href: "/automation", label: "Automation" },
  { href: "/managed-services", label: "Managed Services" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav" aria-label="Primary">
          <Link href="/" className="brand" aria-label="Arduwyn home" onClick={() => setOpen(false)}>
            <BrandMark />
            <span className="brand-text">
              <span className="brand-name">ARDUWYN</span>
              <span className="brand-sub">Architecture &amp; Zero Trust</span>
            </span>
          </Link>

          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <div className={`nav-links${open ? " open" : ""}`} id="nav-links">
            {NAV_LINKS.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/"
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={active ? "active" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              className="btn btn-primary"
              href="/#contact"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
