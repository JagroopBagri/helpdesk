"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: any, email: string, password: string) => {
    e.preventDefault();
    setError("");

    try {
      const supabase = createClientComponentClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("Error authenticating with supabase");
      console.error("Error authenticating with supabase", error);
    }
  };

  return (
    <main>
      <h2 className="text-center">Login</h2>

      <AuthForm handleSubmit={handleSubmit}></AuthForm>

      {error && <div className="error">{error}</div>}
    </main>
  );
}
