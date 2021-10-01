import axios from 'axios'
import React from 'react'

import { Section } from '@jsluna/section'
import { Container } from '@jsluna/grid'

import ProductCard from '../../Components/ProductCard/ProductCard'

import './Search.scss'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { searchTerm: null }

    this.doSearch()
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTerm === prevProps.searchTerm) return
    this.doSearch()
  }

  doSearch() {
    if (this.state.productList && this.state.productList.length === 0) {
      // Set productList to null if empty so 'Loading' is displayed
      // If not empty, keep current value to prevent flashing

      this.setState({ productList: null })
    }

    axios
      .get(`http://localhost:8080/search/${this.props.searchTerm}`)
      .then((res) => {
        this.setState({ productList: res.data.data })
        console.log(res.data.data)
      })
      .catch((e) => {
        this.setState({ productList: null })
        console.log(e)
      })
  }

  render() {
    const handleAddToTrolleyClick = this.props.handleAddToTrolleyClick
    const productList = this.state.productList
    console.log('props', this.props)

    console.log('state', this.state.productList)
    return (
      <Container size='xs' className='ln-u-push-top-xl'>
        <Section>
          <h1>Search results</h1>
          {this.props.searchTerm ? (
            productList ? (
              productList.length > 0 ? (
                <div className='product-list-container'>
                  {productList.map((product) => (
                    <ProductCard
                      key={product.id}
                      //   name={product.attributes.name}
                      //   priceNow={product.attributes.price.now}
                      //   id={product.id}
                      //   flashText={product.attributes.price.flashText}
                      basketDetails={
                        this.props.basketList.filter(
                          (x) => x.product.id === product.id
                        )[0]
                      }
                      product={product}
                      handleProductOnClick={() => {}}
                      handleAddToTrolleyClick={
                        this.props.handleAddToTrolleyClick
                      }
                      removeFromTrolleyClick={this.props.removeFromTrolleyClick}
                    />
                  ))}
                </div>
              ) : (
                <p>No matches</p>
              )
            ) : (
              <p>Loading...</p>
            )
          ) : (
            <p>Please enter a search term</p>
          )}
        </Section>
      </Container>
    )
  }
}

export default Search
