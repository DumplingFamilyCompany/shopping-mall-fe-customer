export type CategoryResponse = {
  id: number;
  name: string;
  parentId: number;
  sortOrder: number;
  visible: boolean;
};

export type CategoryCreateRequest = {
  parentId: number;
  name: string;
  sortOrder: number;
  visible: boolean;
};

export type CategoryUpdateRequest = Pick<
  CategoryResponse,
  'name' | 'sortOrder' | 'visible'
>;
