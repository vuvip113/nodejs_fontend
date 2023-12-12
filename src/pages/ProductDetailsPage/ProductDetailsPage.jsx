import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log("parasm", parasm);
  return (
    <div
      style={{ height: "100vh", width: "100%", backgroundColor: "#efefefef" }}
    >
      <div
        style={{
          // width: "1270px",
          padding: "0 120px",
          height: "100%",
          margin: "0 auto",
        }}
      >
        <h5>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Trang Chu
          </span>{" "}
          - Chi Tiet San Pham
        </h5>
        <div>
          <ProductDetailsComponent idProduct={id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
