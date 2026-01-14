"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/quizzes", label: "Kuis" },
  { href: "/leaderboard", label: "Papan Peringkat" },
  { href: "/about", label: "Tentang" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-out
        ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-700 transition-colors duration-300">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Kuisku
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Masuk
            </Button>
            <Button variant="primary" size="sm">
              Mulai Sekarang
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          fixed inset-0 top-16 z-40
          transition-all duration-300 ease-out
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
          onClick={toggleMenu}
        />

        {/* Menu Content */}
        <div
          className={`
            relative bg-white/95 backdrop-blur-md
            border-b border-slate-200
            transform transition-transform duration-300 ease-out
            ${isOpen ? "translate-y-0" : "-translate-y-4"}
          `}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={toggleMenu}
                className="block py-3 px-4 text-lg font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <Button variant="secondary" className="w-full">
                Masuk
              </Button>
              <Button variant="primary" className="w-full">
                Mulai Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
