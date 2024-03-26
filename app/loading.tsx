"use client";
import Spinner from "@/components/ui/Spinner";
import React from "react";

function loading() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4 bg-primary/10">
      <Spinner />
    </div>
  );
}

export default loading;
