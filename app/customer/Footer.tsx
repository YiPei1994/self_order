"use client";
import React from "react";
import Link from "next/link";
import { MdRestaurantMenu } from "react-icons/md";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { usePathname } from "next/navigation";
function Footer() {
  const path = usePathname();
  return (
    <footer className="flex justify-between mt-auto items-center w-full p-4 bg-primary/10">
      <Link
        className={`${
          path.includes("menu") ? "text-primary" : ""
        }  flex flex-col gap-1 justify-center items-center text-md border-r w-1/2`}
        href={`${path}/menu`}
      >
        <MdRestaurantMenu className="text-2xl" />
        <span>Menu</span>
      </Link>
      <Link
        className={`${
          path.includes("order") ? "text-primary" : ""
        }  flex flex-col gap-1 justify-center items-center text-md border-r w-1/2`}
        href={`${path}/order`}
      >
        <MdOutlineStickyNote2 className="text-2xl" />
        <span>Order</span>
      </Link>
    </footer>
  );
}

export default Footer;
