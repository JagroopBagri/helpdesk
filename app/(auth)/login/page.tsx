"use client"

import AuthForm from "../AuthForm";

export default function Login() {

  const handleSubmit = async (e: any, email: string, password: string) => {
    e.preventDefault();
    console.log(email, password);
  }

    return (
      <main>
        <h2 className="text-center">Login</h2>

        <AuthForm handleSubmit={handleSubmit}></AuthForm>
      </main>
    )
  }