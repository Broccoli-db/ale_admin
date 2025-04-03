import React from "react";
import { Layout } from "antd";
import Menu from "./Menu";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
const App = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* 左侧边栏 */}
      <Menu></Menu>
      {/* 右侧内容 */}
      <Layout>
        {/* 头部 */}
        <Header></Header>
        {/* 主体内容 */}
        <Content></Content>
        {/* 底部 */}
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};
export default App;
