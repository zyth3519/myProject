import { get, post, del, put } from "../utils/request";

export const loadModelAPI = (params: any): any =>
  get("/api/v1/auth/manager_info", params);

export const insertModel = (data: any) => post("/api/v1/admin/user", data);

export const modifyModel = (id: string, data: any) =>
  put("/api/v1/admin/user/" + id, data);

export const delModel = (id: string) => del("/api/v1/admin/user/" + id);
