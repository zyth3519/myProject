import axios from "axios";
import { getToken, serverUrl } from "./tool";

// create an axios instance
const service = axios.create({
  // process.env是vue/cli脚手架内置的一个环境变量插件。数据可以直接从配置文件中读取
  //  .env 文件
  baseURL: serverUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

service.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token !== null && config.headers) {
      config.headers.token = token;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response.data.cookie);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const get = (url: string, params: any) =>
  service.get(url, { params }).then((res) => res.data);

export const post = (url: string, data: any) =>
  service.post(url, data).then((res) => res.data);

export const put = (url: string, data: any) =>
  service.put(url, data).then((res) => res.data);

export const del = (url: string) => service.delete(url).then((res) => res.data);

export default service;
