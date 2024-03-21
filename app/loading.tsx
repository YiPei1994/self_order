"use client";
import React from "react";

function loading() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <p>Data is being fetched...please wait...</p>
    </div>
  );
}

export default loading;
