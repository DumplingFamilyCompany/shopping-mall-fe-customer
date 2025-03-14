export type ReviewResponse = {
  id: number;
  username: string;
  productName: string;
  rating: number;
  content: string;
  reply: string;
  createdAt: string;
  mainReview: boolean;
};

export type ReviewReplyRequest = {
  reply: string;
};
