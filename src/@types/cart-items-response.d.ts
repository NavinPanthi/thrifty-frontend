interface ProductImage {
  id: number;
  imageData: string;
  imageName: string;
  imageType: string;
}

interface ProductCategory {
  id: number;
  title: string;
  description: string;
}

interface Review {
  id: number;
  comment: string;
  reviewDate: string;
  rating: number;
  user: UserReview;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  productCondition: string;
  listingDate: string;
  verifiedDate: string | null;
  images: ProductImage[];
  reviews: Review[];
  rating: number | null;
  categories: ProductCategory[];
  verified: boolean;
}

interface CartItem {
  id: number;
  itemQuantity: number;
  listingDate: string;
  product: Product;
}

interface CartData {
  id: number;
  cartItems: CartItem[];
}

interface CartResponse {
  success: boolean;
  message: string;
  data: CartData;
}
