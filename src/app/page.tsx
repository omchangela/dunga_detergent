"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Droplets,
  Heart,
  Factory,
  Trophy,
  Truck,
  Leaf,
  Home as HomeIcon,
  Globe,
  Star,
  Send,
  ArrowUp,
  MessageCircle,
  Award,
} from "lucide-react";
import TiltCard from "@/components/TiltCard";
import ThreeDIcon from "@/components/ThreeDIcons";
import styles from "./page.module.css";

/* ─── Product Range Slider Data (Matching Reference Screenshot) ──────────── */
const productCategories = [
  {
    title: "Dish Wash Liquid",
    img: "/assets/dishwash_liquid.jpg",
    bg: "#f0fdf4",
    border: "#dcfce7",
    color: "#16a34a",
    link: "/products",
  },
  {
    title: "Bath Soaps",
    img: "/assets/bath_soap.jpg",
    bg: "#eff6ff",
    border: "#dbeafe",
    color: "#2563eb",
    link: "/products",
  },
  {
    title: "Laundry Soaps",
    img: "/assets/laundry_soap.jpg",
    bg: "#f5f3ff",
    border: "#ede9fe",
    color: "#7c3aed",
    link: "/products",
  },
  {
    title: "Surface Cleaners",
    img: "/assets/surface_cleaner.jpg",
    bg: "#fefce8",
    border: "#fef08a",
    color: "#ca8a04",
    link: "/products",
  },
  {
    title: "Floor Cleaners",
    img: "/assets/floor_cleaner.jpg",
    bg: "#fdf2f8",
    border: "#fce7f3",
    color: "#db2777",
    link: "/products",
  },
  {
    title: "Multi-Purpose",
    img: "/assets/multipurpose.jpg",
    bg: "#f0fdfa",
    border: "#ccfbf1",
    color: "#0d9488",
    link: "/products",
  },
];

/* ─── Customer Reviews ───────────────────────────────────────────────────── */
const reviews = [
  {
    name: "Priya Sharma",
    avatar: "/assets/customer_avatar_1.jpg",
    role: "Verified Buyer, Hyderabad",
    review:
      "Absolutely love the freshness it leaves on my clothes! Stains are gone in just one wash. Monagodu 501 has become a staple in our home.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    avatar: "/assets/customer_avatar_2.jpg",
    role: "Wholesale Partner, Vijayawada",
    review:
      "Best floor cleaner and liquid detergent. Very affordable and genuinely gentle on hands. Our bulk orders arrive on time every single time.",
    rating: 5,
  },
  {
    name: "Sunita Rao",
    avatar: "/assets/customer_avatar_3.jpg",
    role: "Hospitality Lead, Guntur",
    review:
      "The fabric conditioner is amazing! Clothes feel super soft and smell like fresh lavender. Highly recommend to everyone looking for quality.",
    rating: 5,
  },
];

/* ─── 3D Quality Badges ─────────────────────────────────────────────────── */
const badges = [
  {
    iconType: "formula" as const,
    title: "Advanced Formula",
    desc: "Engineered by senior industrial chemists for supreme cleaning power.",
  },
  {
    iconType: "hands" as const,
    title: "Safe on Skin",
    desc: "Dermatologically tested, hypo-allergenic, and gentle on hands.",
  },
  {
    iconType: "fragrance" as const,
    title: "Long Lasting Freshness",
    desc: "Natural essential oils encapsulate fibers for all-day aroma.",
  },
  {
    iconType: "brighten" as const,
    title: "Brightens Clothes",
    desc: "Optical fabric brighteners restore vibrancy to colors and whites.",
  },
  {
    iconType: "eco" as const,
    title: "Eco Friendly",
    desc: "100% biodegradable ingredients and recyclable zero-leak packaging.",
  },
  {
    iconType: "price" as const,
    title: "Affordable Price",
    desc: "Factory-direct pricing delivering 3x concentrated value per bottle.",
  },
];

export default function HomePage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can we help you clean brighter today? Ask us about our products or dealership enquiries.",
    },
  ]);

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thank you for reaching out! You can also chat directly with our team on WhatsApp at +91 94413 94047.",
        },
      ]);
    }, 700);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.pageContainer}>
      {/* ── HERO BANNER (MATCHING REFERENCE IMAGE) ── */}
      <section className={styles.heroSection}>
        {/* Photorealistic decorative foliage framing the scene */}
        <div className={styles.leafDecorTopRight}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/foliage_tr_blurred.png"
            alt=""
            className={styles.leafImg}
          />
        </div>

        <div className={styles.leafDecorBottomLeft}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/foliage_bl_blurred.png"
            alt=""
            className={styles.leafImg}
          />
        </div>

        <div className={`container ${styles.heroContainer}`}>
          {/* Left Column: Headlines & CTAs */}
          <div className={styles.heroLeft}>
            {/* Top Badge */}
            <div className={styles.certBadge}>
              <span className={styles.certBadgeLeaf}>🌿</span>
              <span>ISO 9001:2015 Certified Manufacturing</span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.heroHeadline}>
              <span className={styles.headlineDark}>CLEANER HOMES</span>
              <br />
              <span className={styles.headlineGreen}>HAPPIER LIVES</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Powerful cleaning solutions crafted to remove tough stains,
              eliminate 99.9% of germs and deliver long-lasting freshness to your
              home.
            </p>

            {/* CTA Buttons */}
            <div className={styles.heroBtnGroup}>
              <Link href="/products" className={styles.btnExplore}>
                <span>Explore Products</span>
                <ArrowRight size={17} />
              </Link>
              <Link href="/contact" className={styles.btnContact}>
                <Phone size={16} />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* 4-Item Mini Trust Bar */}
            <div className={styles.heroTrustGrid}>
              <div className={styles.trustCol}>
                <div className={styles.trustIconGreen}>
                  <CheckCircle2 size={16} color="#16a34a" />
                </div>
                <div>
                  <strong>Kills 99.9%</strong>
                  <span>Germs &amp; Bacteria</span>
                </div>
              </div>

              <div className={styles.trustCol}>
                <div className={styles.trustIconGreen}>
                  <Leaf size={16} color="#16a34a" />
                </div>
                <div>
                  <strong>Gentle</strong>
                  <span>on Hands</span>
                </div>
              </div>

              <div className={styles.trustCol}>
                <div className={styles.trustIconGreen}>
                  <Globe size={16} color="#16a34a" />
                </div>
                <div>
                  <strong>Pan-India</strong>
                  <span>Supply</span>
                </div>
              </div>

              <div className={styles.trustCol}>
                <div className={styles.trustIconGreen}>
                  <HomeIcon size={16} color="#16a34a" />
                </div>
                <div>
                  <strong>Trusted</strong>
                  <span>Everyday</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Masterfully Composed Commercial Showcase */}
          <div className={styles.heroRight}>
            <div className={styles.heroShowcaseWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hero_right_clean.jpg"
                alt="Monagodu 501 Dish Wash Liquid - Active Lemon Power, Freshness in Every Drop"
                className={styles.heroShowcaseImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR PRODUCT RANGE (ELEVATED WHITE CARD CONTAINER) ── */}
      <section className={styles.rangeSection}>
        <div className="container">
          <div className={styles.rangeContainerCard}>
            {/* Header with Title and View All Button */}
            <div className={styles.rangeHeader}>
              <div>
                <div className={styles.rangeTagRow}>
                  <span className={styles.rangeTagLine} />
                  <span className={styles.rangeTagText}>OUR PRODUCT RANGE</span>
                </div>
                <h2 className={styles.rangeTitle}>
                  Complete <span className={styles.rangeTitleGreen}>Cleaning Solutions</span>
                </h2>
                <p className={styles.rangeSubtitle}>
                  From kitchens to bathrooms, we have the right cleaning solution
                  for every need.
                </p>
              </div>

              <Link href="/products" className={styles.btnViewAll}>
                <span>View All Products</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* 6 Category Pastel Cards (Horizontal layout matching reference) */}
            <div className={styles.categoryCardsGrid}>
              {productCategories.map((cat, i) => (
                <Link
                  key={i}
                  href={cat.link}
                  className={styles.catCard}
                  style={{
                    backgroundColor: cat.bg,
                    borderColor: cat.border,
                  }}
                >
                  <div className={styles.catCardImgHolder}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cat.img} alt={cat.title} className={styles.catCardImg} />
                  </div>
                  <div className={styles.catCardTextGroup}>
                    <h3 className={styles.catCardTitle}>{cat.title}</h3>
                  </div>
                  <div
                    className={styles.catCardArrow}
                    style={{ color: cat.color }}
                  >
                    <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>

            {/* 4-Item Horizontal Trust Footer Bar (Inside the White Card Container) */}
            <div className={styles.trustBarHorizontal}>
              <div className={styles.trustBarItem}>
                <div className={styles.trustBarIcon}>
                  <Trophy size={20} color="#16a34a" />
                </div>
                <div>
                  <h4>Premium Quality</h4>
                  <p>Trusted by thousands of families</p>
                </div>
              </div>

              <div className={styles.trustBarItem}>
                <div className={styles.trustBarIcon}>
                  <Factory size={20} color="#16a34a" />
                </div>
                <div>
                  <h4>Modern Manufacturing</h4>
                  <p>ISO 9001:2015 Certified</p>
                </div>
              </div>

              <div className={styles.trustBarItem}>
                <div className={styles.trustBarIcon}>
                  <Truck size={20} color="#16a34a" />
                </div>
                <div>
                  <h4>Pan-India Distribution</h4>
                  <p>Wide dealer network</p>
                </div>
              </div>

              <div className={styles.trustBarItem}>
                <div className={`${styles.trustBarIcon} ${styles.trustBarIconHeart}`}>
                  <Heart size={20} color="#ef4444" fill="#ef4444" />
                </div>
                <div>
                  <h4>A Cleaner, Greener Tomorrow</h4>
                  <p>Our commitment to a healthier planet</p>
                </div>
              </div>

              <div className={styles.trustBarLeaf} title="Pure Eco Commitment">
                🌿
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3D QUALITY BADGES (WHY CHOOSE US) ── */}
      <section className={`section ${styles.qualitySection}`}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3.5rem" }}>
            <span className="section-badge">Formulated for Excellence</span>
            <h2 className="section-title">Why Leading Families Choose Us</h2>
            <p className="section-subtitle">
              Every Monagodu 501 formulation delivers surgical stain-removal potency while maintaining absolute safety for hands and fabrics.
            </p>
          </div>

          <div className={styles.badgesGrid}>
            {badges.map((b, i) => (
              <TiltCard key={i} maxTilt={6} scale={1.02} className={styles.badgeCard}>
                <div className={styles.badge3DIcon}>
                  <ThreeDIcon type={b.iconType} size={54} />
                </div>
                <div className={styles.badgeBody}>
                  <h3 className={styles.badgeTitle}>{b.title}</h3>
                  <p className={styles.badgeDesc}>{b.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Customer Reviews Sub-section */}
          <div className={styles.reviewsWrapper}>
            <div className="text-center" style={{ marginBottom: "2.5rem" }}>
              <span className="section-badge">Verified Customer Stories</span>
              <h3 className={styles.reviewsTitle}>Trusted in Over 8,000+ Homes</h3>
            </div>

            <div className={styles.reviewsGrid}>
              {reviews.map((r, i) => (
                <TiltCard key={i} maxTilt={6} scale={1.02} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.avatar} alt={r.name} className={styles.reviewAvatar} />
                    <div>
                      <h4 className={styles.reviewName}>{r.name}</h4>
                      <p className={styles.reviewRole}>{r.role}</p>
                      <div className={styles.reviewStars}>
                        {Array.from({ length: r.rating }).map((_, starIdx) => (
                          <Star key={starIdx} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewText}>&ldquo;{r.review}&rdquo;</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MIDDLE BANNER: Clean Clothes, Happy Family ── */}
      <section className={styles.familyBannerSection}>
        <div className="container">
          <div className={styles.familyBannerGrid}>
            <div className={styles.bannerImgWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/family_banner.jpg"
                alt="Clean modern laundry room with detergents"
                className={styles.bannerImg}
              />
              <div className={styles.bannerBadgeFloat}>
                <Award size={20} color="#16a34a" />
                <span>13+ Years of Pure Family Trust</span>
              </div>
            </div>

            <div className={styles.bannerContent}>
              <span className="section-badge">Healthy Living</span>
              <h2 className={styles.bannerHeadline}>
                Clean Clothes,<br />
                <span className={styles.titleGreen}>Happy Family</span>
              </h2>
              <p className={styles.bannerDesc}>
                Our detergents and fabric conditioners bring comfort and hygiene
                to your home, ensuring your family walks out with absolute
                confidence and dazzling smiles every single day.
              </p>

              <div className={styles.bannerList}>
                <div className={styles.bannerListItem}>
                  <CheckCircle2 size={20} color="#16a34a" />
                  <span>Powerful Deep Cleaning Action</span>
                </div>
                <div className={styles.bannerListItem}>
                  <CheckCircle2 size={20} color="#16a34a" />
                  <span>Brilliant Luxury Fresh Fragrance</span>
                </div>
                <div className={styles.bannerListItem}>
                  <CheckCircle2 size={20} color="#16a34a" />
                  <span>Gentle Protection For Delicate Fabrics</span>
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <Link href="/about" className="btn btn-primary">
                  <span>Know More About Us</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING WIDGETS (WhatsApp & Back to Top) ── */}
      <div className={styles.floatingActions}>
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className={styles.backToTopBtn}
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp size={20} />
          </button>
        )}

        <div className={styles.whatsappWrapper}>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={styles.whatsappLauncher}
            aria-label="Chat with Monagodu 501"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={28} />
            <span className={styles.whatsappBadgeDot} />
          </button>

          {/* Interactive WhatsApp Pop-up */}
          {chatOpen && (
            <div className={styles.whatsappChatbox}>
              <div className={styles.chatHeader}>
                <div className={styles.chatAvatar}>501</div>
                <div className={styles.chatHeaderInfo}>
                  <h4>Monagodu 501 Support</h4>
                  <p>Replies in a few minutes</p>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className={styles.chatClose}
                >
                  ✕
                </button>
              </div>

              <div className={styles.chatBody}>
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`${styles.chatMsg} ${msg.sender === "user" ? styles.msgUser : styles.msgBot}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className={styles.chatFooter}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className={styles.chatInput}
                />
                <button type="submit" className={styles.chatSendBtn}>
                  <Send size={15} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
