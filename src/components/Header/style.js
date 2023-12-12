import { Row } from "antd";
import { styled } from "styled-components";
import Slider from "react-slick";

export const WrapperSliderStyle = styled(Slider)`
  & .slick-arrow.slick-prev {
    // left: 12px;
    // top: 50%;
    // z-index: 10;
    // &::before {
    //   font-size: 40px;
    //   color: #fff;
    // }
    display: none !important;
  }
  & .slick-arrow.slick-next {
    // right: 28px;
    // top: 50%;
    // z-index: 10;
    // &::before {
    //   font-size: 40px;
    //   color: #fff;
    // }
    display: none !important;
  }
  & .slick-dots {
    z-index: 10;
    bottom: -2px !important;
    li {
      button {
        &::before {
          color: rgb(255, 255, 0.5);
        }
      }
    }
    li.active {
      button {
        &::before {
          color: #fff;
        }
      }
    }
  }
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  color: black;
`;

export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  max-width: 200px;
`;

export const WrapperHeader = styled(Row)`
  padding: 10px 200px;
  background-color: #ffffff;
  align-items: center;
  font-family: "Assistant", sans-serif;
  font-family: "Quicksand", sans-serif;
`;

export const WrapperHeader1 = styled(Row)`
  padding: 0px 120px;
  justify-content: center;
  background-color: #121212;
  align-items: center;
`;

export const WrapperTextHeader = styled.span`
  color: black;
  font-weight: bold;
  letter-spacing: 10px;
  text-align: left;
  font-size: 25px;
  cursor: pointer;
`;

export const WrapperTextHeader1 = styled.span`
  color: white;
`;

export const WrapperText3 = styled.span`
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;
