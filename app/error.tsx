"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBack } from "react-icons/md";

function ErrorBoundary() {
  const router = useRouter();
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <p>Something went wrong......please head back</p>
      <Button onClick={() => router.back()}>
        <MdArrowBack /> Back
      </Button>
    </div>
  );
}

export default ErrorBoundary;
