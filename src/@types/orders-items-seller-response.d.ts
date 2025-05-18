interface OrdersResponse {
  success: boolean;
  message: string;
  data: OrdersData;
}

interface OrdersData {
  items: Order[];
  totalItems: number;
  totalPages: number;
  currPage: number;
  limit: number;
  hasNextPage: boolean;
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

interface OrderItem {
  id: number;
  orderQuantity: number;
  product: Product;
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
  rating: number;
  categories: Category[];
  verified: boolean;
}

interface ProductImage {
  id: number;
  imageData: string;
  imageName: string;
  imageType: string;
}

interface Review {
  id: number;
  comment: string;
  reviewDate: string;
  rating: number;
  user: ReviewUser;
}

interface ReviewUser {
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

interface Category {
  id: number;
  title: string;
  description: string;
}
