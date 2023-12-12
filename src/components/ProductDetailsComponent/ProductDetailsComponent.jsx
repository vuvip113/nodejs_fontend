import { Button, Col, Image, Rate, Row } from "antd";
import React, { useState } from "react";
import imageSmall from "../../assets/images/imagesmall.webp";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  WrapperAddressProduct,
  WrapperAddressProduct1,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";
import Btn from "../Btn/Btn";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loding from "../LoadingComponent/Loding";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import { useEffect } from "react";
import * as message from "../Message/Massage";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setNumProduct(Number(value));
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  const { isLoading, data: productDetails } = useQuery(
    ["product-details", idProduct],
    fetchGetDetailsProduct,
    {
      enabled: !!idProduct,
    }
  );

  useEffect(() => {
    if (order.isSucessOrder) {
      message.success("Đã thêm vào giỏ hàng");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSucessOrder]);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  // console.log("productDetails", productDetails);

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInstock: productDetails?.countInStock,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  console.log("productDetails?.image1", productDetails?.image1);

  return (
    <Loding isLoading={isLoading}>
      <Row
        style={{
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "4px",
        }}
      >
        <Col
          span={10}
          style={{ borderRight: "1px solid #e5e5e5", paddingRight: "10px" }}
        >
          <Image src={productDetails?.image} preview={false} alt="cc" />
          <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            <WrapperStyleColImage span={4}>
              {}
              <WrapperStyleImageSmall
                src={
                  productDetails?.image1 != ""
                    ? productDetails?.image1
                    : imageSmall
                }
                alt="ccsmal"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={imageSmall}
                alt="ccsmal"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={imageSmall}
                alt="ccsmal"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={imageSmall}
                alt="ccsmal"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={imageSmall}
                alt="ccsmal"
                preview={false}
              />
            </WrapperStyleColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: "15px" }}>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <div>
            <Rate
              allowHalf
              defaultValue={productDetails?.rating}
              value={productDetails?.rating}
            />
            <WrapperStyleTextSell> | da ban 100+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productDetails?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao Hang </span>
            <span className="address">{user?.address}</span> -
            <span className="change-address">Doi Dia Chi</span>
          </WrapperAddressProduct>
          <LikeButtonComponent
            dataHref={
              process.env.REACT_APP_IS_LOCAL
                ? "https://developers.facebook.com/docs/plugins/"
                : window.location.href
            }
          />
          <div
            style={{
              margin: "10px 0 20px",
              padding: "10px 0",
              borderBottom: "1px solid #e5e5e5e5",
              borderTop: "1px solid #e5e5e5e5",
            }}
          >
            <div>So luong</div>
            <WrapperQualityProduct>
              <Button
                style={{ border: "none" }}
                onClick={() => {
                  handleChangeCount("decrease", numProduct === 1);
                }}
              >
                <MinusOutlined style={{ color: "#000", fontSize: "10" }} />
              </Button>

              <WrapperInputNumber
                defaultValue={1}
                onChange={onChange}
                value={numProduct}
                size="small"
                min={1}
                max={productDetails?.countInStock}
              />

              <Button
                style={{ border: "none" }}
                onClick={() => {
                  handleChangeCount(
                    "increase",
                    numProduct === productDetails?.countInStock
                  );
                }}
              >
                <PlusOutlined style={{ color: "#000", fontSize: "10" }} />
              </Button>
            </WrapperQualityProduct>
            {errorLimitOrder && (
              <div style={{ color: "red" }}>San pham het hang</div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div>
              <Btn
                styleButton={{
                  background: "#000",
                  height: "48px",
                  width: "220px",
                  borderRadius: "0px",
                }}
                onClick={handleAddOrderProduct}
                size={40}
                textbutton={"Chon Mua"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              />
            </div>
            <Btn
              styleButton={{
                height: "48px",
                width: "220px",
                borderRadius: "0px",
                border: "1px soild #000",
              }}
              size={40}
              textbutton={"Mua Tra Sau"}
              styleTextButton={{ color: "blue", fontSize: "15px" }}
            />
          </div>
          <WrapperAddressProduct1>
            <div>- Thong Tin San Pham</div>
            <span>{productDetails?.description}</span>
          </WrapperAddressProduct1>
        </Col>
        <CommentComponent
          dataHref={
            process.env.REACT_APP_IS_LOCAL
              ? "https://developers.facebook.com/docs/plugins/comments#configurator"
              : window.location.href
          }
          width="1270"
        />
      </Row>
    </Loding>
  );
};

export default ProductDetailsComponent;
