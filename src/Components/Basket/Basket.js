import React from 'react'

import { Card } from '@jsluna/card'
import { Section } from '@jsluna/section'
import { Container } from '@jsluna/grid'

import './Basket.scss'
import BasketCard from '../BasketCard/BasketCard'

const Basket = ({
  basketList,
  handleProductOnClick,
  removeFromTrolleyClick,
}) => {
  return (
    <Container size='xs' className='ln-u-push-top-xl'>
      <Section>
        <Card className='basket'>
          <div>
            <h1>Your basket</h1>
          </div>
          <div className='basket-card-container'>
            {console.log(basketList)}
            {basketList.map((basketItem) => (
              <BasketCard
                key={basketItem.product.id}
                id={basketItem.product.id}
                name={basketItem.product.attributes.name}
                quantity={basketItem.quantity}
                price={basketItem.product.attributes.price.now}
                handleProductOnClick={handleProductOnClick}
                removeFromTrolleyClick={removeFromTrolleyClick}
              />
            ))}
          </div>
          <div></div>
        </Card>
      </Section>
    </Container>
  )
}

export default Basket
