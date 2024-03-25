import React, { PropsWithChildren } from "react";
import Footer from "./Footer";

function CustomerLayout({ children }: PropsWithChildren) {
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
