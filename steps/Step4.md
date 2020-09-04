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

Now we have our component it's time to structure it, in the return you want to create a div that will be the container of the card then inside that div you'll make another one and that will be the details of the card

```
return (
  <div className="product">
    <div className="productCard__details">
    </div>
  </div>
```

## 2
