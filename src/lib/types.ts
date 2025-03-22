export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  address: string;
}

export interface Order {
  items: CartItem[];
  userDetails: UserDetails;
  total: number;
  orderId: string;
  date: string;
}

export interface PlaceOrderRequest {
  items: CartItem[];
  userDetails: UserDetails;
  total: number;
}

export interface PlaceOrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
