"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  MessageSquare,
  Building2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import styles from "./page.module.css";

const inquiryTypes = [
  "Distributorship / Dealership",
  "Institutional & Bulk Orders",
  "Supermarket / Retail Stockist",
  "OEM / White Label Inquiry",
  "Customer Support & Feedback",
];

const infoCards = [
  {
    icon: <Phone size={22} />,
    title: "Direct Sales & Hotline",
    subtitle: "Immediate B2B inquiry assistance",
    lines: ["+91 94413 94047", "+91 866 284 2501"],
    bgColor: "#f0fdf4",
    borderColor: "#bbf7d0",
    iconColor: "#16a34a",
    actionLabel: "Call Directly",
    href: "tel:+919441394047",
  },
  {
    icon: <MessageSquare size={22} />,
    title: "WhatsApp B2B Desk",
    subtitle: "Instant product catalog & pricing",
    lines: ["+91 94413 94047", "Available 8:00 AM – 9:00 PM"],
    bgColor: "#ecfdf5",
    borderColor: "#a7f3d0",
    iconColor: "#059669",
    actionLabel: "Chat on WhatsApp",
    href: "https://wa.me/919441394047?text=Hello%20Monagodu%20501%20team,%20I%20would%20like%20to%20inquire%20about%20your%20products.",
  },
  {
    icon: <Mail size={22} />,
    title: "Official Communications",
    subtitle: "Formal tenders & purchase orders",
    lines: ["info@avdcare.com", "sales@monagodu501.com"],
    bgColor: "#eff6ff",
    borderColor: "#bfdbfe",
    iconColor: "#2563eb",
    actionLabel: "Send Email",
    href: "mailto:info@avdcare.com",
  },
  {
    icon: <Building2 size={22} />,
    title: "Central Manufacturing Unit",
    subtitle: "Certified production & warehouse",
    lines: ["Punadipadu Padu, Krishna Dist.", "Andhra Pradesh – 521 002"],
    bgColor: "#fefce8",
    borderColor: "#fef08a",
    iconColor: "#ca8a04",
    actionLabel: "Get Directions",
    href: "https://maps.google.com/?q=Punadipadu+Krishna+District+Andhra+Pradesh",
  },
];

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState(inquiryTypes[0]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referenceToken, setReferenceToken] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          inquiryType: selectedType,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReferenceToken(data.inquiry?.id || `MNG-${Math.floor(100000 + Math.random() * 900000)}`);
        setSubmitted(true);
      } else {
        setSubmitError(data.message || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      setSubmitError("Network connection error. Please try again or reach out on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactWrapper}>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-badge">
            <Sparkles size={14} color="#16a34a" /> Direct Communication & Support
          </div>
          <h1 className="page-hero-title">
            Let&apos;s Connect & <span className="gradient-text">Grow Together</span>
          </h1>
          <p className="page-hero-subtitle">
            Whether you want to become an authorized distributor, place bulk institutional orders, or discover more about Monagodu 501 cleaning formulations, our regional team is ready to assist.
          </p>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Contact Us</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section" style={{ paddingTop: "2.5rem" }}>
        <div className="container">
          {/* Quick Connect Channels */}
          <div className={styles.infoGrid}>
            {infoCards.map((card, idx) => (
              <div
                key={idx}
                className={styles.infoCard}
                style={{
                  background: card.bgColor,
                  borderColor: card.borderColor,
                }}
              >
                <div
                  className={styles.iconCircle}
                  style={{
                    background: "#ffffff",
                    color: card.iconColor,
                    boxShadow: `0 4px 12px ${card.iconColor}20`,
                  }}
                >
                  {card.icon}
                </div>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <span className={styles.cardSubtitle}>{card.subtitle}</span>
                </div>
                <div className={styles.cardLines}>
                  {card.lines.map((line, i) => (
                    <span key={i} className={styles.lineText}>
                      {line}
                    </span>
                  ))}
                </div>
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={styles.cardAction}
                  style={{ color: card.iconColor }}
                >
                  {card.actionLabel} <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>

          {/* Form & Facility Info Grid */}
          <div className={styles.layoutGrid}>
            {/* Left Column: Office & Plant Overview */}
            <div className={styles.leftCol}>
              <div className={styles.sideCard}>
                <div className="section-badge" style={{ marginBottom: "0.75rem" }}>
                  <Building2 size={13} color="#16a34a" /> Plant & Headquarters
                </div>
                <h2 className={styles.sideTitle}>
                  Direct Access to South India’s Premier FMCG Hub
                </h2>
                <p className={styles.sideDesc}>
                  Our Krishna District facility powers high-speed automated bottling lines and an advanced chemical testing laboratory adhering to national ISO standards.
                </p>

                <div className={styles.facilityHighlights}>
                  <div className={styles.facilityItem}>
                    <div className={styles.facilityDot} />
                    <div>
                      <strong>Factory Operations:</strong> Monday – Saturday (8:00 AM – 7:00 PM)
                    </div>
                  </div>
                  <div className={styles.facilityItem}>
                    <div className={styles.facilityDot} />
                    <div>
                      <strong>Commercial Dispatch:</strong> Round-the-clock logistics dispatch for tier-1 distributors
                    </div>
                  </div>
                  <div className={styles.facilityItem}>
                    <div className={styles.facilityDot} />
                    <div>
                      <strong>Sample Kits:</strong> Available for certified retail chains and institutional contractors
                    </div>
                  </div>
                </div>

                {/* Plant Map Graphic / Preview Box */}
                <div className={styles.mapEmbedCard}>
                  <div className={styles.mapHeader}>
                    <MapPin size={18} color="#16a34a" />
                    <div>
                      <strong>Punadipadu Industrial Zone</strong>
                      <p>Vijayawada Region, Andhra Pradesh 521002</p>
                    </div>
                  </div>
                  <div className={styles.mapMock}>
                    <iframe
                      title="Monagodu 501 Location"
                      src="https://maps.google.com/maps?q=Punadipadu,Andhra+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="220"
                      style={{ border: 0, borderRadius: "12px" }}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className={styles.slaBadge}>
                  <ShieldCheck size={20} color="#16a34a" />
                  <div>
                    <strong>Guaranteed Commercial Turnaround</strong>
                    <p>All dealer and institutional inquiries are answered within 4 business hours.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-End Contact Form */}
            <div className={styles.rightCol}>
              <div className={styles.formContainer}>
                {submitted ? (
                  <div className={styles.successBox}>
                    <div className={styles.successIcon}>
                      <CheckCircle2 size={56} color="#16a34a" />
                    </div>
                    <h3 className={styles.successTitle}>Inquiry Successfully Received!</h3>
                    <p className={styles.successDesc}>
                      Thank you, <strong>{formData.name || "partner"}</strong>. Your query regarding <em>&quot;{selectedType}&quot;</em> has been logged in our enterprise CRM. A regional representative will contact you at <strong>{formData.phone || "+91"}</strong> shortly.
                    </p>
                    <div className={styles.ticketId}>
                      Reference Token: <strong>#{referenceToken.toUpperCase()}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", phone: "", email: "", city: "", message: "" });
                      }}
                      className="btn btn-primary"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formHead}>
                      <span className="section-badge">Send a Message</span>
                      <h3 className={styles.formTitle}>Enterprise & Customer Inquiry Form</h3>
                      <p className={styles.formSub}>
                        Fill in your details below and our commercial division will connect directly.
                      </p>
                    </div>

                    {/* Inquiry Type Chips */}
                    <div className={styles.typeSelector}>
                      <label className="form-label" style={{ marginBottom: "0.5rem", display: "block" }}>
                        Nature of Inquiry *
                      </label>
                      <div className={styles.chipRow}>
                        {inquiryTypes.map((type) => (
                          <button
                            type="button"
                            key={type}
                            className={`${styles.typeChip} ${selectedType === type ? styles.typeChipActive : ""}`}
                            onClick={() => setSelectedType(type)}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className={styles.inputGrid}>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Ramesh Kumar"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Contact Number *</label>
                        <input
                          type="tel"
                          className="form-input"
                          placeholder="+91 98765 43210"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Official Email ID</label>
                        <input
                          type="email"
                          className="form-input"
                          placeholder="name@business.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">City / State *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="e.g. Vijayawada, Andhra Pradesh"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Detailed Inquiry / Requirement *</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Please state expected quantities, product lines of interest, or target retail distribution territory..."
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    {submitError && (
                      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "0.75rem 1rem", borderRadius: "10px", fontSize: "0.85rem", marginBottom: "1rem" }}>
                        ⚠️ {submitError}
                      </div>
                    )}

                    <div className={styles.formFooter}>
                      <div className={styles.privacyNote}>
                        🔒 Your commercial credentials and contact details remain strictly confidential under AVD Group privacy policies.
                      </div>
                      <button type="submit" disabled={isSubmitting} className={`btn btn-primary ${styles.submitBtn}`}>
                        {isSubmitting ? "Submitting Inquiry..." : (
                          <>
                            Transmit Inquiry <Send size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
