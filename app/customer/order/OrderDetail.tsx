import { useOrderById } from "@/app/api/apiOrder";
import ErrorBoundary from "@/app/error";
import Spinner from "@/components/ui/Spinner";
import React from "react";

type OrderDetailProps = {
  id: number;
};

function OrderDetail({ id }: OrderDetailProps) {
  const { data: orderDetails, isLoading, error } = useOrderById(id);

  if (error) return <ErrorBoundary />;
  if (isLoading) return <Spinner />;
  if (!orderDetails) return;

  return (
    <ul className="w-4/5 m-auto flex flex-col gap-2 my-4">
      {orderDetails.orderItems.map((item) => (
        <li key={item.id} className="flex justify-between items-center text-lg">
          <span>{item.menu?.name} </span> <span>x {item.quantity}</span>{" "}
        </li>
      ))}
    </ul>
  );
}

export default OrderDetail;
