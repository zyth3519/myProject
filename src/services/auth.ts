import { post } from "../utils/request";
import loginResponse = loginType.loginResponse;

export const loginAPI = (
  userName: string,
  password: string
): Promise<loginResponse> =>
  post("/api/v1/auth/manager_login", {
    userName,
    password,
  });
