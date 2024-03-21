import { Menu } from "@/utils/types";
import Link from "next/link";
import React from "react";

type MenuProps = {
  menu: Menu;
};

function Menu({ menu }: MenuProps) {
  const formatAllergies = menu.allergies.map((a, i, array) => {
    return i !== array.length - 1 ? a + "," : a;
  });

  return (
    <div className="size-[47%] m-1 p-2  border border-primary ">
      <Link href={`/customer/menu/${menu.menu_id}`}>
        <div className="w-full h-[140px] overflow-hidden">
          <img
            src={menu.image}
            alt={menu.name}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xl uppercase my-2">{menu.name}</p>
        <div className="flex justify-between items-center">
          <p>{menu.price} €</p>
          <p>{formatAllergies} </p>
        </div>
      </Link>
    </div>
  );
}

export default Menu;
