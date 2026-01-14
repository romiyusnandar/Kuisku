"use client";

import { useState, useEffect } from "react";
import { Trophy, ArrowRight, CheckCircle2, XCircle, Home, Award } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { saveQuizScore } from "@/app/actions";

// Type Definitions
type Option = { text: string; isCorrect: boolean };
type Question = { id: string; question_text: string; options: Option[]; order: number };

interface QuizGameProps {
  questions: Question[];
  quizTitle: string;
  quizId: string;
}

export default function QuizGame({ questions, quizTitle, quizId }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const maxScore = totalQuestions * 10;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionClick = (optionIndex: number, isCorrect: boolean) => {
    if (isAnswered) return; // Prevent double clicking

    setSelectedOption(optionIndex);
    setIsAnswered(true);

    // Update score if correct
    if (isCorrect) {
      setScore((prev) => prev + 10);
    }

    // Move to next question after 1.5 seconds
    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  // Save score when quiz finishes
  useEffect(() => {
    if (isFinished && !isSaved && !isSaving) {
      const saveSco = async () => {
        setIsSaving(true);
        try {
          const result = await saveQuizScore(quizId, score);
          if (result.success) {
            setIsSaved(true);
          }
        } catch (error) {
          console.error("Failed to save score:", error);
        } finally {
          setIsSaving(false);
        }
      };
      saveSco();
    }
  }, [isFinished, isSaved, quizId, score]); // Removed isSaving from dependencies to prevent infinite loop

  // Result Screen
  if (isFinished) {
    const percentage = Math.round((score / maxScore) * 100);
    const isPerfect = percentage === 100;
    const isGood = percentage >= 70;
    const isPass = percentage >= 60;

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full">
          {/* Result Card */}
          <div className="bg-white rounded-2xl shadow-sm p-12 border border-slate-200">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="mb-10 text-center">
              <div className="text-sm font-medium text-slate-500 mb-2">
                Kuis Selesai
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
                {isPerfect
                  ? "Sempurna!"
                  : isGood
                  ? "Luar Biasa!"
                  : isPass
                  ? "Bagus!"
                  : "Terus Belajar!"}
              </h1>
              <p className="text-base text-slate-600 max-w-md mx-auto">
                {isPerfect
                  ? "Kamu menguasai semua materi dengan sempurna"
                  : isGood
                  ? "Pemahaman materi sudah sangat baik"
                  : isPass
                  ? "Masih ada ruang untuk berkembang"
                  : "Jangan menyerah, coba lagi!"}
              </p>
            </div>

            {/* Score Display */}
            <div className="mb-10 py-8 border-y border-slate-200">
              <div className="text-6xl md:text-7xl font-bold text-slate-900 mb-2 text-center">
                {score}
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                <span>dari</span>
                <span className="text-lg font-semibold text-slate-700">{maxScore}</span>
                <span>poin</span>
                <span className="mx-2">·</span>
                <span className="font-semibold text-slate-900">{percentage}%</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">{totalQuestions}</div>
                <div className="text-xs text-slate-500 font-medium">Soal</div>
              </div>
              <div className="text-center border-x border-slate-200">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {score / 10}
                </div>
                <div className="text-xs text-slate-500 font-medium">Benar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  {totalQuestions - score / 10}
                </div>
                <div className="text-xs text-slate-500 font-medium">Salah</div>
              </div>
            </div>

            {/* Saving Status */}
            {isSaving && (
              <div className="mb-6 py-2 px-4 bg-slate-100 rounded-lg inline-flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full animate-pulse" />
                <p className="text-slate-700 font-medium">
                  Menyimpan skor...
                </p>
              </div>
            )}
            {isSaved && (
              <div className="mb-6 py-2 px-4 bg-slate-100 rounded-lg inline-flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-slate-700" />
                <p className="text-slate-700 font-medium">
                  Skor berhasil disimpan
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/leaderboard" className="flex-1">
                <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors duration-200">
                  <Award className="w-4 h-4" />
                  Lihat Leaderboard
                </button>
              </Link>
              <Link href="/quizzes" className="flex-1">
                <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200">
                  <Trophy className="w-4 h-4" />
                  Kuis Lainnya
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3 text-slate-600 font-medium rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200">
                  <Home className="w-4 h-4" />
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-slate-500">
              {quizTitle}
            </div>
            <div className="text-sm font-medium text-slate-900">
              {currentQuestionIndex + 1} / {totalQuestions}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-slate-900 transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-200">
          {/* Question Number */}
          <div className="mb-6">
            <span className="text-xs font-medium text-slate-500">
              Pertanyaan {currentQuestionIndex + 1}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-8 leading-tight">
            {currentQuestion.question_text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrectOption = option.isCorrect;
              const showCorrect = isAnswered && isCorrectOption;
              const showWrong = isAnswered && isSelected && !isCorrectOption;

              const optionLabels = ['A', 'B', 'C', 'D'];

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index, option.isCorrect)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-lg border font-medium text-base transition-all duration-200 flex items-center gap-3 ${
                    showCorrect
                      ? "bg-green-50 border-green-500 text-green-900 ring-1 ring-green-500"
                      : showWrong
                      ? "bg-red-50 border-red-500 text-red-900 ring-1 ring-red-500"
                      : isAnswered
                      ? "bg-white border-slate-200 text-slate-400 cursor-not-allowed opacity-50"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-blue-500 hover:ring-1 hover:ring-blue-500 cursor-pointer"
                  }`}
                >
                  {/* Option Label */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center font-semibold text-sm transition-colors ${
                    showCorrect
                      ? "bg-green-500 text-white"
                      : showWrong
                      ? "bg-red-500 text-white"
                      : isAnswered
                      ? "bg-slate-100 text-slate-400"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {optionLabels[index]}
                  </div>

                  {/* Option Text */}
                  <span className="flex-1">{option.text}</span>

                  {/* Check/Cross Icon */}
                  {showCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                  {showWrong && (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Score Display */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 text-slate-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium mb-0.5">Skor Saat Ini</div>
                <div className="text-lg font-semibold text-slate-900">{score} <span className="text-sm font-normal text-slate-500">/ {maxScore}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
