import React, { useState, useEffect } from "react";
// import axios from "axios";
import Header from "./Components/Header/Header";
import Product from "./Components/Products/Product";
import productDataMock from "./Components/productMock.json";

const App = () => {
  const [newSearchTerm, setSearchTerm] = useState("");
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    // axios
    //   .get(`localhost:8080/products/${productId}`)
    //   .then((res) => {console.log(res), setProduct(res.data)})
    //   .catch((e) => console.log(e));
    if (newSearchTerm === "7799118") setProductData(productDataMock.data);
    else setProductData(null);
  }, [newSearchTerm]);

  const handleSearch = (searchTerm = "") => {
    if (searchTerm) console.log(searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <div className="app">
      <Header handleSearch={handleSearch} />
      {productData && <Product product={productData} />}
    </div>
  );
};

export default App;
