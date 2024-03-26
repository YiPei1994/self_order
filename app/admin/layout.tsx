import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function CustomerLayout({ children }: PropsWithChildren) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <section className="overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary">
        {children}
      </section>
      <Footer />
    </div>
  );
}

export default CustomerLayout;
