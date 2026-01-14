"use client";

import { ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-100/30 to-violet-100/30 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-8 animate-fade-in">
            <Trophy className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">
              Bergabung dengan 10.000+ pelajar di Indonesia
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Kuasai Pengetahuanmu,{" "}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Raih Peringkat Tertinggi
              </span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-indigo-200/50 -z-10 -rotate-1" />
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tantang dirimu dengan kuis yang menarik, bersaing dengan teman-teman,
            dan pantau perkembanganmu di papan peringkat. Belajar tidak pernah
            semenyenangkan ini.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button variant="primary" size="lg" className="group">
                Mulai Kuis Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="secondary" size="lg">
                <Trophy className="w-5 h-5" />
                Lihat Papan Peringkat
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-16 border-t border-slate-200/60">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Pengguna Aktif" },
                { value: "500+", label: "Kuis" },
                { value: "50K+", label: "Pertanyaan" },
                { value: "99%", label: "Kepuasan" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
