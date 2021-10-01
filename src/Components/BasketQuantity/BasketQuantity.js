import React, { useState } from 'react'
import { IconButton } from '@jsluna/button'
import { Plus, Minus } from '@jsluna/icons'
import { Card } from '@jsluna/card'

import './BasketQuantity.scss'
// import { Link } from 'react-router-dom'

const MAX_QUANTITY = 999
const MIN_QUANTITY = 1

const BasketQuantity = ({
  id,
  quantity,
  removeFromTrolleyClick,
  handleAddToTrolleyClick,
  minZero,
}) => {
  const [tempQuantity, setTempQuantity] = useState(null)
  console.log('min', minZero === true)
  return (
    // <Card>
    <div>
      <IconButton
        label='Minus'
        hideLabel
        variant='filled'
        disabled={quantity <= (minZero ? 0 : MIN_QUANTITY)}
        onClick={() => {
          removeFromTrolleyClick(id, 1)
          setTempQuantity(null)
        }}
      >
        <Minus />
      </IconButton>

      <input
        type='number'
        className='quantity'
        value={tempQuantity !== null ? tempQuantity : quantity}
        onChange={(e) => {
          if (e.target.value === '' || e.target.value[0] === '0') {
            setTempQuantity(e.target.value)
            return
          }

          const target = parseInt(e.target.value)
          if (isNaN(target) || target < 1) {
            console.log('nan or <1')
            return
          }

          handleAddToTrolleyClick(id, target - quantity)
          setTempQuantity(null)
        }}
      />

      <IconButton
        label='Plus'
        variant='filled'
        hideLabel
        disabled={quantity >= MAX_QUANTITY}
        onClick={() => {
          handleAddToTrolleyClick(id, 1)
          setTempQuantity(null)
        }}
      >
        <Plus />
      </IconButton>
      {/* </Card> */}
    </div>
  )
}
export default BasketQuantity
