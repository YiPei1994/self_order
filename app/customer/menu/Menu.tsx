import { Menu } from "@/utils/types";
import Link from "next/link";
import React from "react";

type MenuProps = {
  menu: Menu;
};

function Menu({ menu }: MenuProps) {
  return (
    <div className="w-1/2 p-2">
      <Link href={`/customer/menu/${menu.menu_id}`}>
        <div
          style={{ backgroundImage: `url(${menu.image})` }}
          className="bg-cover w-full h-32 bg-center"
        ></div>
        <p>{menu.name}</p>
        <p>{menu.price}</p>
      </Link>
    </div>
  );
}

export default Menu;
