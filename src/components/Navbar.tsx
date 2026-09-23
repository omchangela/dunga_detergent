"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/dealership", label: "Apply for Dealership" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Monagodu 501 Logo"
              className={styles.logoImg}
            />
          </Link>

          {/* Desktop Nav */}
          <ul className={styles.navLinks}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${pathname === href ? styles.active : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className={styles.actions}>
            <a
              href="/catalogue.pdf"
              download
              className={styles.catalogueBtn}
            >
              <Download size={14} />
              <span>Download Catalogue</span>
            </a>

            <button
              className={styles.themeToggleBtn}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle Light/Dark Theme"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            <a
              href="https://wa.me/919441394047"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navWhatsappBtn}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.07-1.106-.065-.25-.083-.573-.207-1.026-.402-1.802-.78-2.983-2.616-3.074-2.736-.09-.12-.727-.968-.727-1.847 0-.879.461-1.312.625-1.492.164-.18.358-.225.478-.225.12 0 .24.002.345.006.111.005.26-.042.406.31.15.361.512 1.246.557 1.337.045.09.076.195.015.315-.06.12-.09.195-.18.3-.09.105-.19.234-.271.315-.09.09-.184.188-.079.368.105.18.468.772 1.004 1.249.691.614 1.274.805 1.454.895.18.09.286.075.391-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.099.84zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.309A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              <span>+91 94413 94047</span>
            </a>

            <button
              className={styles.burgerBtn}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileOpen : ""}`}>
        <ul className={styles.mobileNavLinks}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.mobileNavLink} ${pathname === href ? styles.mobileActive : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.mobileActions}>
          <a
            href="/catalogue.pdf"
            download
            className={styles.mobileCatalogueBtn}
          >
            <Download size={16} /> Download Catalogue
          </a>
          <a
            href="https://wa.me/919441394047"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileWhatsappBtn}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.07-1.106-.065-.25-.083-.573-.207-1.026-.402-1.802-.78-2.983-2.616-3.074-2.736-.09-.12-.727-.968-.727-1.847 0-.879.461-1.312.625-1.492.164-.18.358-.225.478-.225.12 0 .24.002.345.006.111.005.26-.042.406.31.15.361.512 1.246.557 1.337.045.09.076.195.015.315-.06.12-.09.195-.18.3-.09.105-.19.234-.271.315-.09.09-.184.188-.079.368.105.18.468.772 1.004 1.249.691.614 1.274.805 1.454.895.18.09.286.075.391-.045.105-.12.45-.525.57-.705.12-.18.24-.15.405-.09.165.06 1.05.495 1.23.585.18.09.3.135.345.21.045.075.045.435-.099.84zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.309A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
            </svg>
            <span>WhatsApp Us (+91 94413 94047)</span>
          </a>
        </div>
      </div>
    </>
  );
}
