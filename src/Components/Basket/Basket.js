import React from 'react'

import { Card } from '@jsluna/card'
import { Section } from '@jsluna/section'
import { Container } from '@jsluna/grid'

import './Basket.scss'
import BasketCard from '../BasketCard/BasketCard'
import formatPrice from '../../helpers/formatPrice'

class Basket extends React.Component {
  constructor(props) {
    console.log('basketList', props.basketList)
    super(props)
  }

  render() {
    return (
      <Container size='xs' className='ln-u-push-top-xl'>
        <Section>
          <Card className='basket'>
            <div>
              <h1>Your basket</h1>
              <p>Total: {formatPrice(this.props.basketCost)}</p>
            </div>
            <div className='basket-card-container'>
              {console.log(this.props.basketList)}
              {this.props.basketList.map((basketItem) => (
                <BasketCard
                  key={basketItem.product.id}
                  id={basketItem.product.id}
                  name={basketItem.product.attributes.name}
                  quantity={basketItem.quantity}
                  price={basketItem.product.attributes.price.now}
                  handleProductOnClick={this.props.handleProductOnClick}
                  removeFromTrolleyClick={this.props.removeFromTrolleyClick}
                  handleAddToTrolleyClick={this.props.handleAddToTrolleyClick}
                />
              ))}
            </div>
            <div></div>
          </Card>
        </Section>
      </Container>
    )
  }
}

// const Basket = ({
//   basketList,
//   basketCost,
//   handleProductOnClick,
//   removeFromTrolleyClick,
//   handleAddToTrolleyClick,
// }) => {
//   return (
//     <Container size='xs' className='ln-u-push-top-xl'>
//       <Section>
//         <Card className='basket'>
//           <div>
//             <h1>Your basket</h1>
//             <p>Total: {formatPrice(basketCost)}</p>
//           </div>
//           <div className='basket-card-container'>
//             {console.log(basketList)}
//             {basketList.map((basketItem) => (
//               <BasketCard
//                 key={basketItem.product.id}
//                 id={basketItem.product.id}
//                 name={basketItem.product.attributes.name}
//                 quantity={basketItem.quantity}
//                 price={basketItem.product.attributes.price.now}
//                 handleProductOnClick={handleProductOnClick}
//                 removeFromTrolleyClick={removeFromTrolleyClick}
//                 handleAddToTrolleyClick={handleAddToTrolleyClick}
//               />
//             ))}
//           </div>
//           <div></div>
//         </Card>
//       </Section>
//     </Container>
//   )
// }

export default Basket
