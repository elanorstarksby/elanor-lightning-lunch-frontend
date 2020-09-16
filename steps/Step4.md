# Step 4

## Aim:

Internal Product Card with props and CTA, return on the products.map

### 1

The great thing about React is that you can build reusable components that can be used in many different areas of the app. This provides consistency(allows greater control and scalability for those building the apps and a better experience for the users), Good code practice(Code that has been used many times by various people is pre-tested already proven in the field) and easier testing(Because the code is already proven, testing is also easier) Your going to build a component that displays a product in a card. Alright now let's build our resuable component.

First let's create the component so make a new folder in the components folder and call it ProductCard. Then create the JS file for the component and a scss file for it

Next import React and the scss file that you just created an example is below:

```
import React from "react";
import "./ProductCard.scss";
```

Now your going to want to create a function that takes parameters(these will be the props). Again if you get stuck an example is below:

```
const ProductCard = ({ id, name, priceNow, flashText, description, brand }) => {
  return (
    <div></div>
  )
}
```

Now we have our component it's time to structure it, in the return you want to create a div that will be the container of the card then inside that div you'll make another one and that will be the details of the card, we will have different styles for each class. see below:

JS file

```
return (
  <div className="product">
    <div className="productCard__details">
    </div>
  </div>
```

CSS

```
.productCard {
  display: flex;

  &__details {
    max-width: 300px;
    margin: auto;
    text-align: center;
    max-width: 250px;
    margin: 20px;
  }
}
```

Now we have our foundation we can put our props(product details) inside the productCard\_\_details div and give it some basic styling. First we will add an img tag, note we are using our `id` prop as part of the src in the img tag.

JS file

```
<div className="productCard__details">
  <img
    src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
    className="productCard__image"
    alt="productCard"
  />
</div>
```

CSS

```
&__image {
    width: 40%;
    margin: 10px;
  }
```

then comes the header of the card so this includes name, price and flash text.

JS File

```
<div className="productCard__header">
  <h3 className="productCard__title">{name}</h3>
  <strong className="productCard__price">
    {priceNow}
  </strong>
  <span className="product__price--flash">{flashText}</span>
</div>
```

CSS

```
 &__title {
    font-size: 20px;
    overflow: hidden;
    margin-bottom: 5px;
    line-height: normal;
    margin: 0;
  }

  &__header {
    align-items: center;
  }
  &__price {
    display: flex;
    flex-direction: column;

    &--flash {
      color: #ff0000;
    }
```

Lastly we will add the brand, product description and button

JS file

```
<span>{brand}</span>
<div element="div" className="product__info">
  {description && <p>{description}</p>}
</div>
<FilledButton>Add To Trolley</FilledButton>
```

CSS file

```
&__info {
    text-align: right;
    padding: 10px 0;
  }
```

We're going to create a helper function for the price so you don't have to worry about the formatting. The function is below place that above the return statement

```
const ProductCard = ({ id, name, priceNow, flashText, description, brand }) => {
  const formatPrice = (price) => {
    if (price.includes("£")) return price;
    return `£${price}`;
  };
```

Where price is `{price}` change it to `{formatPrice(priceNow.toString())}` Also don't forget to export your component so at the end of the file write ` export default ProductCard`

Great you have now made your first reusable component so your component and css file should look like the following:

JS file

```
import React from "react";
import "./ProductCard.scss";

const ProductCard = ({ id, name, priceNow, flashText, description, brand }) => {
  const formatPrice = (price) => {
    if (price.includes("£")) return price;
    return `£${price}`;
  };
  return (
    <div className="product">
      <div className="productCard__details">
        <img
          src={`https://assets.sainsburys-groceries.co.uk/gol/${id}/1/640x640.jpg`}
          className="productCard__image"
          alt="productCard"
        />
        <div className="productCard__header">
          <h3 className="productCard__title">{name}</h3>
          <strong className="productCard__price">
            {formatPrice(priceNow.toString())}
          </strong>
          <span className="product__price--flash">{flashText}</span>
        </div>
        <span>{brand}</span>
        <div element="div" className="product__info">
          {description && <p>{description}</p>}
        </div>
        <FilledButton>Add To Trolley</FilledButton>

      </div>
    </div>
  );
};

export default ProductCard;
```

CSS file

```
.productCard {
  display: flex;

  &__details {
    max-width: 300px;
    margin: auto;
    text-align: center;
    max-width: 250px;
    margin: 20px;
  }

  &__image {
    width: 40%;
    margin: 10px;
  }
  &__title {
    font-size: 20px;
    overflow: hidden;
    margin-bottom: 5px;
    line-height: normal;
    margin: 0;
  }

  &__header {
    align-items: center;
  }
  &__info {
    text-align: right;
    padding: 10px 0;
  }

  &__price {
    display: flex;
    flex-direction: column;

    &--flash {
      color: #ff0000;
    }
  }
}
```

## 2

Now your probably thinking how do we use this or you might be like I know exactly what to do next. Either way we're going to go through it now. Open the App file and you should be already mapping the name of the product from the previous step example:

```
{productData && <Product product={productData} />}
      <div className="productContainer">
        {productList.length > 0 &&
          productList.map((product) => <div>{product.name}</div>)}
      </div>
```

Instead of mapping just the name we're going to use our reusable component to map the card with the product details. First import the ProductCard component.

```
import ProductCard from "./Components/ProductCard/ProductCard";
```

Next inside the productList.map replace `<div>{product.name}</div>` with the ProductCard component. Remember we created the component with props so we're going to use the data and pass it to the props we created so it can display our data. See below:

```
<div className="app">
  <Header handleSearch={handleSearch} />
  {productData && <Product product={productData} />}
    <div className="productContainer">
      {productList.length > 0 &&
        productList.map((product) => (
          <ProductCard
            id={product.id}
            name={product.attributes.name}
            priceNow={product.attributes.price}
            flashText={product.attributes.specialOfferText}
            brand={product.attributes.brand}
          />
        ))}
    </div>
  </div>
```

As you can see the top level div has a classname called productContainer. Now created a scss file for app and create the class below:

```
.productContainer {
  display: flex;
}
```

Now you should be able to see a list of product cards displayed on the page.

[Step 5](./STEP5.md)
