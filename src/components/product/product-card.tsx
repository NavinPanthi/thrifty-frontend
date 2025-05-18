import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
  const firstImage = product.images[0];
  const navigate = useNavigate();
  return (
    <div
      className="flex h-fit cursor-pointer flex-col gap-2 rounded-2xl bg-white p-4 shadow transition hover:shadow-md"
      onClick={() => navigate(`/shop/product/${product.id}`)}
    >
      {firstImage ? (
        <img
          src={`data:${firstImage.imageType};base64,${firstImage.imageData}`}
          alt={product.title}
          className="h-48 w-full rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center rounded-xl bg-gray-200 text-gray-500">
          No Image
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="truncate text-lg font-semibold">{product.title}</h2>
      </div>

      <p className="line-clamp-2 text-sm text-gray-600">
        {product.description}
      </p>

      <div className="text-sm font-bold text-supporting-success">
        Rs. {product.price}
      </div>

      <div className="flex items-center gap-2 text-sm text-yellow-600">
        ⭐ {product.rating ?? "N/A"}
      </div>
    </div>
  );
};

export default ProductCard;
