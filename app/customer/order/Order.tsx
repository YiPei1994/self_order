import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Order } from "@/utils/types";
import OrderDetail from "./OrderDetail";
import { MdMoney, MdOutlineSchedule } from "react-icons/md";

type OrderProps = {
  order: Order;
};
function Order({ order }: OrderProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`item-${order.id}`}>
        <AccordionTrigger className="text-xl">
          Order number: {order.id}
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-between items-center">
            <p className="flex items-center text-lg gap-2">
              <span>Status:</span>
              <span>{order.status}</span>
            </p>
            <p className="flex items-center text-lg gap-2">
              <span>Total:</span>
              <span>{order.total} €</span>
            </p>
          </div>
          <OrderDetail id={order.id} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default Order;
