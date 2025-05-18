import dayjs from "dayjs";

const OrderDetail = ({ order }: { order: Order | null }) => {
  return (
    <div
      key={order?.id}
      className="mb-8 rounded-lg border bg-white p-6 shadow-sm"
    >
      <div className="mb-4">
        <p>
          <strong>Order ID:</strong> {order?.id}
        </p>
        <p>
          <strong>Status:</strong> {order?.orderStatus}
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
