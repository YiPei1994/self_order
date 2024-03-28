"use client";
import { useCustomerOrders } from "@/app/api/apiOrder";
import ErrorBoundary from "@/app/error";
import Spinner from "@/components/ui/Spinner";
import React from "react";
import CustomerOperation from "../CustomerOperation";
import Order from "./Order";
import { useRouter } from "next/navigation";
import { useCustomerId } from "@/store/MenuStore";

function OrderPage() {
  const { customer_id } = useCustomerId();

  const router = useRouter();
  const { orders, isLoading, error } = useCustomerOrders(customer_id);

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
