import React from "react";
import { Layout, theme } from "antd";
import { Button } from "antd";
import { logOut } from "../../store/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header } = Layout;
  const {
    token: { colorBgContainer, },
  } = theme.useToken();
  const quit = () => {
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <div>
          <Button type="primary" onClick={quit}>
            退出
          </Button>
        </div>
      </Header>
    </>
  );
}
