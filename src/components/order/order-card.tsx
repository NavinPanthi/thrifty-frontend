import dayjs from "dayjs";

import { getUserData } from "@/utils/auth-storage";
import { checkSeller } from "@/utils/check-seller";

import Button from "../ui/button";

import useCompleteOrderMutation from "@/services/seller/order/use-complete-order";

const OrderDetail = ({
  order,
  closeModal,
}: {
  order: Order | null;
  closeModal?: () => void;
}) => {
  const userData = getUserData();
  const isOrderPending =
    order?.orderStatus === "pending" && checkSeller(userData);

  const { mutate: completeOrder, isPending } =
    useCompleteOrderMutation(closeModal);

  const handleCompleteOrder = (orderId: number | string) => {
    completeOrder(orderId);
  };

  return (
    <div
      key={order?.id}
      className="mb-8 rounded-lg border bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p>
            <strong>Order ID:</strong> {order?.id}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                order?.orderStatus === "pending"
                  ? "text-supporting-warning"
                  : order?.orderStatus === "completed"
                    ? "text-supporting-success"
                    : order?.orderStatus === "cancelled"
                      ? "text-supporting-error"
                      : "text-gray-600"
              }
            >
              {order?.orderStatus}
            </span>
          </p>
          <p>
            <strong>Total Amount:</strong> ${order?.totalAmount}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {dayjs(order?.orderDate).format("MMMM D, YYYY")}
          </p>
          <p>
            <strong>Delivery Date:</strong>{" "}
            {dayjs(order?.deliveryDate).format("MMMM D, YYYY")}
          </p>
          <p>
            <strong>Shipping Address:</strong> {order?.shippingAddress}
          </p>
        </div>
        {isOrderPending && (
          <Button
            disabled={isPending}
            type="submit"
            onClick={() => handleCompleteOrder(order?.id)}
          >
            Complete Order
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {order?.orderItems.map((item) => (
          <div key={item.id} className="flex items-start gap-4 border-t pt-4">
            <img
              src={`data:${item.product.images[0]?.imageType};base64,${item.product.images[0]?.imageData}`}
              alt={item.product.title}
              className="h-24 w-24 rounded object-cover"
            />
            <div>
              <h2 className="text-lg font-medium">{item.product.title}</h2>
              <p className="text-sm text-gray-600">
                {item.product.description}
              </p>
              <p>
                <strong>Condition:</strong> {item.product.productCondition}
              </p>
              <p>
                <strong>Quantity:</strong> {item.orderQuantity}
              </p>
              <p>
                <strong>Price:</strong> ${item.product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetail;
