import React, { useEffect, useState } from "react";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import Btn from "../../components/Btn/Btn";
import { Image } from "antd";
import imageLogo from "../../assets/images/logo-login.png";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import useMutationHook from "../../hooks/useMutationHook";
import Loding from "../../components/LoadingComponent/Loding";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlice";
import * as message from "../../components/Message/Massage";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const mutation = useMutationHook((data) => UserService.loginUser(data));

  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    if (data?.status === "ERR") {
      message.error();
    } else if (isSuccess) {
      message.success();
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem("access_token", JSON.stringify(data?.refresh_token));
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) =>
  {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  // console.log("mutation", mutation);

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangePassword = (value) => {
    setPassword(value);
  };
  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
    // console.log("sign-in", email, password);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ccc",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          backgroundColor: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin Chao</h1>
          <p>Dang Nhap vao tai khoan</p>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <InputForm
            placeholder="password"
            type="password"
            value={password}
            onChange={handleOnchangePassword}
          />
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loding isLoading={isLoading}>
            <Btn
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              styleButton={{
                background: "#000",
                height: "48px",
                width: "100%",
                borderRadius: "0px",
                margin: "20px 0 20px",
              }}
              size={40}
              textbutton={"Dang Nhap"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></Btn>
          </Loding>

          <p>
            <WrapperTextLight>Quen Mat Khau</WrapperTextLight>
          </p>
          <p>
            Chua co tai khoan?{" "}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Tao tai khoan
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="123"
            height="230px"
            width="230px"
          />
          <h4>Mua sam tai Vfashx</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
