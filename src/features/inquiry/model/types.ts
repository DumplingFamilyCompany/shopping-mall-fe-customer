export type InquiryResponse = {
  id: number;
  username: string;
  productName: string;
  content: string;
  reply: string;
  createdAt: string;
  answered: boolean;
};

export type InquiryReplyRequest = {
  reply: string;
};
