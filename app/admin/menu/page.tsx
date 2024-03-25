import React from "react";
import MenusType from "./MenusType";
import MenusList from "./MenusList";
import Header from "@/app/admin/Header";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { MdAdd } from "react-icons/md";
import CreateEditForm from "./CreateEditForm";

function MenusPage() {
  return (
    <>
      <Header>
        <Drawer>
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
