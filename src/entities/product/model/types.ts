export type ProductResponse = {
  id: number;
  productCode: string;
  name: string;
  subName: string;
  rank: number;
  normalPrice: number;
  salePrice: number;
  stock: number;
  createdAt: string;
  visible: boolean;
};

export type ProductCreateRequest = {
  useOption: boolean;
  description: string;
} & Omit<ProductResponse, 'id' | 'rank' | 'createdAt'>;

export type ProductUpdateRequest = Omit<ProductCreateRequest, 'productCode'>;

export type ProductRankRequest = {
  rank: number;
};

export type ProductVisibilityRequest = {
  visible: boolean;
};
