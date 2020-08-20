import React from "react";
import Header from "./Components/Header/Header";
import Product from "./Components/Products/Product";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <Product />
    </div>
  );
}

export default App;
