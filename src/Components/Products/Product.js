import axios from 'axios'
import React from 'react'

import { Card } from '@jsluna/card'
import { Section } from '@jsluna/section'
import { Container } from '@jsluna/grid'
import { IconButton } from '@jsluna/button'
import { Plus } from '@jsluna/icons'

import './Products.scss'
import formatPrice from '../../helpers/formatPrice'
import BasketQuantity from '../BasketQuantity/BasketQuantity'

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = { product: null }

    axios
      .get(`http://localhost:8080/products/${props.productId}`)
      .then((res) => {
        console.log(res)
        this.setState({ product: res.data })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const product = this.state.product
    const handleAddToTrolleyClick = this.props.handleAddToTrolleyClick

    return (
      <Container size='xs' className='ln-u-push-top-xl'>
        <Section>
          {product ? (
            <Card className='product'>
              <div>
                <h1 className=''>{product.attributes.name}</h1>
              </div>

              <div className='product__flex'>
                <img
                  src={`https://assets.sainsburys-groceries.co.uk/gol/${product.id}/1/640x640.jpg`}
                  className='product__image'
                  alt={product.attributes.name}
                />

                <div>
                  <p className='description'>
                    {product.attributes.description}
                  </p>
                  <p>{formatPrice(product.attributes.price.now)}</p>
                  <p className='product__price'>
                    {product.attributes.price.flashText}
                  </p>

                  {/* <IconButton
                    variant='filled'
                    label='Add to basket'
                    // fullWidth
                    onClick={() => handleAddToTrolleyClick(product.id, 1)}
                  >
                    <Plus />
                  </IconButton> */}

                  {this.props.basketDetails ? (
                    <div className='products__flex'>
                      <BasketQuantity
                        id={product.id}
                        quantity={this.props.basketDetails.quantity}
                        handleAddToTrolleyClick={
                          this.props.handleAddToTrolleyClick
                        }
                        removeFromTrolleyClick={
                          this.props.removeFromTrolleyClick
                        }
                        minZero={true}
                      />
                    </div>
                  ) : (
                    <IconButton
                      variant='filled'
                      label='Add to basket'
                      // fullWidth
                      onClick={() =>
                        this.props.handleAddToTrolleyClick(product.id, 1)
                      }
                    >
                      <Plus />
                    </IconButton>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </Section>
      </Container>
    )
  }
}

export default Product
