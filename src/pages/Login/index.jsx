import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import { useAllState } from "@/hooks";
import sty from "./index.module.scss";
import { logIn } from "../../store/user";
import { useDispatch, } from "react-redux";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
export default function Index() {
  const navigate = useNavigate();
  const container = useRef(null);
  const [show, setShow] = useState(false);
  const [loginInfo,] = useAllState({
    username: "admin",
    password: "123456",
  });
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => { });
  const SignUp = () => {
    setShow(true);
  };
  const SignIn = () => {
    setShow(false);
  };
  // 登录校验成功回调
  const onLoginFinish = async (values) => {
    try {
      const data = await dispatch(logIn(values));
      if (data.payload.code == 200) {
        navigate("/", {
          replace: true,
        });
      } else {
        messageApi.open({
          type: "error",
          // content: data.payload.message,
          content: "用户名或密码错误",
        });
      }
    } catch (error) {
      console.log(error);
    }

    // console.log("Success:", values);
  };
  // 登录校验失败回调
  const onLoginFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // 注册校验成功回调
  const onRegisterFinish = (values) => {
    console.log("Success:", values);
  };
  // 注册校验失败回调
  const onRegisterFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={sty.box}>
      {contextHolder}
      <div className={sty.left}>
        <div
          className={`${sty.container} ${show ? sty.right_panel_active : ""}`}
          ref={container}
          id="container"
        >
          <div className={`${sty.form_container} ${sty.sign_up_container}`}>
            <Form
              name="register"
              onFinish={onRegisterFinish}
              onFinishFailed={onRegisterFailed}
              autoComplete="off"
              initialValues={{}}
            >
              <h1 className="login_title">注 册</h1>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入用户昵称!",
                  },
                ]}
              >
                <Input placeholder="用户昵称" />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "请输入手机号!",
                  },
                  {
                    pattern: /^1[3456789]\d{9}$/,
                    message: "请输入正确的手机号!",
                  },
                ]}
              >
                <Input placeholder="手机号码" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "请输入邮箱!",
                  },
                  {
                    type: "email",
                    message: "请输入正确的邮箱!",
                  },
                ]}
              >
                <Input placeholder="邮箱" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码!",
                  },
                ]}
              >
                <Input.Password placeholder="密码" />
              </Form.Item>
              <Form.Item
                name="verifyPassword"
                rules={[
                  {
                    required: true,
                    message: "请输入密码!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("两次密码不一致!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="确认密码" />
              </Form.Item>
              <Form.Item label={null}>
                <Button htmlType="submit">注 册</Button>
              </Form.Item>
            </Form>
          </div>
          <div className={`${sty.form_container} ${sty.sign_in_container}`}>
            <Form
              name="login"
              onFinish={onLoginFinish}
              onFinishFailed={onLoginFailed}
              autoComplete="off"
              initialValues={loginInfo}
            >
              <h1 className="login_title">登 录</h1>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请输入账号/手机号码/邮箱!",
                  },
                ]}
              >
                <Input placeholder="账号/手机号码/邮箱" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请输入密码!",
                  },
                ]}
              >
                <Input.Password placeholder="密码" />
              </Form.Item>
              <Form.Item label={null}>
                <Button htmlType="submit">登 录</Button>
              </Form.Item>
            </Form>
          </div>
          <div className={sty.overlay_container}>
            <div className={sty.overlay}>
              <div className={`${sty.overlay_panel} ${sty.overlay_left}`}>
                <h1>欢迎回来!</h1>
                <p>为了保持联系，请使用您的个人信息登录。</p>
                <button className={sty.ghost} onClick={SignIn} id="signIn">
                  登 录
                </button>
              </div>
              <div className={`${sty.overlay_panel} ${sty.overlay_right}`}>
                <h1>你好，朋友!</h1>
                <p>请输入您的个人信息，开始与我们一起的旅程！</p>
                <button className={sty.ghost} onClick={SignUp} id="signUp">
                  注 册
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={sty.right}></div>
    </div>
  );
}
