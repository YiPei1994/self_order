"use client";
import React from "react";
import MenusType from "./MenusType";
import MenusList from "./MenusList";
import Header from "@/app/admin/Header";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MdAdd } from "react-icons/md";
import CreateEditForm from "./CreateEditForm";
import { useMenuDrawer } from "@/store/MenuStore";

function MenusPage() {
  const { displayDrawer, hideDrawer } = useMenuDrawer();
  return (
    <>
      <Header>
        <Drawer open={displayDrawer} onOpenChange={hideDrawer}>
          <DrawerTrigger>
            <MdAdd className="text-2xl text-primary" />
          </DrawerTrigger>
          <DrawerContent>
            <CreateEditForm />
          </DrawerContent>
        </Drawer>
      </Header>
      <MenusType />
      <MenusList />
    </>
  );
}

export default MenusPage;
