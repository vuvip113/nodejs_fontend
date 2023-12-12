import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 234px;
    & img {
        height: 283px;
        width: 234px;
        border-radius: 0px !important;
    },
    position: relative;
    border-radius: 0px;
    background-color: ${(props) => (props.disabled ? "#ccc" : "#fff")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")}
`;

export const StyleNameProduct = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  color: rgb(56, 56, 61);
  font-weight: 400;
  padding-bottom: 3px;
  &:hover {
    display: inline-block;
    border-bottom: solid;
    border-bottom-color: rgb(56, 56, 61);
    border-bottom-width: 1px;
  }
`;

export const WrapperReportText = styled.div`
  font-size: 15px;
  color: rgb(128, 128, 137);
  display: flex;
  align-items: center;
  margin: 6px 0 0px;
`;

export const WrapperPriceText = styled.div`
  color: rgb(56, 56, 61);
  font-size: 18px;
  font-weight: 600;
`;

export const WrapperDiscountText = styled.span`
  color: rgb(255, 66, 78);
  font-size: 15px;
  font-weight: 500;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;
