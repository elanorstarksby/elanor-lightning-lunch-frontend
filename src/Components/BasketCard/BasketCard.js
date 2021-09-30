import React, { useState } from 'react'
import './BasketCard.scss'
import formatPrice from '../../helpers/formatPrice'
import { IconButton } from '@jsluna/button'
import { Delete, Plus, Minus } from '@jsluna/icons'

import { Link } from 'react-router-dom'

const MAX_QUANTITY = 999

class BasketCard extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = { tempQuantity: null, total: null }
  }

  render() {
    return (
      <div className='basketCard'>
        <div className='basketCard__image__column'>
          <Link to={`/products/${this.props.id}`}>
            <img
              src={`https://assets.sainsburys-groceries.co.uk/gol/${this.props.id}/1/640x640.jpg`}
              className='basketCard__image link'
              alt={this.props.name}
              onClick={() => this.props.handleProductOnClick(this.props.id)}
            />
          </Link>
        </div>
        <div className='basketcard__details_column'>
          <Link to={`/products/${this.props.id}`}>
            <h5
              className='link'
              onClick={() => this.props.handleProductOnClick(this.props.id)}
            >
              {this.props.name}
            </h5>
          </Link>
          <div className='basketCard__price'>
            <strong>Price: {formatPrice(this.props.price)}</strong>
            <div>
              <strong>Quantity:</strong>
              <IconButton
                label='Minus'
                hideLabel
                disabled={this.props.quantity <= 1}
                onClick={() => {
                  this.props.removeFromTrolleyClick(this.props.id, 1)
                  this.state = { tempQuantity: null }
                }}
              >
                <Minus />
              </IconButton>

              <input
                type='number'
                className='quantity'
                value={
                  this.state.tempQuantity !== null
                    ? this.state.tempQuantity
                    : this.props.quantity
                }
                onChange={(e) => {
                  if (e.target.value === '' || e.target.value[0] === '0') {
                    this.state = { tempQuantity: e.target.value }
                    return
                  }

                  const target = parseInt(e.target.value)
                  if (isNaN(target) || target < 1) return

                  this.props.handleAddToTrolleyClick(
                    this.props.id,
                    target - this.props.quantity
                  )
                  this.state = { tempQuantity: null }
                }}
              />

              <IconButton
                label='Plus'
                hideLabel
                disabled={this.props.quantity >= MAX_QUANTITY}
                onClick={() => {
                  this.props.handleAddToTrolleyClick(this.props.id, 1)
                  this.state = { tempQuantity: null }
                }}
              >
                <Plus />
              </IconButton>
            </div>
            <strong>
              Total: {formatPrice(this.props.quantity * this.props.price)}
            </strong>
          </div>

          <IconButton
            // className='productCard__button'
            label='Delete'
            variant='filled'
            onClick={() =>
              this.props.removeFromTrolleyClick(
                this.props.id,
                this.props.quantity
              )
            }
          >
            <Delete />
          </IconButton>
        </div>
      </div>
    )
  }
}

export default BasketCard
