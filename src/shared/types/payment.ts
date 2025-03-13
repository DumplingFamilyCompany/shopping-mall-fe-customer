export type PaymentMethod =
  | 'CARD'
  | 'TRANSFER'
  | 'VIRTUAL_ACCOUNT'
  | 'MOBILE'
  | 'EASY_PAY'
  | 'GIFT_CERTIFICATE';

export type PaymentStatus =
  | 'IDLE'
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED';
