import React, { Component } from "react";
import axios from "axios";

import { TogetherWeAreSainsburys } from '@jsluna/images'
import {
  TextButton,
  Header as LunaHeader,
  HeaderLogo,
  HeaderActions,
} from '@jsluna/react'
import { Basket } from '@jsluna/icons'

import "./Header.scss";

class Header extends Component {
  componentDidMount() {
    axios.get(`ENDPOINT_PLACEHOLDER`).then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <LunaHeader>
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
      </LunaHeader>
    );
  }
}

export default Header;
