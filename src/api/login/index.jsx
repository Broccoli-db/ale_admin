import service from "@/utils/request";
// 登录
export const login = (data) => {
  return service({
    url: "/login",
    method: "post",
    data,
  });
};
// 获取用户信息
export const getInfoApi = () => {
  return service({
    url: "/userinfo",
    method: "get",
  });
};
