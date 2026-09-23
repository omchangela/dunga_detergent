import Link from "next/link";
import { Phone, Mail, MapPin, Heart } from "lucide-react";
import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/dealership", label: "Apply for Dealership" },
  { href: "/contact", label: "Contact Us" },
];

const productLinks = [
  "Detergent Powder",
  "Detergent Cake",
  "Liquid Detergent",
  "Fabric Conditioner",
  "Floor Cleaner",
  "Dishwash Liquid",
];

const supportLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Return Policy", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Staff / Admin Portal", href: "/admin/login" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logo.png"
                alt="Monagodu 501 Logo"
                className={styles.logoImg}
              />
            </Link>
            <p className={styles.tagline}>
              We are committed to provide high quality cleaning products for a
              better and healthier life.
            </p>
            <a
              href="https://wa.me/919441394047"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.07-1.106-.065-.25-.083-.573-.207-1.026-.402-1.802-.78-2.983-2.616-3.074-2.736-.09-.12-.727-.968-.727-1.847 0-.879.461-1.312.625-1.492.164-.18.358-.225.478-.225.12 0 .24.002.345.006.111.005.26-.042.406.31.15.361.512 1.246.557 1.337.045.09.076.195.015.315-.06.12-.09.195-.18.3-.09.105-.19.234-.271.315-.09.09-.184.188-.079.368.105.18.468.772 1.004 1.249.691.614 1.274.805 1.454.895.18.09.3.135.345.21.045.075.045.435-.099.84zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.309A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              <span>+91 94413 94047</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.list}>
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={styles.listLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Products</h4>
            <ul className={styles.list}>
              {productLinks.map((p) => (
                <li key={p}>
                  <Link href="/products" className={styles.listLink}>
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Support</h4>
            <ul className={styles.list}>
              {supportLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className={styles.listLink}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us / Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Follow Us</h4>
            <ul className={styles.contactList}>
              <li>
                <Phone size={15} className={styles.contactIcon} />
                <a href="tel:+919441394047">+91 94413 94047</a>
              </li>
              <li>
                <Mail size={15} className={styles.contactIcon} />
                <a href="mailto:Info@avdcare.com">Info@avdcare.com</a>
              </li>
            </ul>

            <div className={styles.socials}>
              <a href="#" aria-label="Facebook" className={styles.social}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className={styles.social}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className={styles.social}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#fff"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Monagodu 501. All Rights Reserved.</p>
          <p className={styles.bottomCredit}>
            Designed with <Heart size={14} color="#ef4444" fill="#ef4444" /> for a cleaner tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
}
