"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ShieldCheck, Sparkles, CheckCircle2, Award } from "lucide-react";
import styles from "./Hero3DStage.module.css";

export default function Hero3DStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial 3D reveal entrance timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        centerCardRef.current,
        { scale: 0.8, y: 80, opacity: 0, rotationX: 15 },
        { scale: 1, y: 0, opacity: 1, rotationX: 0, duration: 1.2 }
      )
        .fromTo(
          [leftCardRef.current, rightCardRef.current],
          { scale: 0.75, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          "-=0.8"
        )
        .fromTo(
          [badge1Ref.current, badge2Ref.current, badge3Ref.current],
          { scale: 0, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.5"
        );

      // 2. Continuous 3D floating physics with distinct timing
      gsap.to(centerCardRef.current, {
        y: -14,
        rotationZ: 1.2,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(leftCardRef.current, {
        y: -10,
        rotationZ: -8,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.4,
      });

      gsap.to(rightCardRef.current, {
        y: -12,
        rotationZ: 9,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.8,
      });

      gsap.to(badge1Ref.current, {
        y: -8,
        x: 4,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(badge2Ref.current, {
        y: -9,
        x: -4,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });

      gsap.to(badge3Ref.current, {
        y: -7,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.3,
      });

      // 3. Mouse Parallax in 3D Space
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

        gsap.to(centerCardRef.current, {
          x: x * 15,
          y: y * 15 - 5,
          rotationY: x * 8,
          rotationX: -y * 8,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(leftCardRef.current, {
          x: x * 25,
          y: y * 25,
          rotationY: x * 12,
          rotationX: -y * 10,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(rightCardRef.current, {
          x: x * 30,
          y: y * 30,
          rotationY: x * 14,
          rotationX: -y * 12,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to([badge1Ref.current, badge2Ref.current, badge3Ref.current], {
          x: x * 40,
          y: y * 40,
          duration: 1.2,
          ease: "power2.out",
        });
      };

      const el = containerRef.current;
      if (el) {
        window.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.stageContainer}>
      {/* Ambient Lighting & Depth Glows */}
      <div className={styles.glowAura} />
      <div className={styles.glowCyan} />

      {/* Floating 3D Bubble Refractions */}
      <div className={`${styles.bubble} ${styles.bubble1}`} />
      <div className={`${styles.bubble} ${styles.bubble2}`} />
      <div className={`${styles.bubble} ${styles.bubble3}`} />

      {/* 3D Circular Glass Pedestal Base */}
      <div className={styles.pedestalBase}>
        <div className={styles.pedestalRing} />
      </div>

      {/* ── Left Product: Cool Mint Soap ── */}
      <div ref={leftCardRef} className={`${styles.card3D} ${styles.cardLeft}`}>
        <div className={styles.cardGlass}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/cool_mint_soap.jpg"
            alt="AVD Cool Mint Soap"
            className={styles.img}
          />
          <div className={styles.productPill}>
            <span>Cool Mint Soap</span>
          </div>
        </div>
      </div>

      {/* ── Right Product: Rose Soap ── */}
      <div ref={rightCardRef} className={`${styles.card3D} ${styles.cardRight}`}>
        <div className={styles.cardGlass}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/rose_soap.jpg"
            alt="AVD Rose Soap"
            className={styles.img}
          />
          <div className={styles.productPill}>
            <span>AVD Rose Soap</span>
          </div>
        </div>
      </div>

      {/* ── Centerpiece Hero Product: Monagodu 501 Dishwash Liquid ── */}
      <div ref={centerCardRef} className={`${styles.card3D} ${styles.cardCenter}`}>
        <div className={styles.cardGlassCenter}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/dishwash_liquid.jpg"
            alt="Monagodu 501 Dishwash Liquid"
            className={styles.imgCenter}
          />
          <div className={styles.centerBadgeOverlay}>
            <span className={styles.centerBrand}>Monagodu 501</span>
            <span className={styles.centerTitle}>Dishwash Liquid</span>
          </div>
        </div>
      </div>

      {/* ── Floating Orbiting 3D Badges ── */}
      {/* Badge 1: 99.9% Germ Shield */}
      <div ref={badge1Ref} className={`${styles.orbitBadge} ${styles.orbit1}`}>
        <div className={styles.badgeIconGreen}>
          <ShieldCheck size={20} color="#16a34a" />
        </div>
        <div className={styles.badgeText}>
          <strong>99.9% Germ Free</strong>
          <span>Clinically Proven</span>
        </div>
      </div>

      {/* Badge 2: Active Lemon Power */}
      <div ref={badge2Ref} className={`${styles.orbitBadge} ${styles.orbit2}`}>
        <div className={styles.badgeIconAmber}>
          <Sparkles size={18} color="#d97706" />
        </div>
        <div className={styles.badgeText}>
          <strong>Active Lemon</strong>
          <span>Instant Grease Cut</span>
        </div>
      </div>

      {/* Badge 3: ISO 9001 Certified */}
      <div ref={badge3Ref} className={`${styles.orbitBadge} ${styles.orbit3}`}>
        <div className={styles.badgeIconBlue}>
          <Award size={18} color="#2563eb" />
        </div>
        <div className={styles.badgeText}>
          <strong>ISO 9001:2015</strong>
          <span>Certified Quality</span>
        </div>
      </div>
    </div>
  );
}
