import fs from "fs";
import path from "path";

export interface ProductData {
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

export interface InquiryData {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  inquiryType: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

const dataDir = path.join(process.cwd(), "src", "data");
const productsFile = path.join(dataDir, "products.json");
const inquiriesFile = path.join(dataDir, "inquiries.json");

function ensureDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// ─── Products Storage ──────────────────────────────────────────────────────────
export function getProducts(): ProductData[] {
  ensureDirectory();
  try {
    if (!fs.existsSync(productsFile)) {
      return [];
    }
    const data = fs.readFileSync(productsFile, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
}

export function saveProducts(products: ProductData[]): boolean {
  ensureDirectory();
  try {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving products:", error);
    return false;
  }
}

// ─── Inquiries Storage ────────────────────────────────────────────────────────
export function getInquiries(): InquiryData[] {
  ensureDirectory();
  try {
    if (!fs.existsSync(inquiriesFile)) {
      return [];
    }
    const data = fs.readFileSync(inquiriesFile, "utf-8");
    const list: InquiryData[] = JSON.parse(data);
    // Sort descending by creation date
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error reading inquiries:", error);
    return [];
  }
}

export function saveInquiries(inquiries: InquiryData[]): boolean {
  ensureDirectory();
  try {
    fs.writeFileSync(inquiriesFile, JSON.stringify(inquiries, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving inquiries:", error);
    return false;
  }
}
