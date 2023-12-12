import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import OrderAdmin from "../../components/OrderAdmin/OrderAmin";

const AdminPage = () => {
  const items = [
    getItem("Nguoi Dung", "user", <UserOutlined />),
    getItem("San Pham", "product", <AppstoreOutlined />),
    getItem("Don Hang", "order", <ShoppingOutlined />),
  ];

  const [keySelected, setKeySelected] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <OrderAdmin />;
      default:
        <></>;
    }
  };

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };
  // console.log("KeySelected ", keySelected);
  return (
    <>
      <Header isHiddenSearch isHiddenCart />
      <div
        style={{
          display: "flex",
        }}
      >
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: "1px 1px 2px #ccc",
            height: "100vh",
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: "1", padding: "15px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPage;
