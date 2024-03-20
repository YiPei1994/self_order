"use client";

import { useTable } from "@/store/TableStore";
import React from "react";

function Header() {
  const { tableNumber } = useTable();
  return <header>Vas stul je:{tableNumber}</header>;
}

export default Header;
