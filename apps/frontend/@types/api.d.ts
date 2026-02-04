interface Product {
  id: number;
  img: string;
  price: number;
  rate: number;
  title: string;
}

interface ProductCart extends Product {
  quantity: number;
  totalQuantity: number;
}

interface ProductsList {
  id: number;
  list: Product[];
  title: string;
}

interface ProductsResponse {
  products: ProductsList[];
}

interface BaseProductParams {
  id: number | string;
}

interface GetProductParams {
  categoryId?: number | string;
  limit?: number;
  maxPrice?: number;
  minPrice?: number;
  page?: number;
  search?: string;
  sortBy?: 'createdAt' | 'price' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface GetProductsResponse {
  pagination: Pagination;
  products: ProductsList[];
}
