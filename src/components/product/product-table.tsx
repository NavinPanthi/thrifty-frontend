import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminProductDrawer from "@/features/admin/product/admin-product-drawer";

import { getUserData } from "@/utils/auth-storage";
import { checkAdmin } from "@/utils/check-admin";

const ProductTable = ({
  productsData,
}: {
  productsData: ProductListData | undefined;
}) => {
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const handleOnClick = (product: Product) => {
    if (checkAdmin(getUserData())) {
      setIsProductDrawerOpen(true);
      setSelectedProduct(product);
      return;
    }
    navigate(`/product/${product.id}`);
  };
  return (
    <>
      <div className="overflow-x-auto py-4">
        <table className="min-w-full divide-y divide-gray-200 rounded-2xl shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Product Condition
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Product Verified
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {productsData?.items?.map((product) => {
              const firstImage = product.images[0];
              return (
                <tr
                  key={product.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleOnClick(product)}
                >
                  <td className="px-4 py-2">
                    {firstImage ? (
                      <img
                        src={`data:${firstImage.imageType};base64,${firstImage.imageData}`}
                        alt={product.title}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-200 text-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">
                    {product.title}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">
                    {product.productCondition}
                  </td>
                  <td className="px-4 py-2 text-sm font-medium text-gray-800">
                    {product.verified === true ? "yes" : "no"}
                  </td>
                  <td className="px-4 py-2 text-sm font-bold text-supporting-success">
                    Rs. {product.price}
                  </td>
                  <td className="px-4 py-2 text-sm text-yellow-600">
                    ⭐ {product.rating ?? "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AdminProductDrawer
        isOpen={isProductDrawerOpen}
        toggleDrawer={() => setIsProductDrawerOpen(!isProductDrawerOpen)}
        selectedProduct={selectedProduct}
      />
    </>
  );
};

export default ProductTable;
