import React from "react";
import { Layout } from "antd";
export default function Index() {
  const { Footer } = Layout;
  return (
    <>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </>
  );
}
