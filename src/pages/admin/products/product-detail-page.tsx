import ProductDetail from "@/components/product/product-detail";

const ProductDetailAdminPage = () => {
  return (
    <>
      <ProductDetail
        className="container mx-auto px-4 py-10"
        verifyButton={true}
      />
    </>
  );
};

export default ProductDetailAdminPage;
