declare module loginType {
  export interface loginResponse {
    code: number;
    data: string;
  }

  export interface login {
    userName: string;
    password: string;
  }
}
