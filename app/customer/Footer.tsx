"use client";
import React from "react";
import Link from "next/link";
import { MdRestaurantMenu } from "react-icons/md";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { usePathname } from "next/navigation";
import { getWithExpiry } from "@/utils/helpers";
function Footer() {
  const path = usePathname();
  const customer_id: string = getWithExpiry("customer_id");
  return (
    <footer className="flex justify-between mt-auto items-center w-full p-4 bg-primary/10 z-30">
      <Link
        className={`${
          path.includes("menu") ? "text-primary" : ""
        }  flex flex-col gap-1 justify-center items-center text-md border-r w-1/2`}
        href={`/customer/menu`}
      >
        <MdRestaurantMenu className="text-2xl" />
        <span>Menu</span>
      </Link>
      <Link
        className={`${
          path.includes("order") ? "text-primary" : ""
        }  flex flex-col gap-1 justify-center items-center text-md border-r w-1/2 ${
          customer_id ? "" : "pointer-events-none"
        }`}
        href={`/customer/order`}
      >
        <MdOutlineStickyNote2 className="text-2xl" />
        <span>Order</span>
      </Link>
    </footer>
  );
}

export default Footer;
