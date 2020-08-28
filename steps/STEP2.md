# Step 2

## Aim:

Add an external component and spruce up the product card.

### 1

One key part of a product display page is the option to add to trolley (ATT). For this we're going to want a button with some text and maybe an icon on it. In order to keep our websites looking the same no matter which team built it, we use the common compononent library. Mike told you a bit about them, we currently have the Argos Bolt and the Sainsbury's Luna. Since this is a sainsbury's style lunch experience we'll use luna

First, we need to add the package using yarn, our package manager. From the terminal in this project (check the path if you can see it or do `pwd` to check you're in `tech-academy-ui`)

From here we do
`yarn add @jsluna/button`

This will add the package to our package.json and our yarn.lock file, so that we have the dependency ready when we need it!

Now we can import it in our Product component. We can see the different types you can use in the [luna docs](https://jsainsburyplc.github.io/luna/#/Packages/Button/Components?id=button-1) along with all the props available to pass in.

We can use the FilledButton example (the first one). So right at the top of our Product component with all the other imports, but under the React import:

```
import { FilledButton } from "@jsluna/button';
```

Then we can use the FilledButton under our Body1:

```
<FilledButton>Add to Trolley</FilledButton>
```

Because of all our floating, it doesn't quite follow how we'd expect the flow to work.

We can change our css a bit to make it more flexible by introducing [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

We want our image on the left and everything else on the right, so we can wrap the 'everything else' in a div with a className of product\_\_details.

we still have our hero className leftover from the very beginning so we should probablychange this to be more relevant - just product will do.
To use flexbox inside the component we need to apply `display: flex` to the parent, in this case the className product.
We can also remove the float css.
Already we see it's looking much better. The wonders of flexbox.

## 2

We have many more attributes in our product Data we can use, so let's get them onto the Page.

Firstly, to tidy up the card we can put the price next to the Title, by wrapping them in their own block and adding flex to that parent too.

```
            <div className="product__header">
              <h1 className="product__title">{product.attributes.name}</h1>
              <strong>{product.attributes.price.now}</strong>
            </div>
```

```
.product {
    &__header {
    display: flex;
  }
}
```

To make these two elements align neatly in the middle, we can use the `align-items` property and set it to center: `align-items: center;`
The title is also looking a bit big and gareish, let's try changing the h1 to a h3.
Luna also has a stylesheet which is adding some styles to these header properties. You can find these by inspecting the website and finding the h2 in the Elements tab, looking at the styles you'll see some styles which we haven't added - they're coming from luna to keep headings and many other elements consistent across our sites.

We can remove this margin by setting the margin to 0 on the title css.

We have a couple more parts of the price we can add too.

```
      "price": {
        "now": 3.49,
        "mealDeal": true,
        "flashText": "Great New Price"
      }
```

Let's add the flashText next to the price.
This would look good if it was in red, to make it stand out that it was a flashText, and if it came under the price.
Add another div wrapper around both price elements with classname of `product__price`, and add a classname to the flashText of `product__price--flash.`

In the `__price` css, make it flex again: `display: flex;`

We can see they're still next to each other, so we can use another flex property to make them stack instead, namely `flex-direction`. The default for flex-direction is `row`, which makes the flex 'flow' go left to right, we want this one to go from top to bottom so we can use the `column`

```
  &__price {
    display: flex;
    flex-direction: column;
```

We can also align the text to the right using the css text-align property:
`text-align: right;`

Looking much more like a product page already.

Now to make the flashText look like flash Text, we can use red. Either we can use the css native 'red' colour, or we can use the luna variable for a colour red: `$ln-color-red` . For this we'll use the luna variable.

`color: $ln-color-red;`

Starting to come together. One thing you might notice is that, unless the backend has sent us a £ sign as part of the response for price, it's just a number. To do this we can add a little helper function in our component to format the price. We want to be able to accept both responses, either with a £ sign or without. Making functions inside components is pretty nice and readable when you're using functional components (which this is).

Firstly we define our function:

```
const formatPrice = () => {

}
```

we want to pass in a parameter, the price string, so that goes inside the normal brackets `(price)`.

Now we want to do some string manipulation; if the string contains a pound sign already, we're all good, the price can be on it's way as it is. If not, we need to add it to the string and return that.

Luckily there's a lovely `.includes` method for strings in Javascript.

so psuedo: if the price includes £, return it, if not add the £ and return that

```
if(price.includes("£")) return price
return `£${price}`
```

you could put an `else`, but because of the early return doing it like this is the same.

So now where we are displaying the price we want to change this to call the function:
`formatPrice(product.attributes.price.now.toString())`

To tidy up the product display a bit more, we can add some padding to the product info.

To add padding to the product info we need to make it into a div, currently it is a span and padding will have no effect. to do this we can add an element prop, this works because the Body1 Component comes from luna and you can pass an element to it to change what it renders as.

so add `element="div"` then add some padding to the css. The padding attribute works the same as margin for short hand, so if we want none for Right and left and a bit on top and bottom we can do:

`padding: 25px 0;`

Have a play around with the leftover attributes, maybe style the Meal Deal into a badge style with some background colour.
