"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Upload,
  CheckCircle2,
  TrendingUp,
  Truck,
  ShieldCheck,
  BadgePercent,
  Phone,
  FileCheck,
} from "lucide-react";
import styles from "./page.module.css";

const states = [
  "Andhra Pradesh",
  "Telangana",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
  "Kerala",
  "Gujarat",
  "Odisha",
  "Madhya Pradesh",
  "Uttar Pradesh",
  "Rajasthan",
  "West Bengal",
  "Delhi NCR",
  "Punjab",
  "Haryana",
  "Bihar",
  "Chhattisgarh",
  "Jharkhand",
  "Assam",
];

const benefits = [
  {
    icon: <BadgePercent size={24} color="#16a34a" />,
    title: "Attractive Profit Margins",
    desc: "Industry-leading distributor margins up to 35% with quarterly performance rebates.",
    bg: "#f0fdf4",
    border: "#dcfce7",
  },
  {
    icon: <Truck size={24} color="#2563eb" />,
    title: "Direct Factory Logistics",
    desc: "Swift dispatch directly from our Krishna District plant with zero transit breakage warranty.",
    bg: "#eff6ff",
    border: "#dbeafe",
  },
  {
    icon: <ShieldCheck size={24} color="#7c3aed" />,
    title: "Exclusive Territory Rights",
    desc: "Protected district or pin-code dealership rights ensuring long-term business security.",
    bg: "#f5f3ff",
    border: "#ede9fe",
  },
  {
    icon: <TrendingUp size={24} color="#ca8a04" />,
    title: "Marketing & POS Support",
    desc: "Free dealer display racks, promotional retail banners, and localized digital demand generation.",
    bg: "#fefce8",
    border: "#fef08a",
  },
];

const docs = [
  { id: "pan", label: "Company / Proprietor PAN", hint: "PDF, JPG, PNG — Max 5MB" },
  { id: "gst", label: "GST Registration Certificate", hint: "PDF, JPG, PNG — Max 5MB" },
  { id: "aadhaar", label: "Aadhaar Card (Applicant)", hint: "PDF, JPG, PNG — Max 5MB" },
  { id: "cheque", label: "Cancelled Bank Cheque", hint: "PDF, JPG, PNG — Max 5MB" },
];

export default function DealershipPage() {
  const [uploaded, setUploaded] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleUpload = (id: string, file: File | null) => {
    if (file) setUploaded((prev) => ({ ...prev, [id]: file.name }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className={styles.pageWrap}>
        <section className="page-hero">
          <div className="container">
            <h1 className="page-hero-title">Dealership Application</h1>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className={styles.successCard}>
              <div className={styles.successIcon}>
                <CheckCircle2 size={54} color="#16a34a" />
              </div>
              <h2 className={styles.successTitle}>Application Submitted Successfully!</h2>
              <p className={styles.successDesc}>
                Thank you for applying to become an authorized Monagodu 501 distribution partner. Our B2B onboarding team will review your business credentials and connect with you within 24–48 hours.
              </p>
              <div className={styles.successActions}>
                <Link href="/" className="btn btn-primary">
                  <span>Return to Homepage</span>
                </Link>
                <a
                  href="https://wa.me/919441394047?text=Hello%20Monagodu%20501,%20I%20have%20submitted%20my%20dealership%20application"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Phone size={16} />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.pageWrap}>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">B2B Partner Portal</span>
          <h1 className="page-hero-title">
            Partner With India’s <br />
            <span className="gradient-text">Fastest-Growing FMCG Network</span>
          </h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Apply for Dealership</span>
          </div>
        </div>
      </section>

      {/* ── Benefits Strip ── */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <div className={styles.benefitsGrid}>
            {benefits.map((b, i) => (
              <div
                key={i}
                className={styles.benefitCard}
                style={{ backgroundColor: b.bg, borderColor: b.border }}
              >
                <div className={styles.benefitIconBox}>{b.icon}</div>
                <h3 className={styles.benefitTitle}>{b.title}</h3>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Structured Application Form ── */}
      <section className={`section ${styles.formSectionArea}`}>
        <div className="container">
          <div className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <span className="section-badge">Authorized Distribution</span>
              <h2 className={styles.formMainHeading}>
                Dealership &amp; Stockist Application Form
              </h2>
              <p className={styles.formSubText}>
                Please provide your firm’s operational and infrastructure details below. Fields marked with an asterisk (*) are mandatory.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* 01 Contact Person */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepBadge}>01</span>
                  <h3>Contact &amp; Applicant Information</h3>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Applicant Full Name *</label>
                    <input type="text" placeholder="e.g. Ramesh Kumar" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Primary WhatsApp Contact *</label>
                    <input type="tel" placeholder="+91 98765 43210" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Alternate Mobile Number</label>
                    <input type="tel" placeholder="+91 91234 56789" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Official Email Address *</label>
                    <input type="email" placeholder="ramesh@enterprises.com" required />
                  </div>
                </div>
              </div>

              {/* 02 Firm & Legal Credentials */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepBadge}>02</span>
                  <h3>Business &amp; Statutory Credentials</h3>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Registered Entity / Firm Name *</label>
                    <input type="text" placeholder="e.g. Sri Balaji Agencies" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>GSTIN Number *</label>
                    <input type="text" placeholder="37AAAAA0000A1Z5" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Permanent Account Number (PAN) *</label>
                    <input type="text" placeholder="ABCDE1234F" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Aadhaar Number (Proprietor / Partner) *</label>
                    <input type="text" placeholder="1234 5678 9012" required />
                  </div>
                </div>
              </div>

              {/* 03 Territory & Location */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepBadge}>03</span>
                  <h3>Territory &amp; Operational Location</h3>
                </div>
                <div className={styles.formGrid}>
                  <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                    <label>Warehouse / Office Address *</label>
                    <textarea placeholder="Door No, Street Name, Industrial Area..." rows={3} required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>State *</label>
                    <select required defaultValue="">
                      <option value="" disabled>Select State</option>
                      {states.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>District *</label>
                    <input type="text" placeholder="e.g. Krishna District" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>City / Town *</label>
                    <input type="text" placeholder="e.g. Vijayawada" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Pincode *</label>
                    <input type="text" placeholder="520001" required />
                  </div>
                </div>
              </div>

              {/* 04 Commercial Experience & Capacity */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepBadge}>04</span>
                  <h3>Experience &amp; Commercial Capacity</h3>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                    <label>Years in FMCG / Distribution Business</label>
                    <input type="number" placeholder="e.g. 8" min="0" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Dealership Category</label>
                    <select defaultValue="Super Stockist">
                      <option>Exclusive Super Stockist</option>
                      <option>District Wholesale Distributor</option>
                      <option>Semi-Wholesaler / Key Retailer</option>
                      <option>Institutional / Bulk Supplier</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Planned Initial Investment</label>
                    <select defaultValue="₹5L – ₹10L">
                      <option>₹2L – ₹5L</option>
                      <option>₹5L – ₹10L</option>
                      <option>₹10L – ₹25L</option>
                      <option>₹25L – ₹50L</option>
                      <option>Above ₹50L</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Logistics &amp; Storage Assets</label>
                    <div className={styles.checkboxGroup}>
                      {["Own Godown", "Dedicated Delivery Vehicles", "Existing Sales Team", "Retail Store Network"].map((item) => (
                        <label key={item} className={styles.checkboxLabel}>
                          <input type="checkbox" defaultChecked />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 05 KYC Document Upload */}
              <div className={styles.formCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.stepBadge}>05</span>
                  <h3>KYC Document Upload (Optional for Preliminary Screening)</h3>
                </div>
                <div className={styles.docsGrid}>
                  {docs.map(({ id, label, hint }) => (
                    <div key={id} className={styles.uploadTile}>
                      <input
                        id={id}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className={styles.fileInput}
                        onChange={(e) => handleUpload(id, e.target.files?.[0] || null)}
                      />
                      <label
                        htmlFor={id}
                        className={`${styles.uploadLabel} ${
                          uploaded[id] ? styles.uploaded : ""
                        }`}
                      >
                        {uploaded[id] ? (
                          <FileCheck size={28} color="#16a34a" />
                        ) : (
                          <Upload size={24} color="#94a3b8" />
                        )}
                        <span className={styles.uploadTitle}>{label}</span>
                        <span className={styles.uploadHint}>
                          {uploaded[id] ? `Attached: ${uploaded[id]}` : hint}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className={styles.submitRow}>
                <button type="submit" className="btn btn-primary" style={{ padding: "0.95rem 2.5rem" }}>
                  <span>Submit Dealership Application</span>
                  <ChevronRight size={18} />
                </button>
                <p className={styles.privacyNotice}>
                  🔒 By submitting, you agree to our verification process. Your commercial data is kept strictly confidential.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
