import supabase from "@/utils/supabase/supabaseClient";
import { useMutation } from "@tanstack/react-query";

export const useLogOut = () => {
  const { mutate: logOut } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }
    },
  });
  return { logOut };
};
