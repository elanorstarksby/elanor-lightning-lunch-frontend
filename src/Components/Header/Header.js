import React, { useState } from 'react'

import {
  Header as LunaHeader,
  HeaderLogo,
  HeaderActions,
  HeaderSearch,
} from '@jsluna/header'
import { TextButton } from '@jsluna/button'
import { Basket } from '@jsluna/icons'

import formatPrice from '../../helpers/formatPrice'

import './Header.scss'

import { Link } from 'react-router-dom'

const Header = ({
  handleSearch,
  basketItems,
  basketCost,
  basketId,
  handleBasketOnClick,
}) => {
  // const [searchTerm, setSearchTerm] = useState('')

  // const basketQuantity =
  //   // basketItems.length > 0
  //   true
  //     ? basketItems.basketItems.map((x) => x.quantity).reduce((x, y) => x + y)
  //     : 0

  // var basketQuantity = 0

  // function addQuantities(current, total) {
  //   return current + total.quantity
  // }

  // const basketQuantity =
  //   basketItems.length > 0 ? basketItems.reduce(addQuantities) : 0

  const basketQuantity = basketItems.reduce((accumulator, current) => {
    return accumulator + current.quantity
  }, 0)

  const [searchTerm, setSearchTerm] = useState(null)

  return (
    <LunaHeader>
      <Link to='/'>
        <HeaderLogo className='link'>Lightning Lunch</HeaderLogo>
      </Link>
      <HeaderSearch
        fullWidth
        tabBar='max-nav'
        tabBarSoft
        field={{ hasButton: true, placeholder: 'Search for products' }}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          handleSearch(e.target.value)
        }}
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch(searchTerm)
        }}
      />

      <HeaderActions label='Basket' onClick={() => handleBasketOnClick()}>
        <TextButton className='ln-u-pull-right'>
          <Basket /> {basketQuantity}({formatPrice(basketCost)})
          <span className='ln-u-visually-hidden'>Your basket</span>
        </TextButton>
      </HeaderActions>
    </LunaHeader>
  )
}

export default Header
