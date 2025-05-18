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

interface ProductData {
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

interface ProductResponse {
  success: boolean;
  message: string;
  data: ProductData;
}
