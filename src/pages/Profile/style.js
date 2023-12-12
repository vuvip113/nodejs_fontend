import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 18px;
  margin: 4px 0;
`;
export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 800px;
  margin: 0 auto;
  padding: 30px;
  border-radius: 10px;
  gap: 30px;
`;

export const WrapperLabel = styled.label`
  color: #000;
  font-size: 14px;
  line-height: 30px;
  font-weight: 600;
  width: 60px;
  text-align: left;
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: cemter;
  gap: 25px;
  padding: 20px;
`;

export const Btncss = styled.a`
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: 0.25em 0.5em;
  text-decoration: none;
  border-bottom: solid 3px #000;
  border-left: solid 3px #000;
  color: #668ad8;
  transition: 0.4s;

  &:hover {
    padding-left: 0.7em;
    padding-right: 0.3em;
  }
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  & .ant-upload-list-text {
    display: none;
  }
`;
