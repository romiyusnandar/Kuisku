"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Chrome } from "lucide-react";
import Button from "@/components/ui/Button";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/layout/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
      }
    } catch {
      setError("Terjadi kesalahan saat login dengan Google");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
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

        <div className="w-full max-w-md relative">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 mb-10 group">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-200/50 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              Kuisku
            </span>
          </Link>

          {/* Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-slate-200/60 p-10 md:p-12 border border-white/60 hover:shadow-2xl transition-all duration-500">
            <div className="text-center mb-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
                <Chrome className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">
                  Login Cepat & Aman
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                Selamat Datang di{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  Kuisku
                </span>
              </h1>
              <p className="text-slate-600 leading-relaxed text-lg">
                Masuk secara instan dengan akun Google kamu.{" "}
                <span className="font-medium text-slate-700">Tanpa password, tanpa ribet.</span>
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
                <p className="text-sm text-red-600 text-center font-medium">{error}</p>
              </div>
            )}

            {/* Google Login Button - Prominent */}
            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              onClick={handleGoogleLogin}
              isLoading={isLoading}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Lanjutkan dengan Google
            </Button>

            {/* Info Text */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Dengan masuk, kamu setuju dengan{" "}
              <Link href="/terms" className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300">
                Syarat & Ketentuan
              </Link>{" "}
              kami
            </p>
          </div>

          {/* Bottom Decoration */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Belum punya akun?{" "}
              <span className="text-slate-700 font-medium">Langsung saja masuk dengan Google!</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
