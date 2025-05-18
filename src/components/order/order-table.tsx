import { useState } from "react";

import dayjs from "dayjs";

import OrderDetailModal from "@/features/seller/orders/order-detail-modal";

const OrderTable = ({ ordersData }: { ordersData?: OrdersData }) => {
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // Track selected order

  if (!ordersData || ordersData.items.length === 0) {
    return <div className="py-8 text-center">No orders found.</div>;
  }

  return (
    <>
      <div className="my-4 overflow-x-auto rounded-lg border">
        <table className="min-w-full table-auto text-left text-sm">
          <thead className="bg-gray-100 font-medium text-gray-700">
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Delivery Date</th>
              <th className="px-4 py-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.items.map((order) => (
              <tr
                key={order.id}
                className="border-t"
                onClick={() => {
                  setSelectedOrder(order);
                  setIsOrderDetailModalOpen(true);
                }}
              >
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">
                  {dayjs(order.orderDate).format("YYYY-MM-DD")}
                </td>
                <td className="px-4 py-2">{order.orderStatus}</td>
                <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {dayjs(order.deliveryDate).format("YYYY-MM-DD")}
                </td>
                <td className="px-4 py-2">
                  <ul className="list-inside list-disc space-y-1">
                    {order.orderItems.map((item) => (
                      <li key={item.id}>
                        {item.product.title} × {item.orderQuantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OrderDetailModal
        isOpen={isOrderDetailModalOpen}
        closeModal={() => {
          setIsOrderDetailModalOpen(false);
        }}
        order={selectedOrder}
      />
    </>
  );
};

export default OrderTable;
