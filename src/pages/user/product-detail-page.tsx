import Footer from "@/features/landing/footer";
import Navbar from "@/features/landing/navbar";
import ProductDetail from "@/components/product/product-page";

const ProductDetailUserPage = () => {
  return (
    <>
      <Navbar />
      <ProductDetail
        className="container mx-auto px-4 py-10"
        cartButton={true}
        reviewButton={true}
      />
      <Footer />
    </>
  );
};

export default ProductDetailUserPage;
