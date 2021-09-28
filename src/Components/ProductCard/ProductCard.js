import React from 'react'
import './ProductCard.scss'
import formatPrice from '../../helpers/formatPrice'

import { FilledButton } from '@jsluna/button'

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
      <img
        src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
        className='productCard__image link'
        alt={name}
        onClick={() => handleProductOnClick(id)}
      />
      <h5 className='link' onClick={() => handleProductOnClick(id)}>
        {name}
      </h5>
      <div className='productCard__price'>
        <strong>{formatPrice(priceNow)}</strong>
        <span className='productCard__price--flash'>{flashText}</span>
      </div>
      <FilledButton
        className='productCard__button'
        onClick={() => handleAddToTrolleyClick(id, 1)}
      >
        Add to trolley
      </FilledButton>
    </div>
  )
}

export default ProductCard
