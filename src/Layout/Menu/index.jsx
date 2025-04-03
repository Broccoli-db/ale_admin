import React, { useState, useMemo, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useMenuItems } from "@/routes";

export default function Index() {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = useMenuItems();
  const [subKey, setSubKey] = useState("/" + location.pathname.split("/")[1]);
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const transformMenu = (items) => {
    return items.map((item) => {
      let { title, path, icon, } = item;
      let titleArr;
      if (item.children) {
        titleArr = item.children
          .filter((item) => !item.isHide)
          .map((item) => getItem(item.title, item.path));
      }
      return getItem(title, path, icon, titleArr);
    });
  };
  const menuClick = (e) => {
    navigate(e.key);
  };
  useEffect(() => {
    setSubKey("/" + location.pathname.split("/")[1]);
  }, [location.pathname]);
  const items = useMemo(() => {
    return transformMenu(menuItems);
  }, [menuItems]);
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          onClick={menuClick}
          openKeys={[subKey]}
          onOpenChange={([, key]) => {
            setSubKey(key);
          }}
        />
      </Sider>
    </>
  );
}
