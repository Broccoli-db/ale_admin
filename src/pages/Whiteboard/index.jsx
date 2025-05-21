import React, { useEffect, use, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useUserSate } from "../../store/user";
import { ContextProvider } from "@/context";
import "@excalidraw/excalidraw/index.css";
import sty from "./index.module.scss";
import { Button } from "antd";
export default function Index() {
  const [isCollaborating, setIsCollaborating] = useState(false);
  const user = useUserSate();
  const state = use(ContextProvider);
  useEffect(() => {
    console.log("home", user.userInfo, state);
  }, []);
  const [collaborationId, setCollaborationId] = useState(null);
  const startCollaboration = () => {
    const newCollaborationId = "unique-id"; // 你可以使用唯一标识符
    setCollaborationId(newCollaborationId);
  };
  return (
    <div>
      <div className={sty.excalidraw}>
        <Excalidraw
          collaborationId={collaborationId}
          renderTopRightUI={() => (
            <button onClick={startCollaboration}>
              {collaborationId ? "结束协作" : "开始协作"}
            </button>
          )}
          langCode="zh-CN"
        />
      </div>
    </div>
  );
}


