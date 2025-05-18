import Footer from "@/features/landing/footer";
import Navbar from "@/features/landing/navbar";
import OrderDetail from "@/components/order/order-card";

import useGetAllOrdersForUserQuery from "@/services/user/order/use-get-all-orders-query";

const OrderPage = () => {
  const { data: orders, isPending } = useGetAllOrdersForUserQuery();

  return (
    <>
      <Navbar />

      <main className="min-h-[60vh] px-4 py-8">
        <h1 className="mb-6 text-2xl font-semibold">My Orders</h1>

        {isPending ? (
          <p>Loading orders...</p>
        ) : orders && orders.length > 0 ? (
          orders.map((order) => <OrderDetail order={order} />)
        ) : (
          <p>No orders found.</p>
        )}
      </main>

      <Footer />
    </>
  );
};

export default OrderPage;
