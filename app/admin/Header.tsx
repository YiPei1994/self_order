"use client";

import { Button } from "@/components/ui/button";
import { MdArrowBack } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useLogOut } from "../api/apiAuth";

function Header() {
  const router = useRouter();
  const path = usePathname();
  const { logOut } = useLogOut();
  function handleLogOut() {
    logOut();
    router.push("/login");
  }
  return (
    <header className="flex items-center justify-between w-full p-4 bg-primary/10">
      <Button onClick={() => router.back()}>
        <MdArrowBack />
      </Button>
      <Button onClick={handleLogOut}>
        <MdLogout />
      </Button>
    </header>
  );
}

export default Header;
