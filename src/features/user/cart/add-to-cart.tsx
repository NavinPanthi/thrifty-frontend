import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "@/components/ui/button";

import { RootState } from "@/redux/store";

import useAddToCartMutation from "@/services/user/cart/use-add-to-cart-mutation";

const AddToCart = ({ product }: { product: ProductData }) => {
  const loginStatus = useSelector<RootState>((state) => state.user.loginStatus);
  const navigate = useNavigate();

  const { mutate: handleCart, isPending } = useAddToCartMutation();

  const onClick = () => {
    if (!loginStatus) {
      navigate("/log-in");
      return;
    }

    handleCart({
      cartItems: [
        {
          productId: product.id,
          itemQuantity: 1,
        },
      ],
    });
  };
  return (
    <div className="mt-2">
      <Button
        variant="secondary"
        type="submit"
        className="w-full"
        onClick={onClick}
        disabled={isPending}
      >
        {isPending ? "Adding..." : "Add to cart"}
      </Button>
    </div>
  );
};

export default AddToCart;
