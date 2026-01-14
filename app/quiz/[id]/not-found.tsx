import Link from "next/link";
import { Trophy, Home } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background - Matching Landing Page Style */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl" />
      </div>

      <div className="text-center max-w-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center shadow-lg">
            <Trophy className="w-16 h-16 text-slate-500" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Kuis Tidak Ditemukan
        </h2>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          Maaf, kuis yang kamu cari tidak ada atau telah dihapus.
          <br />
          Coba jelajahi kuis lainnya!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button variant="primary" size="lg">
              <Home className="w-5 h-5" />
              Kembali ke Dashboard
            </Button>
          </Link>
          <Link href="/quizzes">
            <Button variant="secondary" size="lg">
              <Trophy className="w-5 h-5" />
              Jelajahi Kuis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
