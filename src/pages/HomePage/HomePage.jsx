import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperProducts1,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import slider4 from "../../assets/images/ARTT.webp";
import anh1 from "../../assets/images/1.webp";
import anh2 from "../../assets/images/2.jpg";
import anh3 from "../../assets/images/3.jpg";

import anhthu1 from "../../assets/images/anhthu1.png";
import anhthu2 from "../../assets/images/anhthu2.png";

import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loding from "../../components/LoadingComponent/Loding";
import { useDebounce } from "../../hooks/useDebounce";
import CardComponent1 from "../../components/CardComponent1/CardComponent1";
import CardComponent2 from "../../components/CardComponent2/CardComponent2";
import { Col, Row } from "antd";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(6);
  const [typeProducts, setTypeProducts] = useState([]);

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const {
    isLoading,
    data: products,
    isPreviousData,
  } = useQuery(["products", limit, searchDebounce], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const { data: products1 } = useQuery(["products1"], fetchProductAll, {
    retry: 3,
    retryDelay: 1000,
  });

  return (
    <Loding isLoading={isLoading || loading}>
      <div style={{ backgroundColor: "#efefefef" }}>
        <div
          style={{ textAlign: "center", letterSpacing: "5px", padding: "10px" }}
        >
          100% quality, meticulously crafted.
        </div>
        <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
      </div>
      <div style={{ padding: "0 120px", backgroundColor: "#efefefef" }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{
          width: "100%",
          backgroundColor: "#efefef",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              padding: "30px 120px",
            }}
          >
            <div
              style={{
                fontSize: "35px",
                fontWeight: "bolder",
                letterSpacing: "20px",
              }}
            >
              [NEW COLLECTION]
            </div>
          </div>

          <div
            style={{
              display: "flex",
              backgroundColor: "#ffffff",
              padding: "0px 480px",
            }}
          >
            <div style={{ fontSize: "25px", fontStyle: "oblique" }}>
              New York: Urban Formality
            </div>
          </div>

          <div
            id="container"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              padding: "0px 120px",
            }}
          >
            <WrapperProducts1>
              <CardComponent1
                key={products1?.data[0]._id}
                countInStock={products1?.data[0].countInStock}
                description={products1?.data[0].description}
                image={products1?.data[0].image}
                name={products1?.data[0].name}
                price={products1?.data[0].price?.toLocaleString()}
                rating={products1?.data[0].rating}
                type={products1?.data[0].type}
                selled={products1?.data[0].selled}
                discount={products1?.data[0].discount}
                id={products1?.data[0]._id}
              />
            </WrapperProducts1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 23px",
              }}
            >
              <WrapperProducts>
                <CardComponent2
                  key={products1?.data[7]._id}
                  countInStock={products1?.data[7].countInStock}
                  description={products1?.data[7].description}
                  image={products1?.data[7].image}
                  name={products1?.data[7].name}
                  price={products1?.data[7].price?.toLocaleString()}
                  rating={products1?.data[7].rating}
                  type={products1?.data[7].type}
                  selled={products1?.data[7].selled}
                  discount={products1?.data[7].discount}
                  id={products1?.data[7]._id}
                />
              </WrapperProducts>
              <WrapperProducts>
                <CardComponent2
                  key={products1?.data[9]._id}
                  countInStock={products1?.data[9].countInStock}
                  description={products1?.data[9].description}
                  image={products1?.data[9].image}
                  name={products1?.data[9].name}
                  price={products1?.data[9].price?.toLocaleString()}
                  rating={products1?.data[9].rating}
                  type={products1?.data[9].type}
                  selled={products1?.data[9].selled}
                  discount={products1?.data[9].discount}
                  id={products1?.data[9]._id}
                />
              </WrapperProducts>
            </div>
          </div>

          <div
            id="container"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              padding: "0px 120px 30px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <WrapperProducts>
                <CardComponent2
                  key={products1?.data[0]._id}
                  countInStock={products1?.data[0].countInStock}
                  description={products1?.data[0].description}
                  image={products1?.data[0].image}
                  name={products1?.data[0].name}
                  price={products1?.data[0].price?.toLocaleString()}
                  rating={products1?.data[0].rating}
                  type={products1?.data[0].type}
                  selled={products1?.data[0].selled}
                  discount={products1?.data[0].discount}
                  id={products1?.data[0]._id}
                />
              </WrapperProducts>
              <WrapperProducts>
                <CardComponent2
                  key={products1?.data[2]._id}
                  countInStock={products1?.data[2].countInStock}
                  description={products1?.data[2].description}
                  image={products1?.data[2].image}
                  name={products1?.data[2].name}
                  price={products1?.data[2].price?.toLocaleString()}
                  rating={products1?.data[2].rating}
                  type={products1?.data[2].type}
                  selled={products1?.data[2].selled}
                  discount={products1?.data[2].discount}
                  id={products1?.data[2]._id}
                />
              </WrapperProducts>
            </div>
            <WrapperProducts1 style={{ padding: "0px 23px" }}>
              <CardComponent1
                key={products1?.data[5]._id}
                countInStock={products1?.data[5].countInStock}
                description={products1?.data[5].description}
                image={products1?.data[5].image}
                name={products1?.data[5].name}
                price={products1?.data[5].price?.toLocaleString()}
                rating={products1?.data[5].rating}
                type={products1?.data[5].type}
                selled={products1?.data[5].selled}
                discount={products1?.data[5].discount}
                id={products1?.data[5]._id}
              />
            </WrapperProducts1>
          </div>
        </div>
      </div>

      <div>
        <div
          id="container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            padding: "0px 120px 30px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <WrapperProducts>
              <img src={anhthu1} alt="" width="100%" height="396vh" />
            </WrapperProducts>
            <WrapperProducts>
              <img src={anhthu2} alt="" width="100%" height="396vh" />
            </WrapperProducts>
          </div>
          <WrapperProducts1 style={{ padding: "0px 23px" }}>
            <CardComponent1
              key={products1?.data[23]._id}
              countInStock={products1?.data[23].countInStock}
              description={products1?.data[23].description}
              image={products1?.data[23].image}
              name={products1?.data[23].name}
              price={products1?.data[23].price?.toLocaleString()}
              rating={products1?.data[23].rating}
              type={products1?.data[23].type}
              selled={products1?.data[23].selled}
              discount={products1?.data[23].discount}
              id={products1?.data[23]._id}
            />
          </WrapperProducts1>
        </div>
      </div>

      <div
        className="body"
        style={{
          width: "100%",
          backgroundColor: "#ddd",
        }}
      >
        <div
          id="container"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px 120px",
          }}
        >
          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price?.toLocaleString()}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textbutton="Xem Them"
              type="outline"
              styleButton={{
                border: "1px solid black",
                color: `${
                  products?.total === products?.data?.length ? "#fff" : "black"
                }`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              disabled={
                products?.total === products?.data?.length ||
                products?.totalPage === 1
              }
              styleTextButton={{ fontWeight: 500 }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>
        </div>
      </div>

      <Row
        style={{
          padding: "10px 200px 0px",
          width: "100%",
          backgroundColor: "#efefef",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col
          style={{
            padding: "50px 50px 0px",
            height: "7 00px",
          }}
          span={12}
        >
          <img width="100%" height="100%" src={anh1} alt="" />
        </Col>
        <Col span={12}>
          <div
            style={{
              padding: "40px",
            }}
          >
            <div
              style={{
                padding: "10px 0px",
                fontSize: "12px",
                letterSpacing: "2px",
              }}
            >
              100% QUALITY
            </div>
            <div
              style={{
                fontSize: "35px",
                fontWeight: "bolder",
                letterSpacing: "2px",
              }}
            >
              TIMELESS
            </div>
            <div
              style={{
                alignSelf: "flex-start",
                textAlign: "left",
                letterSpacing: "2px",
                fontSize: "15px",
              }}
            >
              <p>
                Infuse with the highest level of excellence, exquisite fabrics,
                precise stitches, incredible shaping. Each piece is crafted to
                stand the test of time and passed down generations as vintage
                heirlooms.
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row
        style={{
          padding: "0px 200px ",
          width: "100%",
          backgroundColor: "#efefef",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col span={12}>
          <div
            style={{
              padding: "40px",
            }}
          >
            <div
              style={{
                padding: "10px 0px",
                fontSize: "12px",
                letterSpacing: "2px",
              }}
            >
              METICULOUS DETAILS
            </div>
            <div
              style={{
                fontSize: "35px",
                fontWeight: "bolder",
                letterSpacing: "2px",
              }}
            >
              LUXURY
            </div>
            <div
              style={{
                alignSelf: "flex-start",
                textAlign: "left",
                letterSpacing: "2px",
                fontSize: "15px",
              }}
            >
              <p>
                Elegance in every minor detail, using with the most
                sophisticated materials to elevate your present to the next
                level.
              </p>
            </div>
          </div>
        </Col>
        <Col
          style={{
            padding: "0px 50px",
            height: "7 00px",
          }}
          span={12}
        >
          <img width="100%" height="100%" src={anh2} alt="" />
        </Col>
      </Row>

      <Row
        style={{
          padding: "0px 200px 0px",
          width: "100%",
          backgroundColor: "#efefef",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col
          style={{
            padding: "0px 50px 20px",
            height: "7 00px",
          }}
          span={12}
        >
          <img width="100%" height="100%" src={anh3} alt="" />
        </Col>
        <Col span={12}>
          <div
            style={{
              padding: "40px",
            }}
          >
            <div
              style={{
                padding: "10px 0px",
                fontSize: "12px",
                letterSpacing: "2px",
              }}
            >
              EFFORTLESSLY
            </div>
            <div
              style={{
                fontSize: "35px",
                fontWeight: "bolder",
                letterSpacing: "2px",
              }}
            >
              VERSITILE
            </div>
            <div
              style={{
                alignSelf: "flex-start",
                textAlign: "left",
                letterSpacing: "2px",
                fontSize: "15px",
              }}
            >
              <p>
                Every piece is intentionally designed to be worn anytime,
                anywhere, infusing you with the utmost confidence and style.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Loding>
  );
};

export default HomePage;
