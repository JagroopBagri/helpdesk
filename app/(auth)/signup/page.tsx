"use client"

import { useState } from "react"
import AuthForm from "../AuthForm"
import { createClientComponentClient, SupabaseClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";

export default function Signup() {

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any, email: string, password: string) => {
    e.preventDefault()
    setError("");
    try {
      const supabase: SupabaseClient = createClientComponentClient();

      const {error} = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/callback`
        }
      });
      if(error){
        setError(error.message);
      }else{
        router.push('/verify')
      }
    } catch (error) {
      console.error("Error authenticating with supabase", error);
      setError("There was an error with sign up. Please try again.")
    }
  }

  return (
    <main>
      <h2 className="text-center">Sign up</h2>

      <AuthForm handleSubmit={handleSubmit} />

      {error && (
        <div className="error">{error}</div>
      )}
    </main>
  )
}