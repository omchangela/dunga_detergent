"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import styles from "./page.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFillDemo = () => {
    setEmail("admin@monagodu501.com");
    setPassword("admin123");
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid credentials. Please verify.");
        setLoading(false);
        return;
      }

      // Store in localStorage for client-side state
      localStorage.setItem("mng_admin_user", JSON.stringify(data.user));
      router.push("/admin");
    } catch {
      setError("Network or server connection failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Background Ambience */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <div className={styles.loginCard}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <div className={styles.logoBadge}>
            <Image
              src="/assets/logo.png"
              alt="Monagodu 501"
              width={140}
              height={44}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div className={styles.portalTag}>
            <ShieldCheck size={14} color="#16a34a" /> Enterprise Administration
          </div>
          <h1 className={styles.loginTitle}>Management Portal</h1>
          <p className={styles.loginDesc}>
            Log in to manage product catalogs, inventory formulations, and real-time customer inquiries.
          </p>
        </div>

        {/* Quick Fill Credentials Banner */}
        <div className={styles.demoBox}>
          <div className={styles.demoHeader}>
            <Sparkles size={14} color="#15803d" />
            <span>Authorized Admin Access</span>
          </div>
          <p className={styles.demoText}>
            Click below to auto-fill the administrator credentials:
          </p>
          <button
            type="button"
            onClick={handleFillDemo}
            className={styles.fillDemoBtn}
          >
            Auto-fill: <strong>admin@monagodu501.com</strong> / <strong>admin123</strong>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className={styles.errorAlert}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Administrator Email</label>
            <div className={styles.inputWrap}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                className={`form-input ${styles.hasIcon}`}
                placeholder="admin@monagodu501.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Access Password</label>
            <div className={styles.inputWrap}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type={showPassword ? "text" : "password"}
                className={`form-input ${styles.hasIcon}`}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary ${styles.submitBtn}`}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                Sign In to Console <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className={styles.loginFooter}>
          <div className={styles.securitySeal}>
            <CheckCircle2 size={13} color="#16a34a" /> 256-Bit Encrypted Admin Session
          </div>
          <Link href="/" className={styles.backLink}>
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
