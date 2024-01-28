import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import DeleteButton from "./DeleteButton";

export async function generateMetadata({ params }: any) {
  const id = params.id;

  try {
    const supabase = createServerComponentClient({ cookies });

    const resp: any = await supabase
      .from("Tickets")
      .select()
      .eq("id", id)
      .single();

    if (resp.error) {
      console.error("error retrieving ticket", resp.error);
      return [];
    }
    return {
      title: `Helpdesk | ${resp.data.title || "Title not found"} `,
    };
  } catch (error) {
    return { title: "Helpdesk | Ticket not found" };
  }
}

const getTicket = async (id: string) => {
  try {
    const supabase = createServerComponentClient({ cookies });

    const resp: any = await supabase
      .from("Tickets")
      .select()
      .eq("id", id)
      .single();

    if (resp.error) {
      console.error("error retrieving ticket", resp.error);
      return notFound();
    }
    return resp.data;
  } catch (error) {
    return notFound();
  }
};

export default async function TicketDetails({ params }: any) {
  const id = params.id;
  const ticket = await getTicket(id);

  const supabase = createServerComponentClient({cookies});

  const resp: any = await supabase.auth.getSession();


  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {resp.data?.session?.user?.email === ticket.user_email && (
            <DeleteButton id={ticket.id} />
          )}
        </div>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}

