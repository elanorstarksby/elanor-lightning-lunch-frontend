# Step 3

## Aim:

Searching by product id doesn’t make sense, change the endpoint to /search and map through products with a simple output

### 1

The next step will be a crucial part of the app as you want to search through the products and then display the data using a simple output.

So far we have a simple search box which can only be used to search for a single product by id, which isn't very user friendly at all. Now, we want to change this functionality a bit to utilise our `/search` endpoint.

Firstly, change the axios get request to use `/search`.
We might want a different useState as well, so that we can use productData when we want to show the Product Display Page (PDP) in the future.

`const [productList, setProductList] = useState([]);`
which means we need to change the setProductData in the axios to setProductList.

We can now add a check for the productList, since it starts as an empty list all we need to do is check it has length, then map through the products

Under the Header add a code block using `{}` and do the same type of defensive check as we did for productDate;

`productList.length > 0 && ...`

Altogether that should look like:

```
    <div className="app">
      <Header handleSearch={handleSearch} />
        {productList.length > 0 &&
        }
      {productData && <Product product={productData} />}

    </div>
```

Now to map through our products and show the customer something useful, we'll start with just the product name for now, in a simple `<div>`

[Arrays in javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) have a few useful functions you can use to iterate through them and manipulate them in cases, each one accepting a function.
Here we just want to simply output something for each item, so we can use `.map`

The map function can accept an arrow function too.
When you map through the array you map through each item, we'll call this a productItem, and you can do what you want with it and return from the function.

so we can do:

```
productList.map(productItem => <div>{productItem.attributes.name}</div>)
```

Now you should be able to see a list of product names when you search.

[Step 4](./Step4.md)
