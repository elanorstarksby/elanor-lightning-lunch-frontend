import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Body1 } from "@jsluna/typography";
import { Card, Container, Section } from "@jsluna/react";
import productData from "../productMock.json";
import academyLogo from "../../academy.png";
import "./Products.scss";
const Product = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // axios
    //   .get(`localhost:8080/products/${productId}`)
    //   .then((res) => {console.log(res), setProduct(res.data)})
    //   .catch((e) => console.log(e));
    if (productId === "7799118") setProduct(productData.data);
    else setProduct(null);
  }, [productId]);

  return (
    <Container size="xs" className="ln-u-push-top-xl">
      <Section>
        <Card className="hero">
          {product && (
            <>
              <img
                src={`https://assets.sainsburys-groceries.co.uk/gol/${product.id}/1/640x640.jpg`}
                className="product__image"
                alt="product-image"
              />
              <h1 className="product__title">{product.attributes.name}</h1>
              <Body1 className="product__info">
                <strong>{product.attributes.price.now}</strong>
                {product.attributes.description && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.attributes.description,
                    }}
                  />
                )}
              </Body1>
            </>
          )}
        </Card>
      </Section>
    </Container>
  );
};

export default Product;
