import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function POST(request: any) {
  const ticket = await request.json()

  const supabase = createRouteHandlerClient({cookies});

  const {data: {session}} = await supabase.auth.getSession();

  if(!session) return NextResponse.json({error: "No Session found"});

  const resp = await supabase.from("Tickets").insert({
    ...ticket,
    user_email: session.user.email
  }).select().single();

  return NextResponse.json({data: resp.data, error: resp.error})
}