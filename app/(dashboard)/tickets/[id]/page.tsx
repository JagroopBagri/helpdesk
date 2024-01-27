import { Ticket } from "@/utils/interfaces";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: any) {
  const id = params.id

  const res = await fetch(`http://localhost:4000/tickets/${id}`)
  const ticket = await res.json()
 
  return {
    title: `Helpdesk | ${ticket.title}`
  }
}

export const generateStaticParams = async () => {
  try {
    const res = await fetch("http://localhost:4000/tickets");

    const tickets: Ticket[] = await res.json();

    return tickets.map((ticket) => ({
      id: ticket.id,
    }));
  } catch (error) {
    return [];
  }
};

const getTicket = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:4000/tickets/${id}`, {
      next: {
        revalidate: 60,
      },
    });

    if(!res.ok){
      return notFound();
    }

    return res.json();
  } catch (error) {
    console.log("error", error);
    return notFound();
  }
};

export default async function TicketDetails({ params }: any) {
  const id = params.id
  const ticket = await getTicket(id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
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
  );
}