import React, { Component } from "react";
import axios from "axios";
import academyLogo from "../../academy.png";
import "./Header.scss";

class Header extends Component {
  componentDidMount() {
    axios.get(`ENDPOINT_PLACEHOLDER`).then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="header">
        <header className="app__header">
          <img src={academyLogo} className="app__logo" alt="logo" />
          <h3>Tech Academy UI - Lightning lunch</h3>
          <a
            className="app__link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default Header;
