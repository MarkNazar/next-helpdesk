import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "../components/Navbar";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/login");
  }

  return (
    <>
      <Navbar user={data.session.user} />
      {children}
    </>
  );
};

export default DashboardLayout;
