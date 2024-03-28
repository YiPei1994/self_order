"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCart } from "@/store/CartStore";
import { allergyDetail } from "@/utils/constants";
import React from "react";
import { CartItem } from "@/utils/types";
import { useDeleteMenu, useExactMenu } from "@/app/api/apiMenu";
import Spinner from "@/components/ui/Spinner";

import Header from "../../Header";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MdCreate } from "react-icons/md";
import CreateEditForm from "../CreateEditForm";
import { useMenuDrawer } from "@/store/MenuStore";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { BsTrashFill } from "react-icons/bs";

function MenuDetailsPage({ params }: { params: { menu_id: string } }) {
  const id = +params.menu_id;
  const { data: menu, isLoading, error } = useExactMenu(id);
  const { hideDrawer, displayDrawer } = useMenuDrawer();
  const { deleteMenu } = useDeleteMenu();
  const { addToCart } = useCart();
  const router = useRouter();
  if (isLoading) return <Spinner />;
  if (error) return <p>{error.message} </p>;

  if (!menu) return;

  const { name, menu_id, allergies, image, ingredients, price, type } = menu;

  function handleAdd() {
    const newItem: CartItem = {
      id: Math.random(),
      menu: menu,
      menu_id,
      quantity: 1,
      price,
    };
    addToCart(newItem);
  }

  return (
    <>
      {" "}
      <Header>
        <Drawer open={displayDrawer} onOpenChange={hideDrawer}>
          <DrawerTrigger>
            <MdCreate className="text-2xl text-primary" />
          </DrawerTrigger>
          <DrawerContent>
            <CreateEditForm menu={menu} />
          </DrawerContent>
        </Drawer>
      </Header>
      <Card className="border-0  max-w-[390px]">
        <CardHeader>
          <img className="rounded-sm" src={image} alt={name} />
        </CardHeader>
        <CardContent className="flex flex-col gap-4 ">
          <div className="w-full items-center justify-between flex">
            <p className="text-2xl uppercase font-bold">{name} </p>
            <Badge className="w-fit self-end mr-2">{type} </Badge>{" "}
          </div>

          <p>{price} €</p>

          <div className="w-[90%] flex flex-col break-words	 ">
            <p className="font-bold	 uppercase">prísad:</p>{" "}
            <p> {ingredients} </p>
          </div>
          <div className="w-4/5 m-auto flex gap-10 items-center justify-between">
            <Button className="w-2/3" onClick={handleAdd}>
              Add to cart
            </Button>
            <AlertDialog>
              <AlertDialogTrigger>
                <BsTrashFill className="text-2xl text-red-500" />
              </AlertDialogTrigger>
              <AlertDialogContent className="w-4/5 m-auto">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      deleteMenu(id, {
                        onSuccess: () => {
                          router.replace("/admin/menu");
                        },
                      })
                    }
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
        <CardFooter>
          <ul className="flex flex-col gap-1">
            {allergies.split(",").map((allergy) =>
              allergyDetail
                .filter((detail) => +allergy === detail.id)
                .map((detail) => (
                  <li className="text-sm" key={detail.id}>
                    <span>{detail.id}</span> - <span>{detail.description}</span>{" "}
                  </li>
                ))
            )}
          </ul>
        </CardFooter>
      </Card>
    </>
  );
}

export default MenuDetailsPage;
