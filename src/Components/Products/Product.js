import React from "react";

import { Body1 } from '@jsluna/typography'
import { Card } from '@jsluna/card'
import { Section } from '@jsluna/section'
import { Container } from '@jsluna/grid'

import academyLogo from "../../academy.png";
import "./Products.scss";


const Product = () => {
  return (
    <Container size="xs" className="ln-u-push-top-xl">
      <Section>
        <Card className="hero">
          <img src={academyLogo} className="app__logo" alt="logo" />
          <h1 className="hero__title">Lightning Lunch</h1>
          <Body1>
            A lightweight react app. We're going to add the ability to search for products, view product details
            and add them to a basket. You're then free to enhance it in any way you like! Get creative!
            <hr></hr>
            We'll be using Luna for most UI elements:
            <a href="https://jsainsburyplc.github.io/luna/">Luna Docs</a>
          </Body1>
        </Card>
      </Section>
    </Container>
  );
};

export default Product;
