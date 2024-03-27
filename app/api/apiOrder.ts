import supabase from "@/utils/supabase/supabaseClient";
import { CartItem, TableNames } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

export const useCreateOrder = () => {
  const { mutate: createOrder } = useMutation({
    mutationFn: async ({
      cart,
      table_name,
    }: {
      cart: CartItem[];
      table_name: TableNames;
    }) => {
      console.log(cart, table_name);

      try {
        // 1. Update table status
        const { error: tableError } = await supabase
          .from("tables")
          .update({ status: true })
          .eq("name", table_name)
          .single();

        if (tableError) {
          throw new Error(
            `Failed to update table status: ${tableError.message}`
          );
        }

        // 2. Create order
        const total = cart.reduce(
          (acc, cur) => acc + cur.quantity * cur.price,
          0
        );
        const customer_id = uuidv4();

        if (!total || !customer_id) {
          throw new Error("Missing customer ID or total price");
        }

        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .insert([{ total, table_name, customer_id }])
          .select();

        if (orderError) {
          throw new Error(`Failed to create order: ${orderError.message}`);
        }

        // 3. Create order items
        const { error: orderItemError } = await supabase
          .from("orderItems")
          .insert(
            cart.map((item) => ({
              menu_id: item.menu_id,
              quantity: item.quantity,
              customer_id,
            }))
          )
          .select();

        if (orderItemError) {
          // Rollback order creation
          await supabase.from("orders").delete().eq("customer_id", customer_id);

          throw new Error(
            `Failed to create order items: ${orderItemError.message}`
          );
        }
      } catch (error) {
        console.error("Error creating order:", error);
        throw error; // Rethrow the error to be caught by the caller
      }
    },
  });

  return { createOrder };
};
