import React, { useState } from "react";
import Header from "./Components/Header/Header";
import Product from "./Components/Products/Product";

const App = () => {
  // useEffect(() => {
  //   axios.get(`ENDPOINT_PLACEHOLDER`).then((res) => {
  //     console.log(res);
  //   });
  // }, []);

  const [newSearchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm = "") => {
    if (searchTerm) console.log(searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <div className="app">
      <Header handleSearch={handleSearch} />
      <Product productId={newSearchTerm} />
    </div>
  );
};

export default App;
