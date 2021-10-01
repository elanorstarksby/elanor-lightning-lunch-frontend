import React from 'react'
import './ProductCard.scss'
import formatPrice from '../../helpers/formatPrice'

import { IconButton } from '@jsluna/button'
import { Plus } from '@jsluna/icons'
import { Link } from 'react-router-dom'
import BasketQuantity from '../BasketQuantity/BasketQuantity'

class ProductCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='productCard'>
        <Link to={`/products/${this.props.product.id}`}>
          <img
            src={`https://assets.sainsburys-groceries.co.uk/gol/${this.props.product.id}/1/640x640.jpg`}
            className='productCard__image link'
            alt={this.props.product.attributes.name}
            onClick={() =>
              this.props.handleProductOnClick(this.props.product.id)
            }
          />
        </Link>
        <Link to={`/products/${this.props.product.id}`}>
          <h5
            className='link'
            onClick={() =>
              this.props.handleProductOnClick(this.props.product.id)
            }
          >
            {this.props.product.attributes.name}
          </h5>
        </Link>
        <div className='productCard__price'>
          <strong>
            {formatPrice(this.props.product.attributes.price.now)}
          </strong>
          <span className='productCard__price--flash'>
            {this.props.product.attributes.price.flashText}
          </span>
        </div>
        {this.props.basketDetails ? (
          <div className='productCard__flex'>
            <BasketQuantity
              id={this.props.product.id}
              quantity={this.props.basketDetails.quantity}
              handleAddToTrolleyClick={this.props.handleAddToTrolleyClick}
              removeFromTrolleyClick={this.props.removeFromTrolleyClick}
              minZero={true}
            />
          </div>
        ) : (
          <IconButton
            variant='filled'
            label='Add to basket'
            // fullWidth
            onClick={() =>
              this.props.handleAddToTrolleyClick(this.props.product.id, 1)
            }
          >
            <Plus />
          </IconButton>
        )}
      </div>
    )
  }
}

// const ProductCard = ({
//   id,
//   name,
//   priceNow,
//   flashText,
//   description,
//   brand,
//   handleProductOnClick,
//   handleAddToTrolleyClick,
// }) => {
//   return (
//     <div className='productCard'>
//       <Link to={`/products/${id}`}>
//         <img
//           src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
//           className='productCard__image link'
//           alt={name}
//           onClick={() => handleProductOnClick(id)}
//         />
//       </Link>
//       <Link to={`/products/${id}`}>
//         <h5 className='link' onClick={() => handleProductOnClick(id)}>
//           {name}
//         </h5>
//       </Link>
//       <div className='productCard__price'>
//         <strong>{formatPrice(priceNow)}</strong>
//         <span className='productCard__price--flash'>{flashText}</span>
//       </div>
//       <IconButton
//         variant='filled'
//         label='Add to basket'
//         // fullWidth
//         onClick={() => handleAddToTrolleyClick(id, 1)}
//       >
//         <Plus />
//       </IconButton>
//     </div>
//   )
// }

export default ProductCard
