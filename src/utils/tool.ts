export const serverUrl = "http://localhost:1337";

/**
 * 获取token
 */
export const getToken = () => localStorage.getItem("token");

export const setToken = (token: string) => localStorage.setItem("token", token);

/**
 * 处理图片路径
 * @param url
 */
export const  dalImg = (url: string | undefined ) => {
  if (url) {
    if (url.startsWith("http")) {
      return url
    }
    return serverUrl + url
  }

  return "http://oss.penkuoer.com/uPic/ss.jpeg"
}
