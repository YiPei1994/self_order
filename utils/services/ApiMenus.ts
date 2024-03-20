import supabase from "../supabase/supabase";
import { Menu } from "../types";

export const getMenus = async (type: string) => {
  if (type === "all") {
    const { data, error } = await supabase.from("MenusTableOne").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data as Menu[];
  } else {
    const { data, error } = await supabase
      .from("MenusTableOne")
      .select()
      .eq("type", type);

    if (error) {
      throw new Error(error.message);
    }

    return data as Menu[];
  }
};
