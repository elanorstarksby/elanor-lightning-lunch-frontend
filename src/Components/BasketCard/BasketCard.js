import React from 'react'
import './BasketCard.scss'
import formatPrice from '../../helpers/formatPrice'
import { FilledButton } from '@jsluna/button'

const BasketCard = ({
  id,
  name,
  quantity,
  price,
  handleProductOnClick,
  removeFromTrolleyClick,
}) => {
  const total = quantity * price
  return (
    <div className='basketCard'>
      <div className='flex'>
        <div>
          <img
            src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
            className='basketCard__image link'
            alt={name}
            onClick={() => handleProductOnClick(id)}
          />
        </div>
        <div>
          <h5 className='link' onClick={() => handleProductOnClick(id)}>
            {name}
          </h5>
          <div className='basketCard__price'>
            <strong>Price: {formatPrice(price)}</strong>
            <strong>Quantity: {quantity}</strong>
            <strong>Total: {formatPrice(total)}</strong>
          </div>
        </div>
      </div>

      <FilledButton
        className='productCard__button'
        onClick={() => removeFromTrolleyClick(id, quantity)}
      >
        Delete
      </FilledButton>
    </div>
  )
}

export default BasketCard
