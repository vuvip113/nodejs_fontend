import { Button } from "antd";
import React from "react";

const Btn = ({
  size,
  styleButton,
  styleTextButton,
  textbutton,
  disabled,
  ...rests
}) => {
  return (
    <Button
      style={{
        ...styleButton,
        background: disabled ? "#ccc" : styleButton.background,
        border: disabled ? "1px solid #ccc" : styleButton.border,
      }}
      size={size}
      {...rests}
    >
      <span style={styleTextButton}>{textbutton}</span>
    </Button>
  );
};

export default Btn;
