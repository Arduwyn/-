import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand" aria-label="Arduwyn home">
              <BrandMark />
              <span className="brand-text">
                <span className="brand-name">ARDUWYN</span>
                <span className="brand-sub">Architecture &amp; Zero Trust</span>
              </span>
            </Link>
            <p className="foot-blurb">
              Principal-level Zero Trust engineering for healthcare, financial services,
              and cloud enterprises.
            </p>
          </div>

          <div>
            <h4>Pages</h4>
            <Link href="/">Home</Link>
            <Link href="/architecture">Architecture</Link>
            <Link href="/engineering">Engineering</Link>
            <Link href="/automation">Automation</Link>
            <Link href="/managed-services">Managed Services</Link>
            <Link href="/industries">Industries</Link>
          </div>

          <div>
            <h4>Firm</h4>
            <Link href="/#about">About</Link>
            <Link href="/#portfolio">Case Studies</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/#contact">Contact</Link>
          </div>

          <div>
            <h4>Contact</h4>
            <a href="mailto:hello@arduwyn.com">hello@arduwyn.com</a>
            <p>Remote · Nationwide</p>
            <p>On-site available</p>
            <p>Response within 1 business day</p>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Arduwyn Security Engineering · All rights reserved</span>
          <span className="status">
            <span className="dot"></span> Currently accepting new engagements
          </span>
          <a href="/admin" className="foot-admin">Admin</a>
        </div>
      </div>
    </footer>
  );
}
