import supabase from "@/utils/supabase/supabaseClient";
import { CartItem, Order, OrderDetails, TableNames } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: createOrder } = useMutation({
    mutationFn: async ({
      cart,
      table_name,
      customer_id,
    }: {
      cart: CartItem[];
      table_name: TableNames;
      customer_id: string;
    }) => {
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
        // get customer localstorage id

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
              order_id: orderData[0].id,
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
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return { createOrder };
};

export const useCustomerOrders = (customer_id: string) => {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", customer_id);
      if (error) {
        throw new Error(error.message + "No orders from customer.");
      }
      return data as Order[];
    },
  });

  return { orders, isLoading, error };
};

export const useOrderById = (id: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orderById", id],
    queryFn: async () => {
      const { data: OrderDetails, error } = await supabase
        .from("orders")
        .select("*, orderItems(*, menu(*))")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message + "No order detail found.");
      }

      return OrderDetails as OrderDetails;
    },
  });

  return { data, isLoading, error };
};
