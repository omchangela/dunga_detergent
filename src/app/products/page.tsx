"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  X,
  Phone,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Droplets,
  PackageCheck,
} from "lucide-react";
import styles from "./page.module.css";

const categories = [
  "All Products",
  "Dish Wash",
  "Detergent & Laundry",
  "Floor & Surface Cleaners",
  "Herbal & Beauty Soaps",
];

export interface Product {
  id: number;
  name: string;
  category: string;
  badge: string;
  badgeColor?: string;
  img: string;
  desc: string;
  features: string[];
  weights: string[];
  formulation?: string;
  phBalanced?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Monagodu 501 Dish Wash Liquid",
    category: "Dish Wash",
    badge: "Active Lemon Power",
    badgeColor: "#16a34a",
    img: "/assets/dishwash_liquid.jpg",
    desc: "Commercial-strength grease removal formulation powered by active lemon extracts. Leaves glassware and stainless steel sparkling with zero cloudy residue.",
    features: [
      "Instant grease breakdown on kadhais & tawas",
      "Gentle on skin with balanced neutral pH",
      "Sustained lemon aroma that neutralizes food odors",
      "High-foaming concentrated formulation",
    ],
    weights: ["250ml", "500ml", "1L", "5L Can"],
    formulation: "Triple Active Surfactant System with Lemon Oil",
    phBalanced: true,
  },
  {
    id: 2,
    name: "Monagodu 501 Liquid Detergent",
    category: "Detergent & Laundry",
    badge: "Optical Brightener",
    badgeColor: "#2563eb",
    img: "/assets/liquid_detergent.jpg",
    desc: "Bio-enzyme concentrated liquid detergent engineered for deep fiber stain removal, color lock preservation, and zero chalky white sediment.",
    features: [
      "Deep fiber micro-penetration for tough collar stains",
      "Color-lock polymers protect bright shades",
      "100% compatible with top & front load washing machines",
      "Encapsulated luxury long-lasting fabric fragrance",
    ],
    weights: ["500ml", "1L", "2L", "5L Can"],
    formulation: "Protease & Amylase Bio-Enzyme Formula",
    phBalanced: true,
  },
  {
    id: 3,
    name: "Monagodu 501 Floral Floor Cleaner",
    category: "Floor & Surface Cleaners",
    badge: "99.9% Germ Shield",
    badgeColor: "#e11d48",
    img: "/assets/floor_cleaner.jpg",
    desc: "Hospital-grade disinfectant surface and tile cleaner infused with natural floral botanicals. Safe for marble, granite, ceramic, and hardwood floors.",
    features: [
      "Proven 99.9% bacterial kill rate in 60 seconds",
      "Streak-free quick-drying glossy shine",
      "Repels flies and household insects naturally",
      "Refreshing all-day French rose and blossom scent",
    ],
    weights: ["500ml", "1L", "5L Can"],
    formulation: "Benzalkonium Chloride (BKC) Active Disinfectant",
    phBalanced: true,
  },
  {
    id: 4,
    name: "Monagodu 501 Surface Cleaner & Degreaser",
    category: "Floor & Surface Cleaners",
    badge: "Instant Grease Cut",
    badgeColor: "#ca8a04",
    img: "/assets/surface_cleaner.jpg",
    desc: "Fast-acting multi-action trigger spray that dissolves kitchen oil film, chimney grease, exhaust grime, and countertop stains with zero scrubbing.",
    features: [
      "Dissolves stubborn burnt oil and exhaust grime",
      "Precision spray trigger for hard-to-reach corners",
      "Non-corrosive on stainless steel and acrylic modular slabs",
      "Leaves sanitized, residue-free glossy surfaces",
    ],
    weights: ["500ml Trigger", "750ml Refill", "5L"],
    formulation: "Heavy-Duty Alkaline Degreasing Complex",
    phBalanced: false,
  },
  {
    id: 5,
    name: "Monagodu 501 Multi-Purpose Spray",
    category: "Floor & Surface Cleaners",
    badge: "All-Surface Care",
    badgeColor: "#059669",
    img: "/assets/multipurpose.jpg",
    desc: "Universal hygiene spray for glass, mirrors, appliance panels, dining tables, and bathroom vanity counters with anti-static dust repelling action.",
    features: [
      "Crystal clear shine with zero water streaks",
      "Anti-fog and anti-static formula reduces dust buildup",
      "Safe on glass, chrome, plastic laminates, and wood",
      "Fresh mint botanical hygiene fragrance",
    ],
    weights: ["500ml Spray", "1L Refill"],
    formulation: "Rapid Evaporating Alcohol Blend + Surfactants",
    phBalanced: true,
  },
  {
    id: 6,
    name: "Monagodu 501 Power Laundry Soap Bar",
    category: "Detergent & Laundry",
    badge: "Stubborn Stain Scrub",
    badgeColor: "#7c3aed",
    img: "/assets/laundry_soap.jpg",
    desc: "Traditional dense laundry soap bar fortified with fabric softening agents and active blue brighteners for cuffs, collars, and baby clothes.",
    features: [
      "Targeted rubbing power for heavy dirt and mud marks",
      "Long-lasting solid bar that does not melt in water",
      "Retains fabric softness without stiffening threads",
      "Gentle on palms during manual bucket washing",
    ],
    weights: ["150g", "250g Pack of 4"],
    formulation: "Pure Saponified Vegetable Oils + Brightener",
    phBalanced: true,
  },
  {
    id: 7,
    name: "LUNA Pink Blossom Beauty Soap",
    category: "Herbal & Beauty Soaps",
    badge: "Rose Oil Moisture",
    badgeColor: "#db2777",
    img: "/assets/bath_soap.jpg",
    desc: "Luxury grade Grade-1 moisturizing toilet soap enriched with pure Damask rose oil and natural glycerin for velvety soft, radiant skin.",
    features: [
      "TFM 76% Grade-1 luxury bathing experience",
      "Infused with natural rose essential oil and skin humectants",
      "Produces rich creamy lather that does not dry skin",
      "Long-lasting authentic floral bouquet scent",
    ],
    weights: ["125g Single", "Multipack of 3"],
    formulation: "Vegetable Soap Base + Rose Essential Oil",
    phBalanced: true,
  },
  {
    id: 8,
    name: "AVD Pure Coffee Scrub Soap",
    category: "Herbal & Beauty Soaps",
    badge: "Natural Exfoliant",
    badgeColor: "#78350f",
    img: "/assets/coffee_soap.jpg",
    desc: "Handcrafted artisan exfoliating soap loaded with finely ground Arabica coffee beans to sweep away dead cells and stimulate micro-circulation.",
    features: [
      "Natural coffee grounds scrub away pollution & dead skin",
      "Rich in natural antioxidants that tone skin texture",
      "Wakes up senses with warm roasted espresso aroma",
      "100% free from microplastic beads",
    ],
    weights: ["75g", "100g", "125g"],
    formulation: "Arabica Coffee Grounds + Coconut Oil Base",
    phBalanced: true,
  },
  {
    id: 9,
    name: "AVD Organic Neem Antibacterial Soap",
    category: "Herbal & Beauty Soaps",
    badge: "Ayurvedic Defense",
    badgeColor: "#15803d",
    img: "/assets/neem_soap.jpg",
    desc: "Traditional Ayurvedic antibacterial bathing bar infused with cold-pressed Azadirachta indica (Neem) leaf oil for acne-free, clean skin.",
    features: [
      "Natural antiseptic defense against rashes and summer acne",
      "Purifies clogged pores and controls excess body sebum",
      "Therapeutic herbal freshness throughout the day",
      "Safe for entire family including sensitive skin",
    ],
    weights: ["75g", "100g", "125g"],
    formulation: "Pure Cold-Pressed Neem Oil + Tulsi Extract",
    phBalanced: true,
  },
  {
    id: 10,
    name: "AVD Multani Mitti Clay Soap",
    category: "Herbal & Beauty Soaps",
    badge: "Deep Pore Detox",
    badgeColor: "#b45309",
    img: "/assets/multani_mitti_soap.jpg",
    desc: "Authentic Fuller's Earth clay combined with sandalwood oil to absorb excess oil, soothe sun irritation, and unveil natural matte glow.",
    features: [
      "Draws out deep-seated environmental toxins from pores",
      "Cools heated skin and combats prickly heat rashes",
      "Natural skin-tightening and smoothing action",
      "Gentle non-stripping daily cleansing",
    ],
    weights: ["75g", "100g", "125g"],
    formulation: "Bentonite Clay + Fuller's Earth + Sandal Oil",
    phBalanced: true,
  },
  {
    id: 11,
    name: "AVD Milky Rice Nourishing Soap",
    category: "Herbal & Beauty Soaps",
    badge: "Skin Brightening",
    badgeColor: "#0284c7",
    img: "/assets/milky_rice_soap.jpg",
    desc: "Inspired by traditional Asian beauty secrets, organic Jasmine rice milk infuses skin with Vitamin E and amino acids for radiant clarity.",
    features: [
      "Natural rice water ceramides strengthen skin moisture barrier",
      "Gentle lightening of sun tan and dark pigmentation",
      "Silky soft touch with delicate comforting fragrance",
      "Ideal for dry and combination skin types",
    ],
    weights: ["75g", "100g", "125g"],
    formulation: "Organic Rice Milk Extract + Vitamin E",
    phBalanced: true,
  },
  {
    id: 12,
    name: "AVD Cool Mint Icy Soap",
    category: "Herbal & Beauty Soaps",
    badge: "Instant Icy Blast",
    badgeColor: "#0891b2",
    img: "/assets/cool_mint_soap.jpg",
    desc: "Packed with active menthol crystals and peppermint essential oil to deliver an exhilarating icy shower sensation that beats summer heat.",
    features: [
      "Instant cooling rush that refreshes tired muscles",
      "Deodorizing botanical actives neutralize sweat odor",
      "Invigorating sensory shower wake-up call",
      "Rich moisturizers prevent post-bath dryness",
    ],
    weights: ["75g", "100g", "125g"],
    formulation: "Natural Menthol Crystals + Peppermint Oil",
    phBalanced: true,
  },
];

export default function ProductsPage() {
  const [productList, setProductList] = useState<Product[]>(products);
  const [selectedCat, setSelectedCat] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadLiveProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProductList(data);
          }
        }
      } catch (err) {
        console.error("Error fetching live products:", err);
      }
    }
    loadLiveProducts();
  }, []);

  const filteredProducts = productList.filter((p) => {
    const matchesCat =
      selectedCat === "All Products" || p.category === selectedCat;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className={styles.pageWrap}>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Complete FMCG Portfolio</span>
          <h1 className="page-hero-title">
            Commercial Purity, <br />
            <span className="gradient-text">Everyday Freshness</span>
          </h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Products</span>
          </div>
        </div>
      </section>

      {/* ── Interactive Search & Category Filter ── */}
      <section className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterRow}>
            {/* Search Input */}
            <div className={styles.searchHolder}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search dishwash, detergent, floor cleaner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className={styles.clearSearchBtn}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className={styles.categoryPills}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`${styles.catPill} ${
                    selectedCat === cat ? styles.catPillActive : ""
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.catalogHeader}>
            <p className={styles.resultsText}>
              Showing <strong>{filteredProducts.length}</strong> formulated products in{" "}
              <span>{selectedCat}</span>
            </p>
          </div>

          <div className={styles.productGrid}>
            {filteredProducts.map((p) => (
              <div key={p.id} className={styles.productCard}>
                {/* Top Badge */}
                <div className={styles.productBadgeRow}>
                  <span
                    className={styles.productBadge}
                    style={{
                      color: p.badgeColor || "#16a34a",
                      backgroundColor: `${p.badgeColor || "#16a34a"}14`,
                      borderColor: `${p.badgeColor || "#16a34a"}30`,
                    }}
                  >
                    {p.badge}
                  </span>
                  <span className={styles.categoryTag}>{p.category}</span>
                </div>

                {/* Product Image Holder */}
                <div
                  className={styles.productImgBox}
                  onClick={() => setActiveModalProduct(p)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.name}
                    className={styles.productImg}
                    loading="lazy"
                  />
                </div>

                {/* Title & Description */}
                <div className={styles.productContent}>
                  <h3
                    className={styles.productTitle}
                    onClick={() => setActiveModalProduct(p)}
                  >
                    {p.name}
                  </h3>
                  <p className={styles.productDesc}>{p.desc}</p>

                  {/* Weights/Pack Sizes */}
                  <div className={styles.weightsRow}>
                    <span className={styles.weightsLabel}>Pack Sizes:</span>
                    <div className={styles.weightPills}>
                      {p.weights.map((w, idx) => (
                        <span key={idx} className={styles.weightPill}>
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className={styles.keyFeature}>
                    <CheckCircle2 size={15} color="#16a34a" />
                    <span>{p.features[0]}</span>
                  </div>

                  {/* Card Actions */}
                  <div className={styles.cardActions}>
                    <button
                      onClick={() => setActiveModalProduct(p)}
                      className={styles.btnDetails}
                    >
                      <span>View Details</span>
                    </button>
                    <a
                      href={`https://wa.me/919441394047?text=Hello%20Monagodu%20501,%20I%20am%20interested%20in%20${encodeURIComponent(
                        p.name
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnWhatsapp}
                      title="Enquire on WhatsApp"
                    >
                      <Phone size={15} />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className={styles.noResultsBox}>
              <PackageCheck size={48} color="#94a3b8" />
              <h3>No products matched your search</h3>
              <p>Try searching for dishwash, detergent, or choose another category.</p>
              <button
                onClick={() => {
                  setSelectedCat("All Products");
                  setSearchQuery("");
                }}
                className="btn btn-primary"
                style={{ marginTop: "1rem" }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Product Details Modal ── */}
      {activeModalProduct && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalProduct(null)}
              className={styles.modalCloseBtn}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className={styles.modalGrid}>
              <div className={styles.modalImgWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeModalProduct.img}
                  alt={activeModalProduct.name}
                  className={styles.modalImg}
                />
              </div>

              <div className={styles.modalInfo}>
                <span
                  className={styles.productBadge}
                  style={{
                    color: activeModalProduct.badgeColor || "#16a34a",
                    backgroundColor: `${activeModalProduct.badgeColor || "#16a34a"}14`,
                    borderColor: `${activeModalProduct.badgeColor || "#16a34a"}30`,
                    width: "fit-content",
                  }}
                >
                  {activeModalProduct.badge}
                </span>
                <h2 className={styles.modalTitle}>{activeModalProduct.name}</h2>
                <p className={styles.modalCategory}>
                  Category: <strong>{activeModalProduct.category}</strong>
                </p>
                <p className={styles.modalDesc}>{activeModalProduct.desc}</p>

                {activeModalProduct.formulation && (
                  <div className={styles.formulationBox}>
                    <strong>Chemistry / Active Formulation:</strong>
                    <p>{activeModalProduct.formulation}</p>
                  </div>
                )}

                <div className={styles.modalFeatures}>
                  <strong>Key Performance Benefits:</strong>
                  <ul>
                    {activeModalProduct.features.map((feat, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} color="#16a34a" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.modalWeights}>
                  <strong>Available Pack Volumes:</strong>
                  <div className={styles.weightPills}>
                    {activeModalProduct.weights.map((w, i) => (
                      <span key={i} className={styles.weightPillLarge}>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.modalBtnRow}>
                  <a
                    href={`https://wa.me/919441394047?text=Hello%20Monagodu%20501,%20I%20am%20interested%20in%20bulk%20enquiry%20for%20${encodeURIComponent(
                      activeModalProduct.name
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <Phone size={16} />
                    <span>WhatsApp Dealership / Bulk Enquiry</span>
                  </a>
                  <Link href="/dealership" className="btn btn-secondary">
                    <span>Apply for Dealership</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
