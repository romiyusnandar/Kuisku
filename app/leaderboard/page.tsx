import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Trophy, Medal, Award, Crown, Home, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";

type LeaderboardEntry = {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  created_at: string;
  player_name: string | null;
  player_avatar: string | null;
};

export default async function LeaderboardPage() {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch top 10 scores from quiz_results
  // Now with player_name and player_avatar directly in the table (snapshot approach)
  const { data: leaderboardData, error } = await supabase
    .from("quiz_results")
    .select("id, user_id, quiz_id, score, created_at, player_name, player_avatar")
    .order("score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(10);

  const topThree = leaderboardData?.slice(0, 3) || [];
  const restOfList = leaderboardData?.slice(3) || [];

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-8 h-8 text-amber-500" />;
    if (index === 1) return <Medal className="w-8 h-8 text-slate-400" />;
    if (index === 2) return <Medal className="w-8 h-8 text-amber-700" />;
    return null;
  };

  const getRankColor = (index: number) => {
    if (index === 0) return "from-amber-400 to-amber-600";
    if (index === 1) return "from-slate-300 to-slate-500";
    if (index === 2) return "from-amber-600 to-amber-800";
    return "from-indigo-500 to-violet-600";
  };

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

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Top 10 Pemain
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
              Papan Peringkat
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Raih posisi teratasmu dan tunjukkan kemampuanmu!
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center max-w-2xl mx-auto">
              <p className="text-red-600 font-medium">
                Gagal memuat leaderboard. Silakan refresh halaman.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!error && (!leaderboardData || leaderboardData.length === 0) && (
            <div className="bg-white rounded-3xl shadow-xl p-16 text-center max-w-lg mx-auto border border-slate-100">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Belum Ada Skor
              </h2>
              <p className="text-slate-600 mb-8">
                Jadilah yang pertama! Mulai kuis sekarang.
              </p>
              <Link href="/quizzes">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 shadow-lg">
                  <Trophy className="w-5 h-5" />
                  Mulai Kuis
                </button>
              </Link>
            </div>
          )}

          {/* Leaderboard Content */}
          {leaderboardData && leaderboardData.length > 0 && (
            <>
              {/* Top 3 Podium */}
              {topThree.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-end justify-center gap-6 md:gap-8">
                    {/* Second Place */}
                    {topThree[1] && (
                      <div className="flex flex-col items-center w-32 md:w-36">
                        <div className="relative mb-6">
                          {topThree[1].player_avatar ? (
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-4 ring-slate-300 overflow-hidden shadow-xl">
                              <Image
                                src={topThree[1].player_avatar}
                                alt={topThree[1].player_name || "User"}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-4 ring-slate-300 bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-xl">
                              <span className="text-2xl md:text-3xl font-bold text-white">
                                {topThree[1].player_name?.[0]?.toUpperCase() || "A"}
                              </span>
                            </div>
                          )}
                          <div className="absolute -top-2 -right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200">
                            <span className="text-lg font-bold text-slate-600">2</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-4 w-full border border-slate-200">
                          <div className="text-sm font-semibold text-slate-900 truncate mb-2">
                            {topThree[1].player_name || "Anonymous"}
                          </div>
                          <div className="text-2xl font-bold text-slate-700">
                            {topThree[1].score}
                          </div>
                        </div>
                        <div className="w-full h-24 md:h-28 bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-2xl mt-4" />
                      </div>
                    )}

                    {/* First Place */}
                    {topThree[0] && (
                      <div className="flex flex-col items-center w-36 md:w-40 -mt-6">
                        <div className="relative mb-6">
                          {topThree[0].player_avatar ? (
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full ring-4 ring-amber-400 overflow-hidden shadow-2xl">
                              <Image
                                src={topThree[0].player_avatar}
                                alt={topThree[0].player_name || "User"}
                                width={112}
                                height={112}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full ring-4 ring-amber-400 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl">
                              <span className="text-3xl md:text-4xl font-bold text-white">
                                {topThree[0].player_name?.[0]?.toUpperCase() || "A"}
                              </span>
                            </div>
                          )}
                          <div className="absolute -top-3 -right-3 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-amber-300">
                            <Crown className="w-6 h-6 text-amber-500" />
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-2xl p-5 w-full border-2 border-amber-200">
                          <div className="text-sm font-semibold text-slate-900 truncate mb-2">
                            {topThree[0].player_name || "Anonymous"}
                          </div>
                          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
                            {topThree[0].score}
                          </div>
                        </div>
                        <div className="w-full h-32 md:h-36 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-2xl mt-4 shadow-xl" />
                      </div>
                    )}

                    {/* Third Place */}
                    {topThree[2] && (
                      <div className="flex flex-col items-center w-32 md:w-36">
                        <div className="relative mb-6">
                          {topThree[2].player_avatar ? (
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-4 ring-amber-700 overflow-hidden shadow-xl">
                              <Image
                                src={topThree[2].player_avatar}
                                alt={topThree[2].player_name || "User"}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-4 ring-amber-700 bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-xl">
                              <span className="text-2xl md:text-3xl font-bold text-white">
                                {topThree[2].player_name?.[0]?.toUpperCase() || "A"}
                              </span>
                            </div>
                          )}
                          <div className="absolute -top-2 -right-2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-amber-700">
                            <span className="text-lg font-bold text-amber-800">3</span>
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-4 w-full border border-amber-700/20">
                          <div className="text-sm font-semibold text-slate-900 truncate mb-2">
                            {topThree[2].player_name || "Anonymous"}
                          </div>
                          <div className="text-2xl font-bold text-slate-700">
                            {topThree[2].score}
                          </div>
                        </div>
                        <div className="w-full h-20 md:h-24 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-2xl mt-4" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Rest of the List (4-10) */}
              {restOfList.length > 0 && (
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Peringkat Lainnya
                  </h2>
                  <div className="space-y-3">
                    {restOfList.map((entry, index) => {
                      const actualRank = index + 4;
                      const isCurrentUser = user && entry.user_id === user.id;

                      return (
                        <div
                          key={entry.id}
                          className={`flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${
                            isCurrentUser
                              ? "bg-indigo-50 border-2 border-indigo-300 shadow-md"
                              : "bg-slate-50 border border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {/* Rank */}
                          <div className="flex-shrink-0 w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                            <span className="text-lg font-bold text-white">
                              {actualRank}
                            </span>
                          </div>

                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            {entry.player_avatar ? (
                              <div className="w-11 h-11 rounded-xl ring-2 ring-slate-300 overflow-hidden">
                                <Image
                                  src={entry.player_avatar}
                                  alt={entry.player_name || "User"}
                                  width={44}
                                  height={44}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-11 h-11 rounded-xl ring-2 ring-slate-300 bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
                                <span className="text-base font-bold text-white">
                                  {entry.player_name?.[0]?.toUpperCase() || "A"}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Name */}
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 truncate flex items-center gap-2">
                              {entry.player_name || "Anonymous"}
                              {isCurrentUser && (
                                <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full font-medium">
                                  Kamu
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500">
                              {new Date(entry.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                              })}
                            </div>
                          </div>

                          {/* Score */}
                          <div className="text-right flex-shrink-0">
                            <div className="text-2xl font-bold text-slate-900">
                              {entry.score}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="mt-16 text-center">
                <p className="text-slate-600 mb-6">
                  Ingin masuk ke leaderboard?
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/quizzes">
                    <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 shadow-lg w-full sm:w-auto">
                      <Trophy className="w-5 h-5" />
                      Mulai Kuis
                    </button>
                  </Link>
                  <Link href="/dashboard">
                    <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 w-full sm:w-auto">
                      <Home className="w-5 h-5" />
                      Dashboard
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
