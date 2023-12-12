import React, { useEffect, useMemo, useState } from "react";
import {
  CustomCheckbox,
  WrapperCountOrder,
  WrapperInfo,
  WrapperLeft,
  WrapperRight,
  WrapperStyleHeaderDilivery,
  WrapperTotal,
  WrapperStyleHeader,
  WrapperListOrder,
  WrapperItemOrder,
  WrapperPriceDiscount,
} from "./style";
import anh1 from "../../assets/images/1.webp";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import Btn from "../../components/Btn/Btn";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "./../../utils";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import InputComponents from "../../components/Input/InputComponents";
import { Button, Form } from "antd";
import useMutationHook from "../../hooks/useMutationHook";
import Loding from "../../components/LoadingComponent/Loding";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Massage";
import { updateUser } from "../../redux/slides/userSlice";
import { useNavigate } from "react-router-dom";
import StepComponent from "../../components/StepConponent/StepComponent";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  const [listChecked, setListChecked] = useState([]);
  const dispatch = useDispatch();
  // console.log("order", order);
  const navigate = useNavigate();

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [form] = Form.useForm();

  const onChange = (e) => {
    // console.log(`checked = ${e.target.value}`);
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        ...stateUserDetails,
        city: user?.city,
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  // console.log("listcheckes", listChecked);
  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      const totalDiscount = cur.discount ? cur.discount : 0;
      return total + (priceMemo * totalDiscount) / 100;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo > 200000 && priceMemo < 500000) {
      return 10000;
    } else if (priceMemo >= 500000 || order?.orderItemsSelected?.length === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleAddCard = () => {
    // console.log("user", user);
    if (!order.orderItemsSelected?.length) {
      message.error("Vui long chon san pham");
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };

  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isLoading, data } = mutationUpdate;

  // console.log("data", data);

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handleOnchangeDetails = (e) => {
    // console.log("lol", e.target.name, e.target.value);
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const itemsDelivery = [
    {
      title: "20.000 VND",
      description: "Dưới 200.000 VND",
    },
    {
      title: "10.000 VND",
      description: "Từ 200.000 VND đến dưới 500.000 VND",
    },
    {
      title: "Free ship",
      description: "Trên 500.000 VND",
    },
  ];

  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3 style={{ fontWeight: "bold" }}>Giỏ hàng</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeaderDilivery>
              <StepComponent
                items={itemsDelivery}
                current={
                  diliveryPriceMemo === 10000
                    ? 2
                    : diliveryPriceMemo === 20000
                    ? 1
                    : order.orderItemsSelected.length === 0
                    ? 0
                    : 3
                }
              />
            </WrapperStyleHeaderDilivery>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems?.length}
                ></CustomCheckbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                // console.log("checked order", order);
                return (
                  <WrapperItemOrder>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <CustomCheckbox
                        onChange={onChange}
                        value={order?.product}
                        checked={listChecked.includes(order?.product)}
                      ></CustomCheckbox>
                      <img
                        src={order?.image}
                        style={{
                          width: "80px",
                          height: "82px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          paddingLeft: "10px",
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                        <div style={{ color: "red" }}>
                          {order?.discount
                            ? "sale: " + order?.discount + "%"
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "13px", color: "#242424" }}>
                          {convertPrice(order?.price)}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "decrease",
                              order?.product,
                              order?.amount === 1
                            )
                          }
                        >
                          <MinusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                        <WrapperInputNumber
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                          min={1}
                          max={order?.countInstock}
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount(
                              "increase",
                              order?.product,
                              order?.amount === order.countInstock,
                              order?.amount === 1
                            )
                          }
                        >
                          <PlusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                      </WrapperCountOrder>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(order?.price * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: "bold" }}>
                    {`${user?.address} ${user?.city}`}{" "}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ color: "#9255FD", cursor: "pointer" }}
                  >
                    Thay đổi
                  </span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Tạm tính</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Giảm giá</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(priceDiscountMemo)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Phí giao hàng</span>
                  <span
                    style={{
                      color: "#000",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(diliveryPriceMemo)}
                  </span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      color: "rgb(254, 56, 52)",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {convertPrice(totalPriceMemo)}
                  </span>
                  <span style={{ color: "#000", fontSize: "11px" }}>
                    (Đã bao gồm VAT nếu có)
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <Btn
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                background: "rgb(0, 0, 0)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
                with: "100%",
              }}
              textbutton={"Mua hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></Btn>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        forceRender
        title="Cap Nhat tt Giao Hang"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInforUser}
      >
        <Loding isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <InputComponents
                value={stateUserDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your Phone!" }]}
            >
              <InputComponents
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <InputComponents
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <InputComponents
                value={stateUserDetails["city"]}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
          </Form>
        </Loding>
      </ModalComponent>
    </div>
  );
};

export default OrderPage;
