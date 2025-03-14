export type OrderResponse = {
  id: number;
  username: string;
  orderStatus: OrderStatus;
  totalPrice: number;
  createdAt: string;
};

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'SHIPPED'
  | 'CANCELLED'
  | 'COMPLETED';
