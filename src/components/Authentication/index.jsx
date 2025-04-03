import React, { useEffect, useLayoutEffect, memo } from "react";
// import { getUserInfo, goOutLogin, useAdmin } from "@/store/slices/admin";
import { getInfo, useUserSate } from "../../store/user";
import { useAppDispatch } from "@/hooks";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getToken, cache } from "../../utils";
export default function Authentication(props) {
  const dispatch = useAppDispatch();
  const { token, userInfo } = useUserSate();
  const tokens = getToken();
  const location = useLocation();
  useEffect(() => {
  });
  if (getToken()) {
    if (location.pathname === "/login") {
      return <Navigate to={"/"} />;
    } else {
      if (token !== tokens) {
        return <Navigate to={"/login"} />;
      } else {
        if (cache.session.get("userInfo") === null) {
          dispatch(getInfo());
        }
        return props.children;
      }
    }
  } else {
    return <Navigate to={"/login"} />;
  }
}
