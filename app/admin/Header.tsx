"use client";

import { Button } from "@/components/ui/button";
import { MdArrowBack } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { useLogOut } from "../api/apiAuth";

function Header({ children }: PropsWithChildren) {
  const router = useRouter();
  const path = usePathname();
  const { logOut } = useLogOut();

  function handleLogOut() {
    logOut();
    router.push("/login");
  }
  return (
    <header className="flex items-center justify-between w-full p-4 bg-primary/10 z-30">
      <Button onClick={() => router.back()}>
        <MdArrowBack />
      </Button>

      {children}
      <Button onClick={handleLogOut}>
        <MdLogout />
      </Button>
    </header>
  );
}

export default Header;
