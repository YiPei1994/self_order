import supabase, { supabaseUrl } from "@/utils/supabase/supabaseClient";
import { Menu, NewMenu } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useExactMenu = (id: number) => {
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

export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  const { mutate: createMenu } = useMutation({
    mutationFn: async (newMenu: NewMenu) => {
      const imageName = `${Math.random()}-${newMenu.image[0].name}`.replaceAll(
        "/",
        ""
      );

      const imagePath = `${supabaseUrl}/storage/v1/object/public/menuImages/${imageName}`;

      const { data, error } = await supabase
        .from("MenusTableOne")
        .insert([{ ...newMenu, image: imagePath }])
        .select();

      if (error) {
        throw new Error(error.message + "couldnt add new menu");
      }

      const { error: stroragError } = await supabase.storage
        .from("menuImages")
        .upload(imageName, newMenu.image[0]);

      if (stroragError) {
        await supabase
          .from("MenusTableOne")
          .delete()
          .eq("menu_id", data[0].menu_id);
        console.error(stroragError);
        throw new Error(stroragError.message);
      }

      return data;
    },
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  return { createMenu };
};

export const useEditMenu = () => {
  const queryClient = useQueryClient();
  const { mutate: editMenu } = useMutation({
    mutationFn: async ({
      newMenu,
      id,
    }: {
      newMenu: NewMenu;
      id: number | undefined;
    }) => {
      const hasImagePath = newMenu.image?.startsWith?.(supabaseUrl);
      const imageName = `${Math.random()}-${newMenu.image.name}`.replaceAll(
        "/",
        ""
      );

      const imagePath = hasImagePath
        ? newMenu.image
        : `${supabaseUrl}/storage/v1/object/public/menuImages/${imageName}`;

      const { data, error } = await supabase
        .from("MenusTableOne")
        .update([{ ...newMenu, image: imagePath }])
        .eq("menu_id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message + "couldnt add new menu");
      }

      if (hasImagePath) return data;

      const { error: stroragError } = await supabase.storage
        .from("menuImages")
        .upload(imageName, newMenu.image);

      if (stroragError) {
        await supabase.from("MenusTableOne").delete().eq("menu_id", id);
        console.error(stroragError);
        throw new Error(stroragError.message);
      }

      return data;
    },
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menuById"] });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });
  return { editMenu };
};

export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteMenu } = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase
        .from("MenusTableOne")
        .delete()
        .eq("menu_id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["menuById"] });
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { deleteMenu };
};
