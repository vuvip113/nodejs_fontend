import styled from "styled-components";
import Btn from "../../components/Btn/Btn";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: flex-start;
  height: 44px;
`;

export const WrapperButtonMore = styled(Btn)`
  &:hover {
    color: #fff;
    background: black;
    span {
      color: #fff;
    }
  }
  width: 100%;
  color: black;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointers")};
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 20px;
  flex-wrap: wrap;
`;
export const WrapperProducts1 = styled.div`
  display: flex;
  // gap: 14px;
  margin-top: 20px;
  flex-wrap: wrap;
  // padding: "0px 203px";
`;
