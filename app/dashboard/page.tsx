import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { User, Trophy, Target, Award } from "lucide-react";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Extract user metadata
  const avatarUrl = user.user_metadata?.avatar_url || null;
  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Pengguna";
  const email = user.email || "";

  // Generate initials for placeholder avatar
  const initials = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative min-h-screen overflow-hidden py-12 px-4">
      {/* Abstract Gradient Background - Matching Landing Page */}
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

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-4">
              <Trophy className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                Dashboard Pemain
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Halo,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                {fullName}
              </span>!
            </h1>
          </div>
          <SignOutButton />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 p-8 border border-white/60 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  {avatarUrl ? (
                    <div className="w-28 h-28 rounded-full ring-4 ring-indigo-100 overflow-hidden shadow-lg group-hover:ring-indigo-200 transition-all duration-300">
                      <Image
                        src={avatarUrl}
                        alt={fullName}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-full ring-4 ring-indigo-100 bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg group-hover:ring-indigo-200 group-hover:scale-105 transition-all duration-300">
                      <span className="text-4xl font-bold text-white">
                        {initials}
                      </span>
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-7 h-7 rounded-full border-4 border-white shadow-md animate-pulse" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mt-6 text-center">
                  {fullName}
                </h2>
                <p className="text-sm text-slate-500 mt-2 text-center">
                  {email}
                </p>
              </div>

              {/* Stats Preview */}
              <div className="space-y-4 pt-6 border-t border-slate-200/60">
                <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-colors duration-300">
                  <span className="text-slate-700 flex items-center gap-3 font-medium">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <Trophy className="w-5 h-5 text-amber-600" />
                    </div>
                    Total Kuis
                  </span>
                  <span className="text-xl font-bold text-slate-900">0</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl hover:bg-indigo-50 transition-colors duration-300">
                  <span className="text-slate-700 flex items-center gap-3 font-medium">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Target className="w-5 h-5 text-indigo-600" />
                    </div>
                    Skor Rata-rata
                  </span>
                  <span className="text-xl font-bold text-slate-900">-</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-violet-50/50 rounded-xl hover:bg-violet-50 transition-colors duration-300">
                  <span className="text-slate-700 flex items-center gap-3 font-medium">
                    <div className="p-2 bg-violet-100 rounded-lg">
                      <Award className="w-5 h-5 text-violet-600" />
                    </div>
                    Peringkat
                  </span>
                  <span className="text-xl font-bold text-slate-900">-</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-10 border border-white/60 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                  Aktivitas Kuis
                </h2>
              </div>

              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <User className="w-12 h-12 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Belum Ada Kuis yang Diambil
                </h3>
                <p className="text-slate-600 text-center max-w-md mb-8 text-lg leading-relaxed">
                  Mulai perjalanan belajarmu dengan mengikuti kuis pertamamu.
                  Tantang dirimu dan raih peringkat tertinggi!
                </p>
                <a
                  href="/quizzes"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Trophy className="w-6 h-6" />
                  Jelajahi Kuis Sekarang
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <a
                href="/quizzes"
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 p-7 border border-white/60 hover:border-indigo-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-xl group-hover:from-indigo-200 group-hover:to-indigo-100 transition-all duration-300 shadow-sm">
                    <Trophy className="w-7 h-7 text-indigo-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Kuis Tersedia
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Jelajahi berbagai kuis menarik dan tingkatkan pengetahuanmu
                </p>
              </a>

              <a
                href="/leaderboard"
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-slate-200/50 p-7 border border-white/60 hover:border-violet-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-violet-100 to-violet-50 rounded-xl group-hover:from-violet-200 group-hover:to-violet-100 transition-all duration-300 shadow-sm">
                    <Award className="w-7 h-7 text-violet-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Papan Peringkat
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Lihat posisimu di ranking global dan bersaing dengan pemain lain
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
