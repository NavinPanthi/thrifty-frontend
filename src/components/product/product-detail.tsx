import { useParams } from "react-router-dom";

import AddToCart from "@/features/user/cart/add-to-cart";
import AddReviewForm from "@/features/user/shop/add-review-form";

import cn from "@/lib/classnames";

import Button from "../ui/button";

import useVerifyProductMutation from "@/services/admin/product/use-verify-product-mutation";
import useGetSingleProductQuery from "@/services/product/use-get-single-product";

const ProductDetail = ({
  className,
  cartButton = false,
  reviewButton = false,
  verifyButton = false,
  productId,
  containerClassName,
  toggleDrawer,
}: {
  className?: string;
  cartButton?: boolean;
  reviewButton?: boolean;
  verifyButton?: boolean;
  productId?: string | number;
  containerClassName?: string;
  toggleDrawer?: () => void;
}) => {
  const { id } = useParams<{ id: string }>();
  const resolvedProductId = productId || id;
  const { data: product, isPending } = useGetSingleProductQuery(
    resolvedProductId ?? ""
  );

  const { mutate: handleVerify, isPending: isVerifyPending } =
    useVerifyProductMutation(toggleDrawer);

  const onClick = () => {
    handleVerify(resolvedProductId);
  };
  if (isPending) return <div className="py-10 text-center">Loading...</div>;
  if (!product)
    return <div className="py-10 text-center">Product not found.</div>;

  const firstImage = product.images?.[0];

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          containerClassName,
          "grid grid-cols-1 gap-10 md:grid-cols-2"
        )}
      >
        <div className="flex items-center justify-center">
          {firstImage ? (
            <img
              src={`data:${firstImage.imageType};base64,${firstImage.imageData}`}
              alt={product.title}
              className="max-h-[80vh] w-full rounded-2xl object-cover shadow"
            />
          ) : (
            <div className="flex h-96 w-full items-center justify-center rounded-xl bg-gray-200 text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{product.title}</h1>
          </div>

          <div className="text-gray-700">{product.description}</div>

          <div className="text-lg font-semibold text-supporting-success">
            Rs. {product.price}
          </div>

          <div className="text-sm font-medium text-yellow-600">
            ⭐ {product.rating ?? "N/A"}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {product.categories.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full bg-core-primary-light px-3 py-1 text-xs text-core-primary"
              >
                {cat.title}
              </span>
            ))}
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Condition: {product.productCondition}
          </div>
          {cartButton && id ? <AddToCart product={product} /> : <></>}
          {verifyButton && !product.verified && !!product ? (
            <Button disabled={isVerifyPending} onClick={onClick}>
              Verify product
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 max-w-[800px]">
        <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
        {product.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="font-semibold">{review.user.fullName}</div>
                  <div className="text-sm text-yellow-600">
                    ⭐ {review.rating}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <div className="mt-1 text-xs text-gray-400">
                  {new Date(review.reviewDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {reviewButton ? <AddReviewForm productId={id} /> : <></>}
    </div>
  );
};
export default ProductDetail;
