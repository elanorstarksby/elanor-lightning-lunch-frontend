# Step 1

## Aim:

Use the search bar to search by product id and return the Product info.

### 1

We currently `console.log` the input of our search bar. We want to instead use this input to fetch from the backend. We can do this by updating our local state and doing a get request when the state changes. Cue: hooks.

For local state we can use the `useState` hook. the `useState` function takes and initial value and returns an array.

In the App.js we want to add local state to store the current search term and a function used to update the searchTerm

Inside the App component (under `const App = () => {` )

We can add

```
const [newSearchTerm, setSearchTerm] = useState("");
```

This is setting `newSearchTerm` to an initial value of "" - empty string, and we have a setter funciont `setSearchTerm` to set the newSearchTerm when we want to change it.

So when do we want to change our search term? Inside our handleSearch function.

```
const handleSearch = (searchTerm = "") => {
    if (searchTerm) console.log(searchTerm);
    setSearchTerm(searchTerm);
  };
```

Now we want to do something if this changes. [`useEffect` is our lifecycle method](https://reactjs.org/docs/hooks-effect.html) which runs when the component mounts (onMount). It takes two parameters, the function to perform and an array. If the array is not passed at all, the function will run everytime the component rerenders (eg if the props change). If the array is empty, the function will only be called once, on mount (first render). You can pass things to the array to cause the effect to be ran if they change.

`useEffect(() => {do things here},[])` only runs once

`useEffect(() => {do things here}, [searchTerm])` will run every time the searchTerm changes

when our useEffect function runs we want to send a GET request to get the data from the backend.

Axios is a library which makes placing and interacting with requests with the backend easy, so we can do:

```
axios
  .get(`localhost:8080/products/${newSearchTerm}`)
  .then((res) => {console.log(res)})
  .catch((e) => console.log(e));
```

so all this does is logs the response from the backend, and if it errors then it will log the error.

Now we want to do something with the response, so we can use `useState` again to store the product information. So at the top under the searchTerm line:

```
const [productData, setProductData] = useState(null);
```

now that we have this we can store the response from axios:

```
axios
  .get(`localhost:8080/products/${newSearchTerm}`)
  .then((res) => {setProductData(res.data)})
  .catch((e) => console.log(e));
```

Fab! we have the product data being store in our local state, now we want to show the user.

### 2

We can use our Product component to show the user the important information for the product. Firstly we need to pass the product data into the component, using props.
our Product component can have a prop called `product` - the product we want to show.
to pass this in we want to add it to the place we're rendering the component:

```
<Product product={productData} />
```

What if the productData hasn't been set yet? Do we still want to render the Product component? probably not.

Because our initial value of productData is `null` we can treat it as a falsey value.
This means we can do a check for this value to only render the Product component if the productData doesn't return a falsey value

```
{ productData && <Product product={productData} />}
```

This works because of how the statement is executed. && is the AND operator in react, so it may feel weird that we're just doing `productData AND component`, but it's actually because if it reaches a falsey then it will stop executing the statement.
so really that line is the same as

```
if (productData) { return (<Product product={productData} />)}
```

it just looks nicer and is more readable.

So, we've fetched the productData, stored it in state, and passed it into the Product component. Now we need to show it in the Product component.

Yes, we may be passing the productData into the Product compoennt as a prop, but at the moment the component doesn't know this, we need to define the props in the component. There are two ways we can do this, either define the props object, so that everytime we want to use the product prop we would call `props.product`, or we can define it as a named prop. Here, we'll define it as a named prop.

in the Product Component we have an arrow functional component `() => {}`, it's in the brackets we put any props (parameters)

so the Product component becomes:

```
const Product = ({ product }) => {
```

this means we can get all the details in the product object that was returned from the backend by calling something like `product.attribute`

Firstly we can change our image to be the product we have searched for, using the public sainsburys assets, `https://assets.sainsburys-groceries.co.uk/gol/[productId]/1/640x640.jpg`

We can change the src of the image which is already there. since our productId would be a variable, namely `{product.id}` we have to use a dynamic string. For this, we use backticks
` `` ` instead of speech marks. we then use the variable with this format `${variable}`.
so in this case our src would become

```
src=`https://assets.sainsburys-groceries.co.uk/gol/${product.id}/1/640x640.jpg`
```

We should probably also change some classnames here, given they're not very relevant anymore for a product display page. Notice also that classnames in react are `className=` rather than in HTML `class=`.

If we reflect back to BEM then we know we want our classnames to follow the pattern of `block__element--modifier`. In this copmonent our block can be `product` and our element can be `image`.

So `className="product__image"`.
in our products.scss we can now change the `app__logo` to this classname: `.product__image {}`.
For future proofing we can utilise the fact that we're using scss by making that:

```
.product {
  &__image{

  }
}
```

these mean when we add more elements we don't have to write `.product...{}` every time.

Firstly, we want to make it on the left of the product page, so we need to change some styles. At the moment there is `margin: $ln-space auto;` which is using the ln-space variable from luna, and auto is making the image in the middle. the margin is using short hand for the 4 margins of the image. These are the different ways you can write the margin css:

```
margin: T R B L;
margin: TB RL;
margin: T RL B;
```

so our current margin is Top+Bottom: \$ln-space and Right+Left: auto, so the margin on the right and left is taking up all the space it can, hance a middle image. Change this to just be `margin: $ln-space` would result in even margin all the way round and the image is now on the left.
We can change the width to be 30% so that it will scale when the screensize changes.

Now lets go back to adding our product attributes, some important attributes would be title, price and description which are in the `product.attributes` object.

Using the h1 and Body1 that are already there we can just pass in the correct title and className:

```
              <h1 className="product__title">
                {product.attributes.name}
              </h1>
              <Body1 className="product__info">
                <strong>{product.attributes.price.now}</strong>
                {product.attributes.description && (
                  <p>{product.attributes.description}</p>
                )}
              </Body1>
```

We want the title on the right and the image on the left to start with, so we can use the float css (this is a tricky bit of css so best to not use it all the time, flexbox is excellent and you should all do [flexbox zombies](https://geddski.teachable.com/p/flexbox-zombies) when you get a chance)

On the image and info css add `float: left` and the title css: `float: right; width: 65%;`. We might lose all the height and it's going to look a bit odd because float results in the component losing knowldege of how big it is. so to counteract that we can add `min-height: 3em;` to the image.
