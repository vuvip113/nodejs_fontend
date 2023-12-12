import React, { useEffect, useState } from "react";
import { WrapperHeader } from "../../components/Header/style";
import {
  Btncss,
  WrapperContentProfile,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import Btn from "../../components/Btn/Btn";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import useMutationHook from "../../hooks/useMutationHook";
import Loding from "../../components/LoadingComponent/Loding";
import * as message from "../../components/Message/Massage";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlice";
import { Button, Col, Row, Upload } from "antd";
import { UploadOutlined, RightOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });
  const { isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isError) {
      // message.success();
      message.error();
      // handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    }
  }, [isError, isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      phone,
      name,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loding isLoading={isLoading}>
        <WrapperContentProfile>
          <Row
            style={{
              padding: "16px",
              backgroundColor: "#fff",
              borderRadius: "4px",
            }}
          >
            <Col
              span={8}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRight: "1px solid #e5e5e5",
                paddingRight: "10px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <WrapperLabel style={{ textAlign: "center" }} htmlFor="avtar">
                  Avatar
                </WrapperLabel>
                {avatar && (
                  <img
                    src={avatar}
                    style={{
                      height: "200px",
                      width: "200px",
                      borderRadius: "25%",
                      objectFit: "cover",
                      marginBottom: "50px",
                    }}
                    alt="avatar"
                  />
                )}
                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </WrapperUploadFile>
              </div>
            </Col>
            <Col span={16} style={{ paddingLeft: "10px" }}>
              <WrapperInput>
                <WrapperLabel htmlFor="name">Name</WrapperLabel>
                <InputForm
                  value={name}
                  id="name"
                  onChange={handleOnchangeName}
                />
              </WrapperInput>
              <WrapperInput>
                <WrapperLabel htmlFor="email">Email</WrapperLabel>
                <InputForm
                  disabled
                  value={email}
                  id="email"
                  onChange={handleOnchangeEmail}
                />
              </WrapperInput>
              <WrapperInput>
                <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                <InputForm
                  value={phone}
                  id="phone"
                  onChange={handleOnchangePhone}
                />
              </WrapperInput>
              <WrapperInput>
                <WrapperLabel htmlFor="address">address</WrapperLabel>
                <InputForm
                  value={address}
                  id="address"
                  onChange={handleOnchangeAddress}
                />
              </WrapperInput>
              <Btncss
                style={{ float: "right", marginRight: "20px" }}
                onClick={handleUpdate}
              >
                {/* <i class="fa fa-caret-right"></i> */}
                <RightOutlined />
                UPDATE
              </Btncss>
              {/* <Btn
                onClick={handleUpdate}
                styleButton={{
                  background: "#000",
                  height: "30px",
                  width: "fit-content",
                  borderRadius: "0px",
                  margin: "20px 0 20px",
                }}
                size={40}
                textbutton={"Cap Nhat"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></Btn> */}
            </Col>
          </Row>
        </WrapperContentProfile>
      </Loding>
    </div>
  );
};

export default ProfilePage;
