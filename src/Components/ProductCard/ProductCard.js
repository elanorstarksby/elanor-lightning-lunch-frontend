import React from 'react'
import './ProductCard.scss'
import formatPrice from '../../helpers/formatPrice'

import { IconButton } from '@jsluna/button'
import { Plus } from '@jsluna/icons'
import { Link } from 'react-router-dom'

const ProductCard = ({
  id,
  name,
  priceNow,
  flashText,
  description,
  brand,
  handleProductOnClick,
  handleAddToTrolleyClick,
}) => {
  return (
    <div className='productCard'>
      <Link to={`/products/${id}`}>
        <img
          src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
          className='productCard__image link'
          alt={name}
          onClick={() => handleProductOnClick(id)}
        />
      </Link>
      <Link to={`/products/${id}`}>
        <h5 className='link' onClick={() => handleProductOnClick(id)}>
          {name}
        </h5>
      </Link>
      <div className='productCard__price'>
        <strong>{formatPrice(priceNow)}</strong>
        <span className='productCard__price--flash'>{flashText}</span>
      </div>

      <IconButton
        variant='filled'
        label='Add to basket'
        // fullWidth
        onClick={() => handleAddToTrolleyClick(id, 1)}
      >
        <Plus />
      </IconButton>
    </div>
  )
}

export default ProductCard
