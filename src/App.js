import axios from 'axios'
import React, { useState, useEffect } from 'react'

import Header from './Components/Header/Header'
import Product from './Components/Products/Product'
import ProductCard from './Components/ProductCard/ProductCard'
import Basket from './Components/Basket/Basket'
import Cookies from 'js-cookie'

const App = () => {
  const [view, setView] = useState('')
  const [productList, setProductList] = useState([])
  const [productData, setProductData] = useState(null)

  const [basket, setBasket] = useState({
    basketId: '',
    basketItems: [],
    basketCost: 0,
  })

  // temporary
  useEffect(() => {
    handleSearch('a')
    //handleProductOnClick("1320121")

    const oldBasketID = Cookies.get('basket_id')
    if (oldBasketID) {
      axios
        .get(`http://localhost:8080/baskets/${oldBasketID}`)
        .then((response) => {
          console.log(response.data)
          setBasket({
            basketId: response.data.id,
            basketItems: response.data.basketItems,
            basketCost: response.data.price,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  const handleSearch = (searchTerm) => {
    if (!searchTerm) return

    axios
      .get(`http://localhost:8080/search/${searchTerm}`)
      .then((res) => {
        setProductList(res.data.data)
        setView('Search')
        console.log(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleBasketOnClick = () => {
    if (!basket.basketId) return
    setView('Basket')

    // axios
    //   .get(`http://localhost:8080/baskets/${basket.basketId}`)
    //   .then((res) => {
    //     console.log('Basket items:')
    //     console.log(res.data.basketItems)
    //     setBasketList(res.data.basketItems)

    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
  }

  const handleProductOnClick = (productId) => {
    axios
      .get(`http://localhost:8080/products/${productId}`)
      .then((res) => {
        console.log(res)
        setProductData(res.data)
        setView('Product')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const removeFromTrolleyClick = (productId, quantity = 2 ** 31) =>
    handleAddToTrolleyClick(productId, -quantity)

  const handleAddToTrolleyClick = (productId, quantity) => {
    if (basket.basketId) {
      // do an axios PUT

      axios
        .put(`http://localhost:8080/baskets/${basket.basketId}`, {
          productId: productId,
          quantity: quantity,
        })
        .then((response) => {
          console.log(response.data)
          setBasket({
            basketId: response.data.id,
            basketItems: response.data.basketItems,
            basketCost: response.data.price,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios
        .post(`http://localhost:8080/baskets`, {
          productId: productId,
          quantity: quantity,
        })
        .then((response) => {
          console.log('response:')
          console.log(response.data)
          setBasket({
            basketId: response.data.id,
            basketItems: response.data.basketItems,
            basketCost: response.data.price,
          })
          Cookies.set('basket_id', response.data.id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className='app'>
      <Header
        handleSearch={handleSearch}
        basketItems={basket.basketItems}
        basketCost={basket.basketCost}
        handleBasketOnClick={handleBasketOnClick}
      />

      {view == 'Search' && (
        <div className='product-list-container'>
          {productList.map((product) => (
            <ProductCard
              key={product.id}
              name={product.attributes.name}
              priceNow={product.attributes.price.now}
              id={product.id}
              flashText={product.attributes.price.flashText}
              handleProductOnClick={handleProductOnClick}
              handleAddToTrolleyClick={handleAddToTrolleyClick}
            />
          ))}
        </div>
      )}

      {view == 'Product' && (
        <Product
          product={productData}
          handleAddToTrolleyClick={handleAddToTrolleyClick}
        />
      )}

      {view == 'Basket' && (
        <div className='basket-container'>
          <Basket
            basketList={basket.basketItems}
            handleProductOnClick={handleProductOnClick}
            removeFromTrolleyClick={removeFromTrolleyClick}
          />
        </div>
      )}

      {/* {productData && <Product product={productData} /> } */}
      {/* {<Product product="{productData}"/>}  */}
      {/* curly braces for javascript */}
    </div>
  )
}

export default App
