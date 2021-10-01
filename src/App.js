import axios from 'axios'
import React, { useState, useEffect } from 'react'

import Header from './Components/Header/Header'
import Product from './Components/Products/Product'
import Basket from './Components/Basket/Basket'
import Search from './Components/Search/Search'
import Cookies from 'js-cookie'

import { Section } from '@jsluna/section'
import { Container } from '@jsluna/grid'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom'

const MainApp = () => {
  const [basket, setBasket] = useState({
    basketId: '',
    basketItems: [],
    basketCost: 0,
  })

  let history = useHistory()
  console.log('history', history)

  // temporary
  useEffect(() => {
    // handleSearch('a')
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
    history.push({ pathname: `/search/${searchTerm}` })

    // moved
    // axios
    //   .get(`http://localhost:8080/search/${searchTerm}`)
    //   .then((res) => {
    //     setProductList(res.data.data)
    //     // setView('Search')
    //     console.log(res.data.data)
    //   })
    //   .catch((e) => {
    //     console.log(e)
    //   })
  }

  const handleBasketOnClick = () => {
    if (!basket.basketId) return
    history.push({ pathname: '/basket' })

    // setView('Basket')

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

  //moved
  // const handleProductOnClick = (productId) => {
  //   axios
  //     .get(`http://localhost:8080/products/${productId}`)
  //     .then((res) => {
  //       console.log(res)
  //       setProductData(res.data)
  //       setView('Product')
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

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
        basketId={basket.basketId}
        handleBasketOnClick={handleBasketOnClick}
      />

      <Switch>
        <Route
          path='/search/:searchTerm?'
          render={(props) => (
            <Search
              basketList={basket.basketItems}
              searchTerm={props.match.params.searchTerm}
              handleAddToTrolleyClick={handleAddToTrolleyClick}
              removeFromTrolleyClick={removeFromTrolleyClick}
            />
          )}
        />

        <Route
          path='/products/:id'
          render={(props) => (
            <Product
              productId={props.match.params.id}
              handleAddToTrolleyClick={handleAddToTrolleyClick}
              removeFromTrolleyClick={removeFromTrolleyClick}
              basketDetails={
                basket.basketItems.filter(
                  (x) => x.product.id === props.match.params.id
                )[0]
              }
            />
          )}
        />

        <Route path='/basket'>
          <div className='basket-container'>
            <Basket
              basketList={basket.basketItems}
              handleProductOnClick={() => {}}
              removeFromTrolleyClick={removeFromTrolleyClick}
              handleAddToTrolleyClick={handleAddToTrolleyClick}
              basketCost={basket.basketCost}
            />
          </div>
        </Route>

        <Route path='/'>
          <Container size='xs' className='ln-u-push-top-xl'>
            <Section>
              <h1>Lightning Lunch Home</h1>
              <p>Try searching for an item above.</p>
            </Section>
          </Container>
        </Route>
      </Switch>
    </div>
  )
}

export default () => {
  return (
    <Router>
      <MainApp />
    </Router>
  )
}
