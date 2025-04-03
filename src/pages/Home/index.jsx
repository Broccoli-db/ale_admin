import React, { useEffect, use } from "react";
import { useUserSate } from "../../store/user";
import { ContextProvider } from "@/context"
export default function Index() {
  const user = useUserSate();
  const state = use(ContextProvider);
  useEffect(() => {
    console.log("home", user.userInfo, state);
  }, []);
  return <div>home</div>;
}
