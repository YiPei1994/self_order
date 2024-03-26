"use client";

import { Menu, NewMenu } from "@/utils/types";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCreateMenu, useEditMenu } from "@/app/api/apiMenu";
import { useMenuDrawer } from "@/store/MenuStore";

type CreateEditFormProps = {
  menu?: Menu;
};

function CreateEditForm({ menu }: CreateEditFormProps) {
  const isEditSession = Boolean(menu?.menu_id);
  const id = menu?.menu_id;
  const { hideDrawer } = useMenuDrawer();
  const form = useForm<NewMenu>({
    defaultValues: isEditSession ? menu : {},
  });

  const { createMenu } = useCreateMenu();
  const { editMenu } = useEditMenu();

  function onSubmit(data: NewMenu) {
    if (isEditSession && menu) {
      const image = typeof data.image === "string" ? data.image : data.image[0];
      editMenu(
        { newMenu: { ...data, image }, id },
        {
          onSuccess: () => {
            hideDrawer(false);
          },
        }
      );
    } else {
      createMenu(data, {
        onSuccess: () => {
          hideDrawer(false);
        },
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-wrap items-center p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-1/2 p-2">
              <FormControl>
                <Input
                  defaultValue={field.value}
                  placeholder="jmeno menu"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-1/2 p-2">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="typ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="starter">Predkrm</SelectItem>
                  <SelectItem value="main">Hlavni</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-1/2 p-2">
              <FormControl>
                <Input
                  defaultValue={field.value}
                  placeholder="cena..."
                  type="number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem className="w-1/2 p-2">
              <FormControl>
                <Input
                  defaultValue={field.value}
                  placeholder="allergie"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormControl>
                <Textarea
                  defaultValue={field.value}
                  id="ingredients"
                  placeholder="prisady..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full p-2">
          <input
            type="file"
            id="image"
            accept="image/*"
            defaultValue={menu?.image}
            {...form.register("image", {
              required: isEditSession ? false : "This is required",
            })}
          />
        </div>

        <div className="w-full p-2">
          <Button> {isEditSession ? "Edit" : "Add"} </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateEditForm;
