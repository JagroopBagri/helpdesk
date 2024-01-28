"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// icons & UI
import { TiDelete } from "react-icons/ti";

export default function DeleteButton({ id }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // handle delete request
  const handleClick = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tickets/${id}`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (json.error) {
        console.error("Error deleting ticket", json.error);
      } else {
        router.refresh();
        router.push("/tickets");
      }
    } catch (error) {
      console.error("Error deleting ticket", error);
    }
    setIsLoading(false);
  };

  return (
    <button className="btn-primary" onClick={handleClick} disabled={isLoading}>
      {isLoading && (
        <>
          <TiDelete />
          Deleting....
        </>
      )}
      {!isLoading && (
        <>
          <TiDelete />
          Delete Ticket
        </>
      )}
    </button>
  );
}
