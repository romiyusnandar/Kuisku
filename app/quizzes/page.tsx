import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Trophy, BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
};

export default async function QuizzesPage() {
  const supabase = await createClient();

  // Fetch all quizzes
  const { data: quizzes, error } = await supabase
    .from("quizzes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden py-20 px-4">
        {/* Background - Matching Landing Page Style */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-100/30 to-violet-100/30 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                Pilih & Mainkan
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              Jelajahi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Kuis Seru
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Pilih kuis favoritmu dan mulai tantang pengetahuanmu sekarang!
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-2xl mx-auto">
              <p className="text-red-600 font-medium">
                Gagal memuat kuis. Silakan refresh halaman.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!error && (!quizzes || quizzes.length === 0) && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 p-12 text-center max-w-2xl mx-auto border border-white/60">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-slate-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Belum Ada Kuis Tersedia
              </h2>
              <p className="text-slate-600">
                Kuis akan segera ditambahkan. Pantau terus!
              </p>
            </div>
          )}

          {/* Quiz Grid */}
          {quizzes && quizzes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Link key={quiz.id} href={`/quiz/${quiz.id}`}>
                  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-white/60 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full">
                    {/* Category Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full mb-4">
                      <BookOpen className="w-3 h-3 text-indigo-600" />
                      <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide">
                        {quiz.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                      {quiz.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                      {quiz.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span>~5 menit</span>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:gap-3 transition-all duration-300">
                        <span>Mulai</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          {quizzes && quizzes.length > 0 && (
            <div className="mt-16 text-center">
              <p className="text-slate-600 mb-4">
                Kuis baru akan ditambahkan secara berkala!
              </p>
              <Link href="/dashboard">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-full hover:bg-slate-200 transition-colors duration-300">
                  Kembali ke Dashboard
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
