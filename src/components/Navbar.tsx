"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5" : ""
      }`}
    >
      {/* Logo / Monogram */}
      <Link href="/" className="hover-trigger group flex items-center gap-3">
        <div className="w-9 h-9 rounded-full border border-cyan-400/50 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
          <span className="text-cyan-300 text-xs font-bold font-mono">AA</span>
        </div>
        <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors tracking-widest uppercase">
          Amulya
        </span>
      </Link>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="hover-trigger text-sm text-white/40 hover:text-white transition-colors tracking-widest uppercase font-light"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <Link
        href="mailto:amulyaa0612@gmail.com"
        className="hover-trigger hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-sm text-white/60 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-950/20 transition-all"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Available
      </Link>
    </motion.header>
  );
}
