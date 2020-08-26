import React from "react";

import { Body1 } from '@jsluna/typography'
import { Card, Container, Section } from '@jsluna/react'

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
            A lightweight react app - end goal is a lightning lunch experience, with a 
            product lister, with product cards (internal component with props needed) 
            with 'Add' button (external component) which can increase a count (state).
          </Body1>
        </Card>
      </Section>
    </Container>
  );
};

export default Product;
