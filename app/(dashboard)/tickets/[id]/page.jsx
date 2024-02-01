import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";

export const dynamicParams = true;

export const generateMetadata = async ({ params }) => {
  const { id } = params;
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("tickets")
    .select()
    .eq("id", id)
    .single();

  return {
    title: `Helpdesk | ${data?.title || "Ticket not found"}`,
  };
};

// //generate static content - will fetch all ids available during build time and prefetch ahead | commented, since authentication is impemented, need to render the page dynamicall
// export const generateStaticParams = async () => {
//   const res = await fetch("http://localhost:4000/tickets");
//   const data = await res.json();

//   const ids = data.map((ticket) => {
//     return { id: ticket.id };
//   });

//   return ids;
// };

const getTicketDetails = async (id) => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("tickets")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
};

const TicketDetails = async ({ params }) => {
  const { id } = params;

  const ticket = await getTicketDetails(id);
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        <div className="ml-auto">
          {data.session.user.email === ticket.user_email && (
            <DeleteButton id={id} />
          )}
        </div>
      </nav>

      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by: {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
