"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap, LogOut } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { createClient } from "@/utils/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/quizzes", label: "Kuis" },
  { href: "/leaderboard", label: "Papan Peringkat" },
  { href: "/about", label: "Tentang" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // Get user display info
  const getDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  };

  const getAvatarUrl = () => {
    return user?.user_metadata?.avatar_url || null;
  };

  const initials = getDisplayName()
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
          <Link href="/" className="flex items-center gap-2 group">
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
            {!isLoading && (
              <>
                {user ? (
                  // Logged in - Show Dashboard Link & Profile
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost" size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-slate-100 transition-colors duration-300"
                      >
                        {getAvatarUrl() ? (
                          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-indigo-100">
                            <Image
                              src={getAvatarUrl()!}
                              alt={getDisplayName()}
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center ring-2 ring-indigo-100">
                            <span className="text-xs font-bold text-white">
                              {initials}
                            </span>
                          </div>
                        )}
                        <span className="text-sm font-medium text-slate-700">
                          {getDisplayName()}
                        </span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                        title="Keluar"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  // Not logged in - Show Login Button
                  <Link href="/login">
                    <Button variant="primary" size="sm">
                      Masuk dengan Google
                    </Button>
                  </Link>
                )}
              </>
            )}
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
              {!isLoading && (
                <>
                  {user ? (
                    // Logged in - Show Profile & Logout
                    <>
                      <Link href="/dashboard" onClick={toggleMenu}>
                        <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
                          {getAvatarUrl() ? (
                            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-200">
                              <Image
                                src={getAvatarUrl()!}
                                alt={getDisplayName()}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center ring-2 ring-indigo-200">
                              <span className="text-sm font-bold text-white">
                                {initials}
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">
                              {getDisplayName()}
                            </p>
                            <p className="text-xs text-slate-600">
                              Lihat dashboard
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Button
                        variant="ghost"
                        className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          toggleMenu();
                          handleSignOut();
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </Button>
                    </>
                  ) : (
                    // Not logged in - Show Login Button
                    <Link href="/login" onClick={toggleMenu}>
                      <Button variant="primary" className="w-full">
                        Masuk dengan Google
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
