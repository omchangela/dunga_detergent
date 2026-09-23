"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, X, ChevronLeft, ZoomIn, Building2, Sparkles } from "lucide-react";
import styles from "./page.module.css";

const categories = [
  "All Photos",
  "Manufacturing & Plant",
  "Product Showcase",
  "Quality Testing",
  "Distribution & Network",
];

const galleryItems = [
  {
    id: 1,
    category: "Manufacturing & Plant",
    title: "High-Speed Automated Filling & Packaging Line",
    img: "/assets/about_facility.jpg",
    span: "wide",
  },
  {
    id: 2,
    category: "Product Showcase",
    title: "Monagodu 501 Dish Wash Liquid Formulation",
    img: "/assets/dishwash_liquid.jpg",
    span: "standard",
  },
  {
    id: 3,
    category: "Product Showcase",
    title: "Bio-Enzyme Concentrated Liquid Detergent",
    img: "/assets/liquid_detergent.jpg",
    span: "standard",
  },
  {
    id: 4,
    category: "Manufacturing & Plant",
    title: "Sterile Mixing & Bulk Storage Stainless Vessels",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
    span: "tall",
  },
  {
    id: 5,
    category: "Product Showcase",
    title: "Floral Disinfectant Floor Cleaner 1000ml",
    img: "/assets/floor_cleaner.jpg",
    span: "standard",
  },
  {
    id: 6,
    category: "Product Showcase",
    title: "Surface Cleaner & Multi-Action Degreaser",
    img: "/assets/surface_cleaner.jpg",
    span: "standard",
  },
  {
    id: 7,
    category: "Quality Testing",
    title: "Chemical Analytical QC & Purity Testing Lab",
    img: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1200&auto=format&fit=crop",
    span: "wide",
  },
  {
    id: 8,
    category: "Product Showcase",
    title: "LUNA Pink Blossom Moisturizing Beauty Soap",
    img: "/assets/bath_soap.jpg",
    span: "standard",
  },
  {
    id: 9,
    category: "Distribution & Network",
    title: "Automated Warehousing & Pallet Dispatch Hub",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    span: "tall",
  },
  {
    id: 10,
    category: "Product Showcase",
    title: "Monagodu 501 Power Laundry Soap Bar Pack",
    img: "/assets/laundry_soap.jpg",
    span: "standard",
  },
  {
    id: 11,
    category: "Distribution & Network",
    title: "Annual Pan-India Distributor & Dealer Conference",
    img: "https://images.unsplash.com/photo-1540317585384-e588117a4b84?q=80&w=1200&auto=format&fit=crop",
    span: "wide",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryItems.filter(
    (item) => activeCategory === "All Photos" || item.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };

  const prevItem = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const nextItem = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className={styles.pageWrap}>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <span className="section-badge">Visual Tour &amp; Milestones</span>
          <h1 className="page-hero-title">
            Infrastructure &amp; <br />
            <span className="gradient-text">Product Showcase</span>
          </h1>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} />
            <span>Gallery</span>
          </div>
        </div>
      </section>

      {/* ── Gallery Tabs & Grid ── */}
      <section className={`section ${styles.gallerySection}`}>
        <div className="container">
          {/* Category Tabs */}
          <div className={styles.tabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.tab} ${
                  activeCategory === cat ? styles.activeTab : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry / Structured Grid */}
          <div className={styles.galleryGrid}>
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.galleryItem} ${
                  item.span === "wide" ? styles.wide : ""
                } ${item.span === "tall" ? styles.tall : ""}`}
                onClick={() => openLightbox(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.title}
                  className={styles.galleryImg}
                  loading="lazy"
                />
                <div className={styles.galleryOverlay}>
                  <div className={styles.zoomBadge}>
                    <ZoomIn size={18} />
                  </div>
                  <span className={styles.galleryCategory}>{item.category}</span>
                  <h3 className={styles.galleryTitle}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox Modal ── */}
      {currentItem && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button
            className={styles.closeBtn}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            className={styles.prevBtn}
            onClick={(e) => {
              e.stopPropagation();
              prevItem();
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={30} />
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentItem.img}
              alt={currentItem.title}
              className={styles.lightboxImg}
            />
            <div className={styles.lightboxCaption}>
              <span className={styles.captionCat}>{currentItem.category}</span>
              <h3>{currentItem.title}</h3>
            </div>
          </div>

          <button
            className={styles.nextBtn}
            onClick={(e) => {
              e.stopPropagation();
              nextItem();
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </div>
  );
}
