import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import QuizGame from "@/components/quiz/QuizGame";

type Option = { text: string; isCorrect: boolean };
type Question = {
  id: string;
  question_text: string;
  options: Option[];
  order: number;
};

type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function QuizPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch quiz data
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .single();

  if (quizError || !quiz) {
    notFound();
  }

  // Fetch questions for this quiz, ordered by 'order' column
  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("*")
    .eq("quiz_id", id)
    .order("order", { ascending: true });

  if (questionsError || !questions || questions.length === 0) {
    notFound();
  }

  return <QuizGame questions={questions} quizTitle={quiz.title} quizId={quiz.id} />;
}
