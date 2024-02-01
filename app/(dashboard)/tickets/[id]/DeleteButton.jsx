"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

const DeleteButton = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);

    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "DELETE",
    });

    const { error } = await res.json();

    if (error) {
      console.log(error.message);
    }

    if (!error) {
      router.push("/tickets");
      router.refresh();
    }
    setIsLoading(false);
  };
  return (
    <button className="btn-primary" onClick={handleDelete} disabled={isLoading}>
      {isLoading && (
        <>
          <TiDelete />
          Deleting...
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
};

export default DeleteButton;
