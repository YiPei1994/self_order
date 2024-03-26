import { Menu } from "@/utils/types";
import Link from "next/link";
import React from "react";

type MenuProps = {
  menu: Menu;
};

function Menu({ menu }: MenuProps) {
  return (
    <div className="size-[47%] m-1 p-2  bg-primary/10  ">
      <Link href={`/admin/menu/${menu.menu_id}`}>
        <div className="w-full h-[140px] overflow-hidden">
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xl uppercase px-2 my-2">{menu.name}</p>
        <div className="flex justify-between items-center px-2">
          <p>{menu.price} €</p>
          <p className="text-sm">{menu.allergies} </p>
        </div>
      </Link>
    </div>
  );
}

export default Menu;
