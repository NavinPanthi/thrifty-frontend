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

interface ProductListData {
  items: Product[];
  totalItems: number;
  totalPages: number;
  currPage: number;
  limit: number;
  hasNextPage: boolean;
}

interface ProductListResponse {
  success: boolean;
  message: string;
  data: ProductListData;
}
