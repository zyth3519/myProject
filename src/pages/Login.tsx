import React from "react";
import { Form, Input, Button, Card, Typography, Col, Row, message } from "antd";
import { loginAPI } from "../services/auth";
import login = loginType.login;
import { setToken } from "../utils/tool";
import { useHistory } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const { replace } = useHistory();
  const onFinish = async ({ userName, password }: login) => {
    const res = await loginAPI(userName, password);
    if (res.code == 1) {
      message.success("登录成功");
      setToken(res.data);
      replace("/admin/doshboard");
    } else {
      message.warning("登录失败");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage:
          "url(https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png)",
        backgroundColor: "#b8e5f8",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Row align={"middle"}>
        <Col span={8} push={8}>
          <Card className="loginForm">
            <Form name="basic" onFinish={onFinish}>
              <Title style={{ textAlign: "center" }}>MP</Title>
              <Form.Item
                style={{
                  borderBottom: "1px solid #cecece",
                  margin: "30px 0",
                }}
                name="userName"
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Input bordered={false} placeholder="请输入用户名" />
              </Form.Item>

              <Form.Item
                style={{
                  borderBottom: "1px solid #cecece",
                  margin: "30px 0",
                }}
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
              >
                <Input.Password bordered={false} placeholder="请输入密码" />
              </Form.Item>

              <Form.Item style={{ width: "100%" }}>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
