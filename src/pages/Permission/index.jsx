import React, { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // 相当于 Vue 中的 "activated"
    console.log("Component activated (mounted)");

    return () => {
      // 相当于 Vue 中的 "deactivated"
      console.log("Component deactivated (unmounted)");
    };
  }, []);
  return (
    <div style={{ height: "80vh", overflowY: "auto" }}>
      <div style={{ height: "200vh" }}>菜单</div>
    </div>
  );
}
