import React from 'react';
import academyLogo from './academy.png';

import { TogetherWeAreSainsburys } from '@jsluna/images'
import {
  TextButton,
  Header,
  HeaderLogo,
  HeaderActions,
} from '@jsluna/react'
import { Basket } from '@jsluna/icons'
import { Body1 } from '@jsluna/typography'
import { Card, Container, Section } from '@jsluna/react'

function App() {
  return (
    <div className="app">
      <Header>
        <HeaderLogo>
          <TogetherWeAreSainsburys className="header__logo" />
          <span className="ln-u-visually-hidden">Together We Are Sainsburys</span>
        </HeaderLogo>
        <HeaderActions align="right" label="Basket">
          <TextButton className="ln-u-pull-right">
            <Basket /> 42
            <span className="ln-u-visually-hidden">Your basket</span>
          </TextButton>
        </HeaderActions>
      </Header>
      <Container size="xs" className="ln-u-push-top-xl">
        <Section>
          <Card className="ln-u-text-align-center">
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
    </div>
  );
}

export default App;
