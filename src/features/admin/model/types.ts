export type AdminRole = 'SUPER_ADMIN' | 'ADMIN';

export type AdminResponse = {
  id: number;
  username: string;
  role: AdminRole;
  createdAt: string;
};

export type AdminCreateRequest = {
  username: string;
  password: string;
  role: AdminRole;
};

export type AdminLoginRequest = {
  username: string;
  password: string;
};
