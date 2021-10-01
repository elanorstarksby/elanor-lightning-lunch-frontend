import React, { useState } from 'react'
import './BasketCard.scss'
import formatPrice from '../../helpers/formatPrice'
import { IconButton } from '@jsluna/button'
import { Delete, Plus, Minus } from '@jsluna/icons'

import { Link } from 'react-router-dom'

import BasketQuantity from '../../Components/BasketQuantity/BasketQuantity'
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
              {
                <BasketQuantity
                  id={this.props.id}
                  quantity={this.props.quantity}
                  removeFromTrolleyClick={this.props.removeFromTrolleyClick}
                  handleAddToTrolleyClick={this.props.handleAddToTrolleyClick}
                />
              }
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
