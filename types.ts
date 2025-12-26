
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  sizes: string[];
  color: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface UserReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
