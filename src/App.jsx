import React, { useEffect, } from "react";
import RouterView from "@/routes";
// import "./App.less"
import { KeepAliveProvider } from "keepalive-react-component";
import { getBodySize } from "@/utils";
import { useAllState } from "@/hooks";
import { ContextProvider } from "@/context";
export default function App() {
  const [bodySize, setBodySize] = useAllState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    getBodySize(document.body, (width, height) => {
      const docEl = document.documentElement;
      docEl.style.fontSize = Math.min(width, height) / 100 + "px";
      setBodySize(() => {
        return {
          width,
          height
        }
      })
    });
  }, [])
  return (
    <KeepAliveProvider>
      <ContextProvider value={{ bodySize }}>
        <RouterView></RouterView>
      </ContextProvider>
    </KeepAliveProvider>
  );
}
