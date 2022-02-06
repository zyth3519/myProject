import { get, post, del, put } from "../utils/request";

export const loadModelAPI = (params: any): Promise<IProduct.Data> =>
  get("/api/v1/admin/product", params);

export const insertModel = (data: any) => post("/api/v1/admin/product", data);

export const modifyModel = (id: string, data: any) =>
  put("/api/v1/admin/product/" + id, data);

export const delModel = (id: string) => del("/api/v1/admin/product/" + id);
