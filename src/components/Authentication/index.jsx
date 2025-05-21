import React from "react";
// import { getUserInfo, goOutLogin, useAdmin } from "@/store/slices/admin";
import { getInfo, useUserSate } from "../../store/user";
import { Navigate, useLocation } from "react-router-dom";
import { getToken, cache } from "../../utils";
import { useDispatch } from "react-redux";

export default function Authentication(props) {
  const dispatch = useDispatch();
  const { token } = useUserSate();
  const tokens = getToken();
  const location = useLocation();

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
