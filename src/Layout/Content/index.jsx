import React from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";

export default function Index() {
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Content
        style={{
          margin: " 16px",
          marginBottom: 0,
        }}
      >
        {/* <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
        <div
          style={{
            padding: 24,
            minHeight: 360,
            height: "calc(100vh - 148px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </>
  );
}
