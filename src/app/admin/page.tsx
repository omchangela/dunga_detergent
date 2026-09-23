"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  Inbox,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Upload,
  Sparkles,
  RefreshCw,
  X,
  Eye,
  Filter,
} from "lucide-react";
import { ProductData, InquiryData } from "@/lib/storage";
import styles from "./page.module.css";

const CATEGORY_OPTIONS = [
  "Dish Wash",
  "Detergent & Laundry",
  "Floor & Surface Cleaners",
  "Herbal & Beauty Soaps",
  "Industrial Cleaners",
];

const PRESET_BADGE_COLORS = [
  { name: "Emerald Green", hex: "#16a34a" },
  { name: "Royal Blue", hex: "#2563eb" },
  { name: "Floral Rose", hex: "#e11d48" },
  { name: "Golden Amber", hex: "#ca8a04" },
  { name: "Botanical Teal", hex: "#059669" },
  { name: "Lavender Violet", hex: "#7c3aed", },
  { name: "Beauty Pink", hex: "#db2777" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Tab: "overview" | "products" | "inquiries"
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "inquiries">("overview");

  // Auth state
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  // Data states
  const [products, setProducts] = useState<ProductData[]>([]);
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Search & Filter
  const [productSearch, setProductSearch] = useState("");
  const [productCatFilter, setProductCatFilter] = useState("All");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Product Form Fields
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState(CATEGORY_OPTIONS[0]);
  const [pBadge, setPBadge] = useState("Active Power");
  const [pBadgeColor, setPBadgeColor] = useState("#16a34a");
  const [pImg, setPImg] = useState("/assets/dishwash_liquid.jpg");
  const [pDesc, setPDesc] = useState("");
  const [pFeatures, setPFeatures] = useState("");
  const [pWeights, setPWeights] = useState("500ml, 1L, 5L");
  const [pFormulation, setPFormulation] = useState("");
  const [pPhBalanced, setPPhBalanced] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Check auth
  useEffect(() => {
    const userStr = localStorage.getItem("mng_admin_user");
    if (!userStr) {
      router.push("/admin/login");
      return;
    }
    try {
      setAdminUser(JSON.parse(userStr));
    } catch {
      router.push("/admin/login");
    }
  }, [router]);

  // Load Data
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [prodRes, inqRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/inquiries"),
      ]);

      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("mng_admin_user");
    router.push("/admin/login");
  };

  // ─── Product CRUD Operations ───────────────────────────────────────────────
  const openAddProductModal = () => {
    setEditingProduct(null);
    setPName("");
    setPCategory(CATEGORY_OPTIONS[0]);
    setPBadge("Active Power");
    setPBadgeColor("#16a34a");
    setPImg("/assets/dishwash_liquid.jpg");
    setPDesc("");
    setPFeatures("Deep cleaning action\nLong lasting fresh fragrance\nGentle on surfaces");
    setPWeights("500ml, 1L, 5L");
    setPFormulation("Balanced Surfactant Formula");
    setPPhBalanced(true);
    setFormError(null);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: ProductData) => {
    setEditingProduct(product);
    setPName(product.name);
    setPCategory(product.category);
    setPBadge(product.badge);
    setPBadgeColor(product.badgeColor || "#16a34a");
    setPImg(product.img);
    setPDesc(product.desc);
    setPFeatures(product.features.join("\n"));
    setPWeights(product.weights.join(", "));
    setPFormulation(product.formulation || "");
    setPPhBalanced(Boolean(product.phBalanced));
    setFormError(null);
    setIsProductModalOpen(true);
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setPImg(data.url);
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!pName.trim() || !pDesc.trim()) {
      setFormError("Product name and description are required.");
      return;
    }

    const payload = {
      name: pName.trim(),
      category: pCategory,
      badge: pBadge.trim(),
      badgeColor: pBadgeColor,
      img: pImg,
      desc: pDesc.trim(),
      features: pFeatures
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      weights: pWeights
        .split(",")
        .map((w) => w.trim())
        .filter(Boolean),
      formulation: pFormulation.trim() || undefined,
      phBalanced: pPhBalanced,
    };

    try {
      if (editingProduct) {
        // Update product
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const result = await res.json();
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? result.product : p))
          );
          setIsProductModalOpen(false);
        } else {
          setFormError("Failed to update product.");
        }
      } else {
        // Create product
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const result = await res.json();
          setProducts((prev) => [result.product, ...prev]);
          setIsProductModalOpen(false);
        } else {
          setFormError("Failed to create product.");
        }
      }
    } catch (err) {
      console.error("Save product error:", err);
      setFormError("Server error while saving product.");
    }
  };

  const handleDeleteProduct = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to permanently remove "${name}" from the catalog?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting product.");
    }
  };

  // ─── Inquiry CRM Operations ───────────────────────────────────────────────
  const handleUpdateInquiryStatus = async (id: string, newStatus: "new" | "contacted" | "closed") => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      }
    } catch (err) {
      console.error("Delete inquiry error:", err);
    }
  };

  // Filtered lists
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.desc.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCatFilter === "All" || p.category === productCatFilter;
    return matchesSearch && matchesCat;
  });

  const filteredInquiries = inquiries.filter((inq) => {
    if (inquiryStatusFilter === "all") return true;
    return inq.status === inquiryStatusFilter;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className={styles.adminLayout}>
      {/* ─── Top Enterprise Header ────────────────────────────────────────── */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <Link href="/" className={styles.brandLink}>
            <Image
              src="/assets/logo.png"
              alt="Monagodu 501"
              width={120}
              height={38}
              style={{ objectFit: "contain" }}
              priority
            />
            <span className={styles.adminConsoleBadge}>ADMIN CONSOLE</span>
          </Link>
        </div>

        <div className={styles.headerRight}>
          <Link href="/products" target="_blank" className={styles.liveSiteBtn}>
            <ExternalLink size={15} />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={fetchData}
            disabled={refreshing}
            className={styles.refreshBtn}
            title="Refresh Data"
          >
            <RefreshCw size={15} className={refreshing ? styles.spin : ""} />
            <span>Refresh</span>
          </button>

          <div className={styles.userProfile}>
            <div className={styles.userAvatar}>MD</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{adminUser?.name || "Managing Director"}</span>
              <span className={styles.userRole}>Super Administrator</span>
            </div>
          </div>

          <button onClick={handleLogout} className={styles.logoutBtn} title="Sign Out">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* ─── Main Admin Container ─────────────────────────────────────────── */}
      <div className={styles.mainContainer}>
        {/* Navigation Tabs Bar */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tabBtn} ${activeTab === "overview" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard size={18} />
            <span>Executive Overview</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === "products" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("products")}
          >
            <Package size={18} />
            <span>Products Management</span>
            <span className={styles.tabBadge}>{products.length}</span>
          </button>

          <button
            className={`${styles.tabBtn} ${activeTab === "inquiries" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("inquiries")}
          >
            <Inbox size={18} />
            <span>Contact Inquiries CRM</span>
            {newInquiriesCount > 0 && (
              <span className={styles.alertBadge}>{newInquiriesCount} New</span>
            )}
          </button>
        </div>

        {/* ─── TAB 1: OVERVIEW ──────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className={styles.tabContent}>
            {/* Stat Cards */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: "#f0fdf4", color: "#16a34a" }}>
                  <Inbox size={24} />
                </div>
                <div>
                  <span className={styles.statLabel}>Total Customer Inquiries</span>
                  <h3 className={styles.statValue}>{inquiries.length}</h3>
                  <span className={styles.statHint}>Logged via website contact form</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: "#fef2f2", color: "#ef4444" }}>
                  <Clock size={24} />
                </div>
                <div>
                  <span className={styles.statLabel}>Pending / New Leads</span>
                  <h3 className={styles.statValue}>{newInquiriesCount}</h3>
                  <span className={styles.statHint}>Require commercial callback</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: "#eff6ff", color: "#2563eb" }}>
                  <Package size={24} />
                </div>
                <div>
                  <span className={styles.statLabel}>Active Live Products</span>
                  <h3 className={styles.statValue}>{products.length}</h3>
                  <span className={styles.statHint}>Visible across customer catalog</span>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: "#fefce8", color: "#ca8a04" }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <span className={styles.statLabel}>Product Categories</span>
                  <h3 className={styles.statValue}>4 Lines</h3>
                  <span className={styles.statHint}>Dishwash, Detergent, Floor, Soap</span>
                </div>
              </div>
            </div>

            {/* Recent Leads Preview & Quick Action Bar */}
            <div className={styles.overviewGrid}>
              <div className={styles.overviewCard}>
                <div className={styles.cardHeaderFlex}>
                  <div>
                    <h3 className={styles.cardHeading}>Latest Inquiries & Dealer Leads</h3>
                    <p className={styles.cardSub}>Incoming messages from website visitors</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className={styles.textLinkBtn}
                  >
                    View All Leads →
                  </button>
                </div>

                <div className={styles.miniLeadsList}>
                  {inquiries.slice(0, 4).map((inq) => (
                    <div key={inq.id} className={styles.miniLeadItem}>
                      <div className={styles.leadHeader}>
                        <strong>{inq.name}</strong>
                        <span
                          className={`${styles.statusChip} ${
                            styles[`status_${inq.status}`]
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <div className={styles.leadMeta}>
                        <span>
                          <Phone size={12} /> {inq.phone}
                        </span>
                        <span>
                          <MapPin size={12} /> {inq.city}
                        </span>
                      </div>
                      <p className={styles.miniLeadMsg}>{inq.message}</p>
                      <div className={styles.miniLeadActions}>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                            inq.name
                          )},%20this%20is%20Monagodu%20501%20management%20regarding%20your%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.quickWhatsApp}
                        >
                          <MessageSquare size={13} /> Chat on WhatsApp
                        </a>
                        <span className={styles.leadDate}>
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {inquiries.length === 0 && (
                    <p className={styles.emptyText}>No inquiries received yet.</p>
                  )}
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className={styles.overviewCard}>
                <h3 className={styles.cardHeading}>Fast Operations</h3>
                <p className={styles.cardSub}>Immediate administrative workflows</p>

                <div className={styles.quickActionsList}>
                  <button onClick={openAddProductModal} className={styles.actionBlock}>
                    <div className={styles.actionIconWrap} style={{ background: "#f0fdf4", color: "#16a34a" }}>
                      <Plus size={20} />
                    </div>
                    <div>
                      <strong>Add New Product to Catalog</strong>
                      <p>Upload photo, set pack sizes, and publish live to site</p>
                    </div>
                  </button>

                  <button onClick={() => setActiveTab("inquiries")} className={styles.actionBlock}>
                    <div className={styles.actionIconWrap} style={{ background: "#eff6ff", color: "#2563eb" }}>
                      <Inbox size={20} />
                    </div>
                    <div>
                      <strong>Review Pending Leads ({newInquiriesCount})</strong>
                      <p>Follow up with prospective distributors and bulk buyers</p>
                    </div>
                  </button>

                  <Link href="/products" target="_blank" className={styles.actionBlock}>
                    <div className={styles.actionIconWrap} style={{ background: "#fdf4ff", color: "#c026d3" }}>
                      <Eye size={20} />
                    </div>
                    <div>
                      <strong>Preview Customer Experience</strong>
                      <p>Open live products storefront in new browser tab</p>
                    </div>
                  </Link>
                </div>

                <div className={styles.systemStatusBox}>
                  <div className={styles.systemStatusDot} />
                  <div>
                    <strong>Production Catalog Status: Online</strong>
                    <p>Changes made in this console reflect immediately across the website.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: PRODUCTS MANAGEMENT ───────────────────────────────────── */}
        {activeTab === "products" && (
          <div className={styles.tabContent}>
            {/* Action Bar */}
            <div className={styles.productsTopBar}>
              <div className={styles.searchFilterGroup}>
                <div className={styles.searchBox}>
                  <Search size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search by product name or formula..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className={styles.searchInput}
                  />
                  {productSearch && (
                    <button onClick={() => setProductSearch("")} className={styles.clearBtn}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className={styles.catFilterWrap}>
                  <Filter size={15} color="#64748b" />
                  <select
                    value={productCatFilter}
                    onChange={(e) => setProductCatFilter(e.target.value)}
                    className={styles.catSelect}
                  >
                    <option value="All">All Categories ({products.length})</option>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button onClick={openAddProductModal} className="btn btn-primary">
                <Plus size={16} /> Add New Product
              </button>
            </div>

            {/* Products Grid */}
            <div className={styles.productCatalogGrid}>
              {filteredProducts.map((p) => (
                <div key={p.id} className={styles.adminProductCard}>
                  <div className={styles.productImgWrap}>
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={300}
                      height={200}
                      className={styles.productImg}
                      unoptimized
                    />
                    <span
                      className={styles.productBadgeFloat}
                      style={{
                        background: p.badgeColor ? `${p.badgeColor}18` : "#16a34a18",
                        color: p.badgeColor || "#16a34a",
                        borderColor: p.badgeColor ? `${p.badgeColor}40` : "#16a34a40",
                      }}
                    >
                      {p.badge}
                    </span>
                  </div>

                  <div className={styles.productCardBody}>
                    <span className={styles.productCatLabel}>{p.category}</span>
                    <h4 className={styles.productTitle}>{p.name}</h4>
                    <p className={styles.productDesc}>{p.desc}</p>

                    <div className={styles.weightsRow}>
                      {p.weights.map((w, idx) => (
                        <span key={idx} className={styles.weightPill}>
                          {w}
                        </span>
                      ))}
                    </div>

                    {p.formulation && (
                      <div className={styles.formulationNote}>
                        🔬 <strong>Formula:</strong> {p.formulation}
                      </div>
                    )}

                    <div className={styles.cardActionsRow}>
                      <button
                        onClick={() => openEditProductModal(p)}
                        className={styles.editBtn}
                        title="Edit Product"
                      >
                        <Edit3 size={15} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.name)}
                        className={styles.deleteBtn}
                        title="Delete Product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.noResultsBox}>
                <Package size={48} color="#94a3b8" />
                <h3>No Products Found</h3>
                <p>Try adjusting your search criteria or category filter.</p>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 3: CONTACT INQUIRIES CRM ─────────────────────────────────── */}
        {activeTab === "inquiries" && (
          <div className={styles.tabContent}>
            {/* Filter Pills */}
            <div className={styles.inquiriesHeaderRow}>
              <div className={styles.filterPills}>
                <button
                  className={`${styles.filterPill} ${
                    inquiryStatusFilter === "all" ? styles.filterPillActive : ""
                  }`}
                  onClick={() => setInquiryStatusFilter("all")}
                >
                  All Inquiries ({inquiries.length})
                </button>
                <button
                  className={`${styles.filterPill} ${
                    inquiryStatusFilter === "new" ? styles.filterPillActive : ""
                  }`}
                  onClick={() => setInquiryStatusFilter("new")}
                >
                  New / Unread ({inquiries.filter((i) => i.status === "new").length})
                </button>
                <button
                  className={`${styles.filterPill} ${
                    inquiryStatusFilter === "contacted" ? styles.filterPillActive : ""
                  }`}
                  onClick={() => setInquiryStatusFilter("contacted")}
                >
                  Contacted ({inquiries.filter((i) => i.status === "contacted").length})
                </button>
                <button
                  className={`${styles.filterPill} ${
                    inquiryStatusFilter === "closed" ? styles.filterPillActive : ""
                  }`}
                  onClick={() => setInquiryStatusFilter("closed")}
                >
                  Closed ({inquiries.filter((i) => i.status === "closed").length})
                </button>
              </div>

              <span className={styles.inquiryCountText}>
                Showing <strong>{filteredInquiries.length}</strong> inquiries
              </span>
            </div>

            {/* Inquiries Cards List */}
            <div className={styles.inquiriesList}>
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`${styles.inquiryCard} ${
                    inq.status === "new" ? styles.inquiryCardNew : ""
                  }`}
                >
                  <div className={styles.inqCardHeader}>
                    <div className={styles.leadInfo}>
                      <h4 className={styles.leadCustomerName}>{inq.name}</h4>
                      <span className={styles.inqTypeBadge}>{inq.inquiryType}</span>
                    </div>

                    <div className={styles.inqStatusControl}>
                      <label className={styles.statusLabel}>Status:</label>
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleUpdateInquiryStatus(
                            inq.id,
                            e.target.value as "new" | "contacted" | "closed"
                          )
                        }
                        className={`${styles.inqStatusSelect} ${
                          styles[`select_${inq.status}`]
                        }`}
                      >
                        <option value="new">🟡 New Lead</option>
                        <option value="contacted">🔵 Contacted</option>
                        <option value="closed">🟢 Resolved / Closed</option>
                      </select>

                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className={styles.inqDeleteBtn}
                        title="Delete Inquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Contact Details Bar */}
                  <div className={styles.leadContactBar}>
                    <div className={styles.contactItem}>
                      <Phone size={14} color="#16a34a" />
                      <a href={`tel:${inq.phone}`}>{inq.phone}</a>
                    </div>
                    {inq.email && (
                      <div className={styles.contactItem}>
                        <Mail size={14} color="#2563eb" />
                        <a href={`mailto:${inq.email}`}>{inq.email}</a>
                      </div>
                    )}
                    <div className={styles.contactItem}>
                      <MapPin size={14} color="#ca8a04" />
                      <span>{inq.city}</span>
                    </div>
                    <div className={styles.contactItem}>
                      <Clock size={14} color="#64748b" />
                      <span>{new Date(inq.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Inquiry Message */}
                  <div className={styles.inqMessageBody}>
                    <p>{inq.message}</p>
                  </div>

                  {/* Action Bar */}
                  <div className={styles.inqActionBar}>
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                        inq.name
                      )},%20this%20is%20Monagodu%20501%20commercial%20team%20regarding%20your%20inquiry%20for%20${encodeURIComponent(
                        inq.inquiryType
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.inqWhatsAppBtn}
                    >
                      <MessageSquare size={15} /> Chat on WhatsApp
                    </a>

                    <a href={`tel:${inq.phone}`} className={styles.inqCallBtn}>
                      <Phone size={15} /> Call Lead
                    </a>

                    {inq.status === "new" && (
                      <button
                        onClick={() => handleUpdateInquiryStatus(inq.id, "contacted")}
                        className={styles.markContactedBtn}
                      >
                        <CheckCircle2 size={15} /> Mark as Contacted
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filteredInquiries.length === 0 && (
                <div className={styles.noResultsBox}>
                  <Inbox size={48} color="#94a3b8" />
                  <h3>No Inquiries in this Category</h3>
                  <p>Check other tabs or submit a test message on the Contact Us page.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── ADD / EDIT PRODUCT MODAL ─────────────────────────────────────── */}
      {isProductModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>
                  {editingProduct ? "Edit Product" : "Add New FMCG Product"}
                </h3>
                <p className={styles.modalSub}>
                  Changes will publish immediately to the live website catalog.
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className={styles.closeModalBtn}
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className={styles.formAlert}>
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className={styles.modalForm}>
              <div className={styles.formRow2}>
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Monagodu 501 Citrus Dishwash"
                    value={pName}
                    onChange={(e) => setPName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Badge & Color Picker */}
              <div className={styles.formRow2}>
                <div className="form-group">
                  <label className="form-label">Badge Tagline</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 99.9% Germ Shield, Active Lemon"
                    value={pBadge}
                    onChange={(e) => setPBadge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Badge Accent Color</label>
                  <div className={styles.colorPickerRow}>
                    {PRESET_BADGE_COLORS.map((c) => (
                      <button
                        type="button"
                        key={c.hex}
                        onClick={() => setPBadgeColor(c.hex)}
                        className={`${styles.colorDot} ${
                          pBadgeColor === c.hex ? styles.colorDotActive : ""
                        }`}
                        style={{ background: c.hex }}
                        title={c.name}
                      />
                    ))}
                    <input
                      type="color"
                      value={pBadgeColor}
                      onChange={(e) => setPBadgeColor(e.target.value)}
                      className={styles.nativeColorInput}
                      title="Custom color"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="form-group">
                <label className="form-label">Product Image *</label>
                <div className={styles.imageUploadArea}>
                  <div className={styles.imagePreviewWrap}>
                    <Image
                      src={pImg}
                      alt="Preview"
                      width={120}
                      height={90}
                      className={styles.imagePreview}
                      unoptimized
                    />
                  </div>

                  <div className={styles.uploadControls}>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileUpload}
                      accept="image/*"
                      style={{ display: "none" }}
                    />

                    <button
                      type="button"
                      disabled={uploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className={styles.uploadFileBtn}
                    >
                      <Upload size={16} />
                      {uploadingImage ? "Uploading to Server..." : "Upload Photo from Computer"}
                    </button>

                    <div className={styles.imageOrRow}>
                      <span>or enter image URL / asset path:</span>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="/assets/dishwash_liquid.jpg or /uploads/..."
                        value={pImg}
                        onChange={(e) => setPImg(e.target.value)}
                        style={{ marginTop: "0.35rem" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Product Description *</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Detailed commercial description of the product benefits and applications..."
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formRow2}>
                <div className="form-group">
                  <label className="form-label">Pack Sizes / Weights (comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="250ml, 500ml, 1L, 5L Can"
                    value={pWeights}
                    onChange={(e) => setPWeights(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Formulation / Chemical Grade</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Active Bio-Enzyme with Optical Brightener"
                    value={pFormulation}
                    onChange={(e) => setPFormulation(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Key Features & Bullet Points (one per line)</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Instant grease breakdown&#10;Gentle on hands with balanced neutral pH&#10;High-foaming concentrated formulation"
                  value={pFeatures}
                  onChange={(e) => setPFeatures(e.target.value)}
                />
              </div>

              <div className={styles.checkboxRow}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={pPhBalanced}
                    onChange={(e) => setPPhBalanced(e.target.checked)}
                  />
                  <span>Formulation is pH-Balanced & Dermatologically Tested</span>
                </label>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? "Save & Update Product" : "Publish Product Live"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
