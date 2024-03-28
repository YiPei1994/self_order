"use client";
import { useCustomerOrders } from "@/app/api/apiOrder";
import ErrorBoundary from "@/app/error";
import Spinner from "@/components/ui/Spinner";
import { getWithExpiry } from "@/utils/helpers";
import React from "react";
import CustomerOperation from "../CustomerOperation";
import Order from "./Order";
import { useRouter } from "next/navigation";

function OrderPage() {
  const customer_id: string = getWithExpiry("customer_id");
  const router = useRouter();
  const { orders, isLoading, error } = useCustomerOrders(customer_id);

  if (!customer_id) {
    router.replace("/customer/menu");
  }
  if (error) return <ErrorBoundary />;
  if (isLoading) return <Spinner />;
  if (!orders) return;

  return (
    <>
      <CustomerOperation />

      <div className="px-4 py-8">
        <h4 className="text-3xl">Objednavky</h4>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <Order order={order} />{" "}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OrderPage;
