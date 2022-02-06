import { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  FundProjectionScreenOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../assets/main.css";
import { Route, Switch, useHistory } from "react-router-dom";
import Users from "./Users";
import Orders from "./Users/Orders";
import Products from "./Products";
import ProductCategories from "./Products/ProductCategories";
import Board from "./Board";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Main = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };
  const { push } = useHistory();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">MP</div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={(key) => {
            {
              /*点击之后实现跳转效果*/
            }
            push(key.key);
          }}
        >
          <Menu.Item key="/admin/doshboard" icon={<DesktopOutlined />}>
            看板
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
            <Menu.Item key="/admin/users">用户信息</Menu.Item>
            <Menu.Item key="/admin/orders">订单管理</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<FundProjectionScreenOutlined />}
            title="商品管理"
          >
            <Menu.Item key="/admin/products">商品信息</Menu.Item>
            <Menu.Item key="/admin/product_categories">商品分类</Menu.Item>
          </SubMenu>
          {/*<SubMenu key="sub3" icon={<BankOutlined />} title="轮播图管理">*/}
          {/*  <Menu.Item key="5">轮播图分类</Menu.Item>*/}
          {/*  <Menu.Item key="6">轮播图信息</Menu.Item>*/}
          {/*</SubMenu>*/}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "8px 16px" }}>
          <Switch>
            <Route path="/admin/doshboard">
              <Board />
            </Route>
            <Route path="/admin/users">
              <Users />
            </Route>
            <Route path="/admin/orders">
              <Orders />
            </Route>
            <Route path="/admin/products">
              <Products />
            </Route>
            <Route path="/admin/product_categories">
              <ProductCategories />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          MP ©2022 Created by MP TEAM
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
