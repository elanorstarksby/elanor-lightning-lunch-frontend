# Step 5

## Aim:

Access the product page from the product lister page by clicking on a product and use the add to basket button to add a product using a POST request to our backend.

### 1

So we have a lovely product lister page with our products, we now want to allow the user to get to the product display page.

We'll make 2 parts of our product card take the user to the product display, our image and our title. To do this we'll need to use the `onClick` function and pass it into the product, and then we want to use the onClick function to update our product data in the state.

So firstly, we can add a prop to the product Card called `handleProductOnClick`, then add the `onClick={handleProductOnClick}` to the `<img>` tag. We could also add the onClick to the `h3` for the product title, but that may not be very good semantically. So instead, we'll wrap the `h3` in an `<a>` and give it an empty href, and the same onclick as we have added to the img.

Now we can go to our App.js file and make our function in there,

```
const handleProductOnClick = () => {

}
```

So now we need to think about what our function needs to do, at the moment our app will show the Product display component if the product data is populated, so that's what we'll need to populate, we can use the product id to fetch the product data from the backend and populate our data, just like we were previously doing in our useEffect.

We know we want to use the id, so we can pass a parameter into our function of productId:

```
const handleProductOnClick = (productId) => {
```

At the moment, if you click on the product title, where we have wrapped it in an `<a>`, you'll notice that the whole page does a refresh. This is because it's a link and the href is empty, so it will just take you to `localhost:3000`, the page we're on. Firstly, we want to make it so that this doesn't happen. OnClick functions can take an event, which is the event which happens when the element is clicked. Some elements such as our anchors have default events which will fire, such as navigating to the href. For this we can use the `preventDefault()` function. To acess the event we need to pass this into the function as a parameter too. I like to put it first but it's up to you. It is commonly just written with `e`.

```
const handleProductOnClick = (e, productId) => {
```

then the first line of our function will be `e.preventDefault()`

We need to pass this function down to our productList as a prop.

Now where we are using it in the ProductCard, we need to pass the event. We can use another arrow function here.

```
onClick={(e) => handleProductOnClick(e, id)}
```

The e is passed as a parameter along to the handleProductOnClick directly from the OnClick event, and our id will come from the props of the component. If we hadn't declared our e in the parameter of our function it would have been undefined. Now we can see that if we click the product title, it won't refresh the page. It currently doesn't do anything, which is fine because we haven't told it to yet.

We're going to use axios again to make a request to our backend to fetch the productData for that individual product.

So our handleProductOnClick should look like:

```
  const handleProductOnClick = (e, productId) => {
    e.preventDefault();
    axios
      .get(`localhost:8080/product/${productId}`) (something like this)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
```

This is great! We have navigated to the PDP from the PLP! Yay!

If we then try to search for the same thing again, to take us back to the PLP, we can see it won't update the page. Even though we're handling search, the newSearchTerm hasn't actually updated so the UseEffect won't run. To clean that up a bit we can lift and shift all the search state updates from the useEffect into our handleSearch function, that way it will update the state when you search, regardless of whether the searchTerm updated. We can also setProductData to null in that function, to clean that slate.

```

  const handleSearch = (searchTerm = "") => {
    axios
      .get(`localhost:8080/search/${searchTerm}`)
      .then((res) => {
        console.log(res)
      setProductList(res.data)
      })
      .catch((e) => console.log(e));
    setSearchTerm(searchTerm);
    setProductData(null);
  };

```

### 2

Now we want to use the button. To do this we also want to store a basket in our local state, our basket can be an object, which we will give an id and the list of products, just like what the backend does;

```
{
  basketId: 'someId',
  basketItems: [
    {item1},
    {item2}
  ]
}
```

So use our hooks to set the initial state:

`const [basket, setBasket] = useState({ basketId: "", basketItems: [], }); `
We'll need another onClick handler to pass to our Trolley buttons, so make our empty function:

```
const handleAttClick = () => {
  console.log('ATT clicked')
}
```

We can then pass this function into both the Product Component and the ProductCard component.

Once passed in, add the OnClick to both the Filled Button Component.

One way which may seem normal to do would be:

```
        <FilledButton onClick={handleAttClick()}>Add To Trolley</FilledButton>
```

If we do it like this, you'll see 'ATT Clicked' in the console a few times, one for each button on the page, even though none of them have been clicked. If the function handleAttClick was updating some sort of state which resulted in the button rerendering, we would have gotten a re-renders error, as the function would have constantly been called.
Try it out if you like:
add `setBasket({ basketId: "hello" });` into the handleAttClick in the App.js and see what happens when you render the productCard.

This is why we have to write it as:

```
onClick={() => handleAttClick()}
```

This way, the function only gets called when onClick wants to be triggered.

We want to do a POST or a PUT request to the backend, which one depends on whether we already have a basket.

We're going to store the basketId after we've got one back from the backend, so we can use the value in the state to ascertain whether we want to do a POST or a PUT:

```
if (basket.basketId) {
  do an axios PUT
} else {
  do an axios POST
}
```

our axios post request will look like this:

```
axios.post('localhost:8080/baskets', {
    productId: ourId,
    quantity: theQuantity,
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
```

we need to pass our id and quantity to the ATT click function, we know that the quantity will always be 1 at the moment as we don't have any option to increase that.

So pass the parameters in and use them in our function.

`onClick={() => handleAttClick(product.id, 1)}`

`const handleAttClick = (productId, quantity) => {`

```
axios.post('localhost:8080/baskets', {
    productId: productId,
    quantity: quantity,
  })
```

Then, in the `then` we want to update our basket state with the response:

```
     .then((response) => {
        setBasket({
          basketId: response.id,
          basketItems: response.basketItems
        })
      })
```

replicate this using a put:
`` axios.put(`localhost:8080/baskets/\${productId}`, {...}) ``

You can see that it is in fact adding to your basket in the Components tab of devTools, and also in your backend logs.

### 3

Now we want to update the basket count depending on how many items are in the basket. We can pass the basketItems from state into our header, and do some array magic in there.

```
<Header handleSearch={handleSearch} basketItems={basket.basketItems} />

```

Now in our Header.js, which we haven't looked in a lot yet, we'll want to update the basket number with our actual number.

First just make a constant and set it to the length of basketItems, which is our array, to check it's going to update.
Where we can see 42 hardcoded, change that to be our constant, using the `{}` so that react knows it is a js variable and not just a string.

Now this is all good if our basket is only full of unique products, but if it's not we want to know how many of each are there.

We can either use the `array.map` function or we can use [`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce).

```
  const basketQuantity = basketItems.reduce((accumulator, current) => {
    return accumulator + current.quantity;
  }, 0);
```

Tada!

Next task if there's time: Clicking on the basket can display a product list, with an extra quantities prop passed?
