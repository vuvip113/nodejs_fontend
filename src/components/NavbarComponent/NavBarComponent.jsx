import React from "react";
import {
  WrapperContent,
  WrapperLableText,
  WrapperTextPrice,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";

const NavBarComponent = () => {
  const onChange = () => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((options) => {
          return <WrapperTextValue>{options}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onChange={onChange}
          >
            {options.map((options) => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={options.value}>
                  {options.lable}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((options) => {
          return (
            <div style={{ display: "flex", gap: "4px" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={options}
              />
              <span>{`tu ${options} sao`}</span>
            </div>
          );
        });
      case "price":
        return options.map((options) => {
          return <WrapperTextPrice>{options}</WrapperTextPrice>;
        });
      default:
        return {};
    }
  };
  return (
    <div>
      <WrapperLableText>Label</WrapperLableText>
      <WrapperContent>
        {renderContent("text", ["cc1", "cc2", "cc3", "cc4"])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("checkbox", [
          { value: "a", lable: "A" },
          { value: "b", lable: "B" },
        ])}
      </WrapperContent>
      <WrapperContent>{renderContent("star", [1, 2, 3])}</WrapperContent>
      <WrapperContent>
        {renderContent("price", ["duoi 40", "Tren 500.000"])}
      </WrapperContent>
    </div>
  );
};

export default NavBarComponent;
