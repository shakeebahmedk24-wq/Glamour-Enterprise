export interface Subcategory {
  id: string;
  name: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories?: string[];
  image: string;
  iconName: string;
}

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  subcategoryId?: string;
  image: string;
  material: string;
  finish: string;
  features: string[];
  description: string;
  isFeatured?: boolean;
}

export type PageRoute = 'home' | 'about' | 'products' | 'contact' | 'product-detail';

export interface RouteState {
  page: PageRoute;
  categorySlug?: string;
  subcategoryName?: string;
  productCode?: string;
}

export interface DirectOrderState {
  isOpen: boolean;
  product?: ProductItem;
}

export interface ClientReview {
  id: string;
  author: string;
  role: string;
  organization: string;
  location: string;
  content: string;
  rating: number;
}
