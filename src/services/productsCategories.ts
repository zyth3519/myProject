import { get, post, del, put } from "../utils/request";

export const loadModelAPI = (params: any): Promise<IProductCategories.Data> =>
  get("/api/v1/admin/productcategory", params);

export const insertModel = (data: any) => post("/api/v1/admin/productcategory", data);

export const modifyModel = (id: string, data: any) =>
  put("/api/v1/admin/productcategory/" + id, data);

export const delModel = (id: string) => del("/api/v1/admin/productcategory/" + id);
