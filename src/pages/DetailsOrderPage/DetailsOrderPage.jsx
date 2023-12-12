import React from "react";
import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItem1,
  WrapperItemLabel,
  WrapperLabel,
  WrapperLeft,
  WrapperNameProduct,
  WrapperProduct,
  WrapperRight,
  WrapperStyleContent,
} from "./style";
import logo from "../../assets/images/logo.png";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import Loding from "../../components/LoadingComponent/Loding";

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery(
    { queryKey: ["orders-details"], queryFn: fetchDetailsOrder },
    {
      enabled: id,
    }
  );
  const { isLoading, data } = queryOrder;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <Loding isLoading={isLoading}>
      <div style={{ width: "100%", height: "100vh", background: "#f5f5fa" }}>
        <div style={{ width: "1270px", margin: "0 auto", height: "1270px" }}>
          <h4>Chi tiết đơn hàng</h4>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
              <WrapperContentInfo>
                <div className="name-info">
                  <span>Ten: </span> {data?.shippingAddress?.fullName}
                </div>
                <div className="address-info">
                  <span>Địa chỉ: </span>{" "}
                  {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
                </div>
                <div className="phone-info">
                  <span>Điện thoại: </span> {data?.shippingAddress?.phone}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức giao hàng</WrapperLabel>
              <WrapperContentInfo>
                <div className="delivery-info">
                  <span className="name-delivery">FAST </span>Giao hàng tiết
                  kiệm
                </div>
                <div className="delivery-fee">
                  <span>Phí giao hàng: </span> {data?.shippingPrice}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div className="payment-info">
                  {orderContant.payment[data?.paymentMethod]}
                </div>
                <div className="status-payment">
                  {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>

          <WrapperStyleContent>
            <WrapperLeft>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #e5e5e5e5",
                }}
              >
                <div style={{ width: "670px" }}>Sản phẩm</div>
                <WrapperItemLabel>Giá</WrapperItemLabel>
                <WrapperItemLabel>Số lượng</WrapperItemLabel>
                <WrapperItemLabel>Giảm giá</WrapperItemLabel>
              </div>
              {data?.orderItems?.map((order) => {
                return (
                  <WrapperProduct>
                    <WrapperNameProduct key={order?._id}>
                      <img
                        src={order?.image}
                        style={{
                          width: "90px",
                          height: "100px",
                          objectFit: "cover",
                          border: "1px solid rgb(238, 238, 238)",
                          padding: "2px",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          marginLeft: "10px",
                          height: "70px",
                        }}
                      >
                        {order?.name}
                      </div>
                    </WrapperNameProduct>
                    <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                    <WrapperItem>{order?.amount}</WrapperItem>
                    <WrapperItem>
                      {order?.discount
                        ? convertPrice((priceMemo * order?.discount) / 100)
                        : "0 VND"}
                    </WrapperItem>
                  </WrapperProduct>
                );
              })}
            </WrapperLeft>
            <WrapperRight>
              <WrapperAllPrice>
                <WrapperItemLabel>Tạm tính</WrapperItemLabel>
                <WrapperItem1>{convertPrice(priceMemo)}</WrapperItem1>
              </WrapperAllPrice>
              <WrapperAllPrice>
                <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                <WrapperItem1>{convertPrice(data?.shippingPrice)}</WrapperItem1>
              </WrapperAllPrice>
              <WrapperAllPrice>
                <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
                <WrapperItem>
                  <WrapperItem1 style={{ fontSize: "20px" }}>
                    {convertPrice(data?.totalPrice)}
                  </WrapperItem1>
                </WrapperItem>
              </WrapperAllPrice>
            </WrapperRight>
          </WrapperStyleContent>
        </div>
      </div>
    </Loding>
  );
};

export default DetailsOrderPage;
