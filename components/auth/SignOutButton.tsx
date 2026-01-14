"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
      isLoading={isLoading}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <LogOut className="w-4 h-4" />
      Keluar
    </Button>
  );
}
