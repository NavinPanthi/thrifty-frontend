interface Image {
  id: number;
  imageData: string;
  imageName: string;
  imageType: string;
}

interface Category {
  id: number;
  title: string;
  description: string;
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
  images: Image[];
  reviews: Review[];
  rating: number | null;
  categories: Category[];
  verified: boolean;
}
interface UserReview {
  id: number;
  fullName: string;
  email: string;
  imageName: string | null;
  imageType: string | null;
  imageData: string | null;
  phone: string | null;
  address: string | null;
  roles: string[];
}

interface Review {
  id: number;
  comment: string;
  reviewDate: string;
  rating: number;
  user: UserReview;
}

interface OrderItem {
  id: number;
  orderQuantity: number;
  product: Product;
}

interface Order {
  id: number;
  totalAmount: number;
  orderDate: string;
  shippingAddress: string;
  orderStatus: string;
  deliveryDate: string;
  orderItems: OrderItem[];
}

interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
}
