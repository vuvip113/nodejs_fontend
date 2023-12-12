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
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import Loding from "../../components/LoadingComponent/Loding";
import useMutationHook from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Massage";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const mutation = useMutationHook((data) => UserService.signupUser(data));
  const { data, isLoading, isSuccess, isError } = mutation;

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
  };

  useEffect(() => {
    if (data?.status === "ERR") {
      // message.success();
      message.error();
      // handleNavigateSignIn();
      // console.log("sagljdjlsajlsjlgdsalsahlk");
    } else if (isSuccess) {
      // message.error();
      message.success();
      // console.log("haka::::");
      handleNavigateSignIn();
    }
  }, [isSuccess, isError]);

  return (
    <div>
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
              style={{ marginBottom: "10px" }}
              placeholder="password"
              type="password"
              value={password}
              onChange={handleOnchangePassword}
            />
            <InputForm
              placeholder="confirm password"
              type="password"
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
            {data?.status === "ERR" && (
              <span style={{ color: "red" }}>{data?.message}</span>
            )}
            <Loding isLoading={isLoading}>
              <Btn
                disabled={
                  !email.length || !password.length || !confirmPassword.length
                }
                onClick={handleSignUp}
                styleButton={{
                  background: "#000",
                  height: "48px",
                  width: "100%",
                  borderRadius: "0px",
                  margin: "20px 0 20px",
                }}
                size={40}
                textbutton={"Đăng ký"}
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
              Ban da co tai khoan?{" "}
              <WrapperTextLight onClick={handleNavigateSignIn}>
                Dang nhap
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
    </div>
  );
};

export default SignUpPage;
