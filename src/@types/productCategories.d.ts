declare module IProductCategories {
  export interface Category {
    createdAt: any;
    updatedAt: any;
    id: number;
    name: string;
    coverImage: string;
    desc: string;
    parent: number;
  }

  export interface Data {
    code: number;
    total: number;
    pages: number;
    data: Category[];
  }
}
