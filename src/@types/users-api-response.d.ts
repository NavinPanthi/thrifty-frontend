interface UsersApiResponse {
  success: boolean;
  message: string;
  data: UsersData;
}

interface UsersData {
  items: User[];
  totalItems: number;
  totalPages: number;
  currPage: number;
  limit: number;
  hasNextPage: boolean;
}

interface User {
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
