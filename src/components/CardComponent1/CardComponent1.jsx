import Meta from "antd/es/card/Meta";
import React from "react";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
} from "./style";
import { StarOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const CardComponent1 = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
  } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  return (
    <WrapperCardStyle
      hoverable
      // bodyStyle={{ padding: "10px" }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailsProduct(id)}
    >
      <img
        src={logo}
        style={{
          width: "70px",
          height: "18px",
          position: "absolute",
          top: 0,
          left: 0,
          // borderTopLeftRadius: "10px",
        }}
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: "4px" }}>
          <span>{rating}</span>
          <StarOutlined style={{ fontSize: "15px", color: "red" }} />
        </span>
        <span> | da ban {selled || 100}+</span>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: "8px" }}>{price}</span>
        <WrapperDiscountText>- {discount || 5} %</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent1;
