import React, { Suspense, lazy, useMemo } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import {
  HomeOutlined,
  SettingOutlined,
  BarsOutlined,
  RedditOutlined,
} from "@ant-design/icons";
import Authentication from "@/components/Authentication";
import Loading from "@/components/Loading";
import { useUserSate } from "../store/user";
import { withKeepAlive } from "keepalive-react-component";
const modules = import.meta.glob("/src/pages/**/index.jsx");
const Layout = import.meta.glob("/src/**/index.jsx");
const useRenderElement = function (pageName, isAuth = true, cache = false) {
  const { token } = useUserSate();
  const SusCom = useMemo(() => {
    if (pageName === "Layout") {
      return lazy(() => Layout[`/src/${pageName}/index.jsx`]());
    } else {
      return cache
        ? withKeepAlive(
            lazy(() => modules[`/src/pages/${pageName}/index.jsx`]()),
            { cacheId: pageName, scroll: true }
          )
        : lazy(() => modules[`/src/pages/${pageName}/index.jsx`]());
    }
  }, [pageName]);
  const suspense = (
    <Suspense fallback={<Loading></Loading>}>
      <SusCom />
    </Suspense>
  );
  if (isAuth) return <Authentication>{suspense}</Authentication>;
  else if (token && pageName === "Login") return <Navigate to="/"></Navigate>;
  else return suspense;
};
const useRouter = function () {
  return [
    {
      // 主页
      path: "/",
      element: useRenderElement("Layout"),
      children: [
        {
          // 主页
          path: "/",
          title: "主页",
          icon: <HomeOutlined />,
          element: useRenderElement("Home"),
        },
        ...useFilterRoutes(),
      ],
    },
    {
      // 登陆界面
      path: "/login",
      element: useRenderElement("Login", false),
    },
    {
      // 任意界面
      path: "*",
      element: useRenderElement("NotFound", false),
    },
  ];
};
// 设置动态路由
function useAllAsyncRoutes() {
  return [
    {
      path: "/webFunction",
      title: "相关功能",
      name: "WebFunction",
      icon: <RedditOutlined />,
      element: <Outlet />,
      children: [
        {
          path: "/webFunction",
          isHide: true,
          element: <Navigate to={"/webFunction/whiteboard"} />,
        },
        {
          path: "/webFunction/whiteboard",
          title: "白板",
          name: "Whiteboard",
          element: useRenderElement("Whiteboard", true, true),
        },
        {
          path: "/webFunction/screenSharing",
          title: "屏幕共享",
          name: "ScreenSharing",
          element: useRenderElement("ScreenSharing", true, true),
        },
      ],
    },
    {
      // 系统管理
      path: "/system",
      title: "系统管理",
      name: "System",
      icon: <SettingOutlined />,
      element: <Outlet />,
      children: [
        {
          path: "/system",
          isHide: true,
          element: <Navigate to={"/system/permission"} />,
        },
        {
          path: "/system/permission",
          title: "菜单管理",
          name: "Permission",
          icon: <BarsOutlined />,
          element: useRenderElement("Permission", true, true),
        },
      ],
    },
  ];
}
// 根据用户信息过滤路由
function useFilterRoutes() {
  const { userInfo } = useUserSate();
  let routes = userInfo.routes || [];
  const allAsyncRoutes = useAllAsyncRoutes();
  if (routes[0] === "*") {
    return allAsyncRoutes;
  } else {
    return filterRoutes(allAsyncRoutes, routes);
  }
}
function filterRoutes(allAsyncRoutes, routes) {
  return allAsyncRoutes.filter((item) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length) {
        item.children = filterRoutes(item.children, routes);
      }
      return true;
    }
  });
}
// 获取主页下的的子路由
export const useMenuItems = function () {
  return useRouter().find((item) => item.path === "/").children;
};
// 获取路由标题
// export const useRouteTitle = function () {
//   const { pathname } = useLocation();
//   const menuItems = useMenuItems();
//   const items = useMemo(() => {
//     let itemsArr = [];
//     const [, RoutePath] = pathname.split("/");
//     const oneRoute = menuItems?.find((item) => item.path === "/" + RoutePath);
//     if (oneRoute) {
//       itemsArr.push({ title });
//       if (oneRoute.children) {
//         const towRoute = oneRoute.children.find(
//           (item) => item.path === pathname
//         );
//         if (towRoute) {
//           itemsArr.push({ title });
//         }
//       }
//     }
//     return itemsArr;
//   }, [pathname]);
//   return items;
// };
export default function RouterView() {
  return useRoutes(useRouter());
}
