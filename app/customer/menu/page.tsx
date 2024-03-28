import React from "react";
import MenusType from "./MenusType";
import MenusList from "./MenusList";

import CustomerOperation from "../CustomerOperation";

function MenusPage() {
  return (
    <>
      <div className="flex flex-col gap-4 w-full p-4 bg-primary/10 z-30">
        <CustomerOperation />
        <MenusType />
      </div>
      <MenusList />
    </>
  );
}

export default MenusPage;
