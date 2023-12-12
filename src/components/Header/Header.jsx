import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import Loding from "../LoadingComponent/Loding";
import {
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeader1,
  WrapperHeaderAccout,
  WrapperSliderStyle,
  WrapperText3,
  WrapperTextHeader,
  WrapperTextHeader1,
  WrapperTextHeaderSmall,
} from "./style";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
  DownOutlined,
} from "@ant-design/icons";
import BtnSearch from "../Btn/BtnSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { searchProduct } from "../../redux/slides/productSlide";
import { resetUser } from "../../redux/slides/userSlice";

const Header = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    setUserName(user?.name);

    setUserAvatar(user?.avatar);
    // console.log("Update");

    setLoading(false);
  }, [user?.name, user?.avatar]);

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate(`my-order`)}>
        Đơn hàng của tui
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // arrow: false,
  };

  return (
    <div>
      <div
        style={{
          padding: "10px 300px",
          justifyContent: "center",
          backgroundColor: "#121212",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <WrapperSliderStyle {...settings}>
          <WrapperTextHeader1>
            Subscribe to our newsletter for early access and exclusive deals.
          </WrapperTextHeader1>
          <WrapperTextHeader1>DESIGN IN NEW YORK</WrapperTextHeader1>
          <WrapperTextHeader1>DEVELOP BY VANITA$</WrapperTextHeader1>
        </WrapperSliderStyle>
      </div>
      <div>
        <WrapperHeader style={{ justifyContent: "space-between" }}>
          <Col span={5}>
            <WrapperTextHeader
              onClick={() => {
                navigate("/");
              }}
            >
              Vfashx
            </WrapperTextHeader>
          </Col>
          {!isHiddenSearch && (
            <Col span={13}>
              <BtnSearch
                size="medium"
                bordered={false}
                textbutton="Tìm kiếm"
                placeholder="input search text"
                background="#000"
                onChange={onSearch}
              />
            </Col>
          )}

          <Col
            span={6}
            style={{ display: "flex", gap: "25px", alignItems: "center" }}
          >
            {!isHiddenCart && (
              <div
                onClick={() => navigate("/order")}
                style={{ cursor: "pointer", marginLeft: "50px" }}
              >
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined
                    style={{ fontSize: "27px", color: "black" }}
                  />
                </Badge>
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
              </div>
            )}
            <Loding isLoading={loading}>
              <WrapperHeaderAccout>
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="avatar"
                    style={{
                      height: "35px",
                      width: "35px",
                      borderRadius: "25%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <UserOutlined
                    style={{
                      fontSize: "30px",
                      color: "black",
                    }}
                  />
                )}
                {user?.access_token ? (
                  <>
                    <Popover
                      content={content}
                      trigger="click"
                      open={isOpenPopup}
                    >
                      <div
                        style={{
                          cursor: "pointer",
                          maxWidth: 100,
                          color: "black",
                        }}
                        onClick={() => setIsOpenPopup((prev) => !prev)}
                      >
                        {userName?.length ? userName : user?.email}
                        <DownOutlined
                          style={{
                            marginLeft: "3px",
                            fontSize: "10px",
                            color: "black",
                          }}
                        />
                      </div>
                    </Popover>
                  </>
                ) : (
                  <div
                    onClick={handleNavigateLogin}
                    style={{ cursor: "pointer" }}
                  >
                    <WrapperTextHeaderSmall>
                      Đăng nhập/Đăng ký
                    </WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </WrapperHeaderAccout>
            </Loding>
          </Col>
        </WrapperHeader>
      </div>
    </div>
  );
};

export default Header;
