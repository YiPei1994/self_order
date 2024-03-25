import React from "react";
import { WiTime10 } from "react-icons/wi";

function Spinner() {
  return (
    <svg className="animate-spin w-full h-[50vh] flex justify-center items-center">
      <WiTime10 className="text-2xl text-primary" />
    </svg>
  );
}

export default Spinner;
