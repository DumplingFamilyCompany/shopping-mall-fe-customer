export type User = {
  id: string;
  name: string;
  email: string;
};

export type EntityModelUser = {
  userId: string;
  username: string;
  email: string;
  emailVerifiedYn: string;
  profileImageUrl: string;
  providerType: 'GOOGLE' | 'FACEBOOK' | 'NAVER' | 'KAKAO' | 'LOCAL';
  roleType: 'USER' | 'ADMIN' | 'GUEST';
  createdAt: string;
  modifiedAt: string;
  _links: unknown;
};

export type Links = {
  [key: string]: Link;
};

export type Link = {
  href: string;
  hreflang: string;
  title: string;
  type: string;
  deprecation: string;
  profile: string;
  name: string;
  templated: boolean;
};

export type PageMetadata = {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
};

export type PagedModelEntityModelUser = {
  _embedded: {
    users: EntityModelUser[];
  };
  _links: Links;
  page: PageMetadata;
};
