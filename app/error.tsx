"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBack } from "react-icons/md";

function Error() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <p>Something went wrong......please head back</p>
      <Button onClick={() => router.back()}>
        <MdArrowBack />
      </Button>
    </div>
  );
}

export default Error;
