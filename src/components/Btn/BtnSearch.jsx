import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import Btn from "./Btn";
import InputComponents from "../Input/InputComponents";

const BtnSearch = (props) => {
  const {
    size,
    placeholder,
    textbutton,
    bordered,
    backgroundColorInput = "#fff",
    backgroundColorButton = "#000",
    colorButton = "#fff",
  } = props;
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid #d9d9d9",
        borderRadius: "8px",
      }}
    >
      <InputComponents
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <Btn
        size={size}
        styleButton={{
          background: backgroundColorButton,
          border: !bordered && "none",
        }}
        icon={<SearchOutlined color={colorButton} style={{ color: "#fff" }} />}
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
      />
    </div>
  );
};

export default BtnSearch;
