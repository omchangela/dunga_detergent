"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  Target,
  Eye,
  Award,
  Users,
  Factory,
  Package,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Leaf,
  FlaskConical,
} from "lucide-react";
import styles from "./page.module.css";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={styles.statNumber}>
      {count}
      {suffix}
    </div>
  );
}

const stats = [
  {
    icon: <Award size={24} color="#16a34a" />,
    value: 13,
    suffix: "+",
    label: "Years of Trust",
    sub: "Since 2011",
    bg: "#f0fdf4",
    border: "#dcfce7",
  },
  {
    icon: <Package size={24} color="#2563eb" />,
    value: 90,
    suffix: "+",
    label: "FMCG Products",
    sub: "Cleaning & Hygiene",
    bg: "#eff6ff",
    border: "#dbeafe",
  },
  {
    icon: <Users size={24} color="#7c3aed" />,
    value: 450,
    suffix: "+",
    label: "Authorized Dealers",
    sub: "Across Pan-India",
    bg: "#f5f3ff",
    border: "#ede9fe",
  },
  {
    icon: <Factory size={24} color="#ca8a04" />,
    value: 8000,
    suffix: "+",
    label: "Daily Shipments",
    sub: "Consistent Supply",
    bg: "#fefce8",
    border: "#fef08a",
  },
];

const steps = [
  {
    step: "01",
    title: "Eco-Grade Raw Materials",
    desc: "We ethically source surfactant concentrates and bio-enzymes strictly adhering to environmental and dermal safety benchmarks.",
    icon: <Leaf size={20} color="#16a34a" />,
  },
  {
    step: "02",
    title: "Analytical Laboratory QC",
    desc: "Every raw chemical batch is tested for pH stability, density, and microbiological purity before introduction to mixing vessels.",
    icon: <FlaskConical size={20} color="#16a34a" />,
  },
  {
    step: "03",
    title: "High-Shear Homogenization",
    desc: "Industrial-scale computerized compounding ensures uniform viscosity, optical clarity, and sustained grease-cutting power.",
    icon: <Sparkles size={20} color="#16a34a" />,
  },
  {
    step: "04",
    title: "Automated Sterile Bottling",
    desc: "High-speed zero-touch rotary filling lines seal bottles with tamper-proof flip closures, eliminating human contamination.",
    icon: <Factory size={20} color="#16a34a" />,
  },
  {
    step: "05",
    title: "Dispatch & National Logistics",
    desc: "Secondary protective corrugated pallet packaging ready for swift regional delivery across our certified dealer network.",
    icon: <ShieldCheck size={20} color="#16a34a" />,
  },
];

export default function AboutPage() {
  return (
    <div className={styles.pageWrap}>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Our Heritage &amp; Infrastructure</span>
          <h1 className="page-hero-title">
            Crafting Brighter Homes, <br />
            <span className="gradient-text">One Bottle at a Time</span>
          </h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>About Us</span>
          </div>
        </div>
      </section>

      {/* ── Legacy & Facility Story ── */}
      <section className={`section ${styles.legacySection}`}>
        <div className="container">
          <div className={styles.legacyGrid}>
            <div className={styles.legacyContent}>
              <span className="section-badge">Building Trust Since 2011</span>
              <h2 className={styles.sectionHeading}>
                Precision Chemical Science, <br />
                <span className={styles.greenText}>Uncompromising Hygiene</span>
              </h2>
              <p className={styles.legacyDesc}>
                Monagodu 501 was founded with an unyielding commitment — to deliver premium-tier cleaning and fabric care solutions that equal international brands while remaining accessible for every Indian household.
              </p>
              <p className={styles.legacyDesc}>
                Headquartered with state-of-the-art manufacturing infrastructure in Krishna District, Andhra Pradesh, our facility combines automated high-speed packaging lines with precision chemistry to remove tough grease, eliminate 99.9% of bacteria, and protect delicate skin.
              </p>

              <div className={styles.certPills}>
                <div className={styles.certPill}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>ISO 9001:2015 Quality Management</span>
                </div>
                <div className={styles.certPill}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>GMP Certified Sterile Bottling</span>
                </div>
                <div className={styles.certPill}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Govt. MSME Recognized Enterprise</span>
                </div>
                <div className={styles.certPill}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Make in India National Manufacturer</span>
                </div>
              </div>

              <div className={styles.ctaRow}>
                <Link href="/products" className="btn btn-primary">
                  <span>Explore Product Range</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/dealership" className="btn btn-secondary">
                  <span>Become a Distributor</span>
                </Link>
              </div>
            </div>

            <div className={styles.legacyVisualWrapper}>
              <div className={styles.facilityCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/about_facility.jpg"
                  alt="Modern Monagodu 501 Automated FMCG Manufacturing Facility"
                  className={styles.facilityImg}
                />
                <div className={styles.facilityOverlayBadge}>
                  <div className={styles.facilityBadgeIcon}>
                    <ShieldCheck size={24} color="#16a34a" />
                  </div>
                  <div>
                    <strong>100% Quality Assured</strong>
                    <span>Laboratory Grade Testing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Performance Stats ── */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div
                key={i}
                className={styles.statCard}
                style={{ backgroundColor: stat.bg, borderColor: stat.border }}
              >
                <div className={styles.statIconBox}>{stat.icon}</div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <h4 className={styles.statLabel}>{stat.label}</h4>
                <span className={styles.statSub}>{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5-Step Manufacturing Process ── */}
      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="section-badge">Quality Benchmark</span>
            <h2 className="section-title">Our 5-Step Precision Manufacturing</h2>
            <p className="section-subtitle">
              From raw surfactant extraction to final pallet dispatch, our processes guarantee clinical potency and dermatological safety.
            </p>
          </div>

          <div className={styles.processGrid}>
            {steps.map((item, index) => (
              <div key={index} className={styles.processCard}>
                <div className={styles.stepNumBadge}>{item.step}</div>
                <div className={styles.stepIconHolder}>{item.icon}</div>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className={`section ${styles.visionSection}`}>
        <div className="container">
          <div className={styles.visionGrid}>
            <div className={styles.visionCard}>
              <div className={styles.visionIconCircle}>
                <Target size={28} color="#16a34a" />
              </div>
              <h3 className={styles.visionTitle}>Our Mission</h3>
              <p className={styles.visionText}>
                To democratize superior hygiene by manufacturing hospital-grade, skin-friendly, and cost-effective cleaning formulations that elevate every family’s daily wellness.
              </p>
            </div>

            <div className={styles.visionCard}>
              <div className={styles.visionIconCircle}>
                <Eye size={28} color="#16a34a" />
              </div>
              <h3 className={styles.visionTitle}>Our Vision</h3>
              <p className={styles.visionText}>
                To emerge as India’s most trusted homegrown FMCG cleaning brand, renowned for sustainable chemistry, zero-waste manufacturing, and unmatched customer devotion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
