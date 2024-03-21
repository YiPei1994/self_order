import supabase from "../supabase/supabase";
import { Menu } from "../types";

export const getAllMenus = async () => {
  const { data, error } = await supabase.from("MenusTableOne").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as Menu[];
};

export const getExactMenu = async (id: number) => {
  const { data, error } = await supabase
    .from("MenusTableOne")
    .select()
    .eq("menu_id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data[0] as Menu;
};
