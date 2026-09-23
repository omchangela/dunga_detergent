import { neon, neonConfig } from "@neondatabase/serverless";
import { ProductData, InquiryData, getProducts as getLocalProducts, saveProducts as saveLocalProducts, getInquiries as getLocalInquiries, saveInquiries as saveLocalInquiries } from "./storage";

// Cache database connection
const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

export function isNeonConfigured(): boolean {
  return Boolean(databaseUrl && databaseUrl.trim().length > 0);
}

function getSql() {
  if (!databaseUrl) return null;
  return neon(databaseUrl);
}

let isInitialized = false;

export async function ensureTablesExist() {
  if (!isNeonConfigured() || isInitialized) return;

  const sql = getSql();
  if (!sql) return;

  try {
    // 1. Create Products Table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        badge VARCHAR(100),
        badge_color VARCHAR(50),
        img TEXT NOT NULL,
        description TEXT NOT NULL,
        features JSONB DEFAULT '[]'::jsonb,
        weights JSONB DEFAULT '[]'::jsonb,
        formulation TEXT,
        ph_balanced BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create Inquiries Table
    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        city VARCHAR(255),
        inquiry_type VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Auto-seed products if table is empty
    const countResult = await sql`SELECT count(*)::int as total FROM products;`;
    const count = countResult[0]?.total || 0;

    if (count === 0) {
      const localProducts = getLocalProducts();
      for (const p of localProducts) {
        await sql`
          INSERT INTO products (name, category, badge, badge_color, img, description, features, weights, formulation, ph_balanced)
          VALUES (
            ${p.name},
            ${p.category},
            ${p.badge},
            ${p.badgeColor || '#16a34a'},
            ${p.img},
            ${p.desc},
            ${JSON.stringify(p.features)},
            ${JSON.stringify(p.weights)},
            ${p.formulation || null},
            ${Boolean(p.phBalanced)}
          );
        `;
      }
      console.log(`[Neon DB] Auto-seeded ${localProducts.length} initial FMCG products into PostgreSQL.`);
    }

    isInitialized = true;
  } catch (error) {
    console.error("[Neon DB] Migration / Table init error:", error);
  }
}

// ─── Products Operations ───────────────────────────────────────────────────────
export async function getAllProducts(): Promise<ProductData[]> {
  if (!isNeonConfigured()) {
    return getLocalProducts();
  }

  await ensureTablesExist();
  const sql = getSql();
  if (!sql) return getLocalProducts();

  try {
    const rows = await sql`
      SELECT id, name, category, badge, badge_color as "badgeColor", img, description as "desc", features, weights, formulation, ph_balanced as "phBalanced"
      FROM products
      ORDER BY id ASC;
    `;

    return rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      badge: r.badge,
      badgeColor: r.badgeColor,
      img: r.img,
      desc: r.desc,
      features: Array.isArray(r.features) ? r.features : (typeof r.features === "string" ? JSON.parse(r.features) : []),
      weights: Array.isArray(r.weights) ? r.weights : (typeof r.weights === "string" ? JSON.parse(r.weights) : []),
      formulation: r.formulation,
      phBalanced: Boolean(r.phBalanced),
    }));
  } catch (error) {
    console.error("[Neon DB] Failed to fetch products, falling back to local:", error);
    return getLocalProducts();
  }
}

export async function createProduct(product: Omit<ProductData, "id">): Promise<ProductData> {
  if (!isNeonConfigured()) {
    const local = getLocalProducts();
    const newId = local.length > 0 ? Math.max(...local.map((p) => p.id)) + 1 : 1;
    const newProd = { ...product, id: newId };
    local.unshift(newProd);
    saveLocalProducts(local);
    return newProd;
  }

  await ensureTablesExist();
  const sql = getSql();
  if (!sql) throw new Error("Database not connected");

  const rows = await sql`
    INSERT INTO products (name, category, badge, badge_color, img, description, features, weights, formulation, ph_balanced)
    VALUES (
      ${product.name},
      ${product.category},
      ${product.badge},
      ${product.badgeColor || '#16a34a'},
      ${product.img},
      ${product.desc},
      ${JSON.stringify(product.features)},
      ${JSON.stringify(product.weights)},
      ${product.formulation || null},
      ${Boolean(product.phBalanced)}
    )
    RETURNING id, name, category, badge, badge_color as "badgeColor", img, description as "desc", features, weights, formulation, ph_balanced as "phBalanced";
  `;

  const r = rows[0];
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    badge: r.badge,
    badgeColor: r.badgeColor,
    img: r.img,
    desc: r.desc,
    features: Array.isArray(r.features) ? r.features : (typeof r.features === "string" ? JSON.parse(r.features) : []),
    weights: Array.isArray(r.weights) ? r.weights : (typeof r.weights === "string" ? JSON.parse(r.weights) : []),
    formulation: r.formulation,
    phBalanced: Boolean(r.phBalanced),
  };
}

export async function updateProduct(id: number, updates: Partial<ProductData>): Promise<ProductData | null> {
  if (!isNeonConfigured()) {
    const local = getLocalProducts();
    const idx = local.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    const updated = { ...local[idx], ...updates, id };
    local[idx] = updated;
    saveLocalProducts(local);
    return updated;
  }

  await ensureTablesExist();
  const sql = getSql();
  if (!sql) return null;

  const rows = await sql`
    UPDATE products
    SET
      name = COALESCE(${updates.name}, name),
      category = COALESCE(${updates.category}, category),
      badge = COALESCE(${updates.badge}, badge),
      badge_color = COALESCE(${updates.badgeColor}, badge_color),
      img = COALESCE(${updates.img}, img),
      description = COALESCE(${updates.desc}, description),
      features = COALESCE(${updates.features ? JSON.stringify(updates.features) : null}::jsonb, features),
      weights = COALESCE(${updates.weights ? JSON.stringify(updates.weights) : null}::jsonb, weights),
      formulation = COALESCE(${updates.formulation}, formulation),
      ph_balanced = COALESCE(${updates.phBalanced}, ph_balanced)
    WHERE id = ${id}
    RETURNING id, name, category, badge, badge_color as "badgeColor", img, description as "desc", features, weights, formulation, ph_balanced as "phBalanced";
  `;

  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    badge: r.badge,
    badgeColor: r.badgeColor,
    img: r.img,
    desc: r.desc,
    features: Array.isArray(r.features) ? r.features : (typeof r.features === "string" ? JSON.parse(r.features) : []),
    weights: Array.isArray(r.weights) ? r.weights : (typeof r.weights === "string" ? JSON.parse(r.weights) : []),
    formulation: r.formulation,
    phBalanced: Boolean(r.phBalanced),
  };
}

export async function deleteProduct(id: number): Promise<boolean> {
  if (!isNeonConfigured()) {
    const local = getLocalProducts();
    const filtered = local.filter((p) => p.id !== id);
    if (filtered.length === local.length) return false;
    saveLocalProducts(filtered);
    return true;
  }

  await ensureTablesExist();
  const sql = getSql();
  if (!sql) return false;

  const rows = await sql`DELETE FROM products WHERE id = ${id} RETURNING id;`;
  return rows.length > 0;
}

// ─── Inquiries CRM Operations ──────────────────────────────────────────────────
export async function getAllInquiries(): Promise<InquiryData[]> {
  if (!isNeonConfigured()) {
    return getLocalInquiries();
  }

  await ensureTablesExist();
  const sql = getSql();
  if (!sql) return getLocalInquiries();

  try {
    const rows = await sql`
      SELECT id, name, phone, email, city, inquiry_type as "inquiryType", message, status, created_at as "createdAt"
      FROM inquiries
      ORDER BY created_at DESC;
    `;

    return rows.map((r: any) => ({
      id: r.id,
      name: r.name,
      phone: r.phone,
      email: r.email,
      city: r.city,
      inquiryType: r.inquiryType,
      message: r.message,
      status: r.status,
      createdAt: new Date(r.createdAt).toISOString(),
    }));
  } catch (error) {
    console.error("[Neon DB] Failed to fetch inquiries, falling back to local:", error);
    return getLocalInquiries();
  }
}

export async function createInquiry(inquiry: Omit<InquiryData, "id" | "createdAt" | "status">): Promise<InquiryData> {
  const newId = `inq-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
  const now = new Date().toISOString();

  if (!isNeonConfigured()) {
    const local = getLocalInquiries();
    const newInq: InquiryData = {
      ...inquiry,
      id: newId,
      status: "new",
      createdAt: now,
    };
    local.unshift(newInq);
    saveLocalInquiries(local);
    return newInq;
  }

  await ensureTablesExist();
  const sql = getSql();
  if (!sql) throw new Error("Database not connected");

  const rows = await sql`
    INSERT INTO inquiries (id, name, phone, email, city, inquiry_type, message, status, created_at)
    VALUES (
      ${newId},
      ${inquiry.name},
      ${inquiry.phone},
      ${inquiry.email || null},
      ${inquiry.city || 'Unspecified'},
      ${inquiry.inquiryType},
      ${inquiry.message},
      'new',
      ${now}
    )
    RETURNING id, name, phone, email, city, inquiry_type as "inquiryType", message, status, created_at as "createdAt";
  `;

  const r = rows[0];
  return {
    id: r.id,
    name: r.name,
    phone: r.phone,
    email: r.email,
    city: r.city,
    inquiryType: r.inquiryType,
    message: r.message,
    status: r.status,
    createdAt: new Date(r.createdAt).toISOString(),
  };
}

export async function updateInquiryStatus(id: string, status: "new" | "contacted" | "closed"): Promise<boolean> {
  if (!isNeonConfigured()) {
    const local = getLocalInquiries();
    const idx = local.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    local[idx].status = status;
    saveLocalInquiries(local);
    return true;
  }

  await ensureTablesExist();
  const sql = getSql();
  if (!sql) return false;

  const rows = await sql`
    UPDATE inquiries
    SET status = ${status}
    WHERE id = ${id}
    RETURNING id;
  `;

  return rows.length > 0;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  if (!isNeonConfigured()) {
    const local = getLocalInquiries();
    const filtered = local.filter((i) => i.id !== id);
    if (filtered.length === local.length) return false;
    saveLocalInquiries(filtered);
    return true;
  }

  await ensureTablesExist();
  const sql = getSql();
  if (!sql) return false;

  const rows = await sql`DELETE FROM inquiries WHERE id = ${id} RETURNING id;`;
  return rows.length > 0;
}
