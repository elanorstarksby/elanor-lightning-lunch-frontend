import React, {useState} from "react";
import { SearchField, withClear } from "@jsluna/form";
import { SearchButton } from "@jsluna/button";

import { TogetherWeAreSainsburys } from "@jsluna/images";
import {
  Header as LunaHeader,
  HeaderLogo,
  HeaderActions,
  HeaderItem
} from '@jsluna/header'
import { TextButton } from "@jsluna/button"
import { Basket } from "@jsluna/icons";

import "./Header.scss";

const ClearableSearchField = withClear(SearchField);

const Header = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <LunaHeader>
      <HeaderLogo>
        <TogetherWeAreSainsburys className="header__logo" />
        <span className="ln-u-visually-hidden">Together We Are Sainsburys</span>
      </HeaderLogo>
      <HeaderItem fullWidth align="center" label="Search">
        <ClearableSearchField
          name="search-bar"
          hasButton
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          button={<SearchButton onClick={() => handleSearch(searchTerm)} />}
          className="header__search-bar"
        />
      </HeaderItem>

      <HeaderActions align="right" label="Basket">
        <TextButton className="ln-u-pull-right">
          <Basket /> 42
          <span className="ln-u-visually-hidden">Your basket</span>
        </TextButton>
      </HeaderActions>
    </LunaHeader>
  );
};

export default Header;
