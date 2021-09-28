import React from 'react'

import { Card } from '@jsluna/card'
import { Section } from '@jsluna/section'
import { Container } from '@jsluna/grid'
import { FilledButton } from '@jsluna/button'

import './Products.scss'

const Product = ({ product, handleAddToTrolleyClick }) => {
  return (
    <Container size='xs' className='ln-u-push-top-xl'>
      <Section>
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
              <p className='description'>{product.attributes.description}</p>
              <p>£{product.attributes.price.now.toFixed(2)}</p>
              <p className='product__price'>
                {product.attributes.price.flashText}
              </p>

              <FilledButton
                onClick={() => handleAddToTrolleyClick(product.id, 1)}
              >
                Add to Trolley
              </FilledButton>
            </div>
          </div>
        </Card>
      </Section>
    </Container>
  )
}

export default Product
