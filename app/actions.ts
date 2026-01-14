"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

/**
 * Save quiz score to database
 * @param quizId - The ID of the quiz
 * @param score - The score achieved
 * @returns Success or error object
 */
export async function saveQuizScore(quizId: string, score: number) {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    // Get player name and avatar from user metadata (Google Auth provides this)
    const playerName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Anonymous";
    const playerAvatar = user.user_metadata?.avatar_url || null;

    // Insert the score into quiz_results with player snapshot data
    const { error: insertError } = await supabase.from("quiz_results").insert({
      user_id: user.id,
      quiz_id: quizId,
      score: score,
      player_name: playerName,
      player_avatar: playerAvatar,
    });

    if (insertError) {
      console.error("Error saving quiz score:", insertError);
      return {
        success: false,
        error: "Failed to save score",
      };
    }

    // Revalidate leaderboard path so rankings update instantly
    revalidatePath("/leaderboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Unexpected error saving quiz score:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
