"use client";

import { MenuSchemaType, menuSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu } from "@/utils/types";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

type CreateEditFormProps = {
  menu?: Menu;
};

function CreateEditForm({ menu }: CreateEditFormProps) {
  const isEditSession = Boolean(menu);

  console.log(isEditSession);

  const { register, handleSubmit, reset } = useForm<MenuSchemaType>({
    resolver: zodResolver(menuSchema),
    defaultValues: isEditSession ? menu : {},
  });

  function onSubmit(values: MenuSchemaType) {
    console.log(values);
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            id="name"
            required
            {...register("name")}
            placeholder="jmeno menu..."
          />
        </div>
        <div>
          <select id="type" required {...register("type")}>
            <option value="">Vyber typ</option>
            <option value="starter">Predkrm</option>
            <option value="main">Hlavni</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            id="price"
            required
            {...register("price")}
            placeholder="cena..."
          />
        </div>
        <div>
          <input
            type="text"
            id="allergie"
            {...register("allergies")}
            placeholder="allergie..."
          />
        </div>
        <div>
          <textarea
            id="ingredients"
            {...register("ingredients")}
            placeholder="prisady..."
          />
        </div>
        <div>
          <input type="file" id="image" {...register("image")} />
        </div>
        <div>
          <Button>Add </Button>
        </div>
      </form>
    </>
  );
}

export default CreateEditForm;
