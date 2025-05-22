import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Delete01Icon, MinusSignIcon, PlusSignIcon } from "hugeicons-react";

import Button from "@/components/ui/button";

import PlaceOrderModal from "../order/place-order-modal";

import useGetCartItemsQuery from "@/services/user/cart/use-get-cart-items";
import useAddCartItemMutation from "@/services/user/products/sue-add-cart-item-mutation";
import useRemoveCartItemMutation from "@/services/user/use-remove-cart-mutation";
import useSubtractCartItemMutation from "@/services/user/use-subtract-item-mutation";

const Cart = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { data: cartItems, isLoading, refetch } = useGetCartItemsQuery();

  const navigate = useNavigate();

  const { mutate: deleteCart, isPending: isDeletePending } =
    useRemoveCartItemMutation();
  const { mutate: subtractCart, isPending: isSubtractPending } =
    useSubtractCartItemMutation();
  const { mutate: addCart, isPending: isAddPending } = useAddCartItemMutation();

  const handleDeleteCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string | number
  ) => {
    e.stopPropagation();
    deleteCart(id);
  };

  const handleSubtractCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string | number
  ) => {
    e.stopPropagation();
    subtractCart(id);
  };

  const handleAddCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string | number
  ) => {
    e.stopPropagation();
    addCart(id);
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!cartItems?.length)
    return (
      <p className="flex min-h-[60vh] items-center justify-center text-3xl">
        Your cart is empty
      </p>
    );

  return (
    <>
      <div className="mx-auto min-h-[40vh] max-w-3xl space-y-4 p-4">
        <div className="mt-4 flex justify-between">
          <h1 className="text-3xl">Your Cart</h1>

          <Button
            variant="tertiary"
            onClick={(e) => {
              e.stopPropagation();
              setIsOrderModalOpen(true);
            }}
          >
            Place Order
          </Button>
        </div>
        {cartItems.map((item) => {
          const firstImage = item.product.images?.[0];
          return (
            <div
              key={item.id}
              className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 shadow-sm"
              onClick={() => navigate(`/product/${item.product.id}`)}
            >
              <img
                src={`data:${firstImage.imageType};base64,${firstImage.imageData}`}
                alt={item.product.title}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.product.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Price: ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="rounded border p-1 hover:bg-gray-100"
                    onClick={(e) => handleSubtractCart(e, item.id)}
                    disabled={isSubtractPending}
                  >
                    <MinusSignIcon size={16} />
                  </button>

                  <span className="px-2">{item.itemQuantity}</span>

                  <button
                    className="rounded border p-1 hover:bg-gray-100"
                    onClick={(e) => handleAddCart(e, item.id)}
                    disabled={isAddPending}
                  >
                    <PlusSignIcon size={16} />
                  </button>

                  <button
                    className="ml-auto p-1 text-red-500 hover:text-red-700"
                    onClick={(e) => handleDeleteCart(e, item.id)}
                    disabled={isDeletePending}
                  >
                    <Delete01Icon />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <PlaceOrderModal
        isOpen={isOrderModalOpen}
        closeModal={() => setIsOrderModalOpen(false)}
      />
    </>
  );
};

export default Cart;
