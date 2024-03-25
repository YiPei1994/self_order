import supabase from "@/utils/supabase/supabaseClient";
import { Menu } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useAllMenus = () => {
  const { data, isLoading, error } = useQuery<Menu[]>({
    queryKey: ["menus"],
    queryFn: async () => {
      const { data, error } = await supabase.from("MenusTableOne").select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  return { data, isLoading, error };
};

export const useExactMenu = (id: string) => {
  const { data, isLoading, error } = useQuery<Menu>({
    queryKey: ["menuById", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("MenusTableOne")
        .select()
        .eq("menu_id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
  return { data, isLoading, error };
};
