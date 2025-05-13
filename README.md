# Redux
## Redux Architecture:
![Redux Architecture](redux_arcchitecture.gif)
## Redux using Redux [simple_redux]
- ### Packages needed:
    - Packages needed are **redux, react-redux**.
    - ```
        npm i redux react-redux
      ```
    - In recent times, instead of **redux**, we're using **@redux/toolkit**.
- ### Create Store:
    - In redux/store.js:
        ```
        import { createStore } from 'redux'
        const reducer = (state=0, action)=>{
            switch (action.type) {
                case "INCREMENT":
                    return state + action.payload;
                case "DECREMENT":
                    return state - 1;
                default:
                    return state;
            }
        }
        const store = createStore(reducer);
        export default store;
        ```
- ### Wrap Store around App:
    - We have to wrap the store around the App, so inside elements can use the store.
        ```
        import { StrictMode } from 'react'
        import { createRoot } from 'react-dom/client'
        import App from './App.jsx'
        import './index.css'

        //redux code-starts
        import { Provider } from 'react-redux'
        import store from './redux/store.js'
        //redux code-ends

        createRoot(document.getElementById('root')).render(
            <StrictMode>
                ////redux code-starts
                <Provider store={store}>
                <App />
                </Provider>
                //redux code-ends
            </StrictMode>,
        )
        ```
- ### Dispatching Action and payload:
    - Here **useDispatch** is used to dispatch the actions.
    - In components/IncreaseButton.jsx
        ```
        import React from 'react'
        import { useDispatch } from 'react-redux'

        const IncreaseButton = () => {
            const dispatch = useDispatch();
            return (
                <button onClick={()=> dispatch({
                    type: "INCREMENT",
                    payload: 2
                })} >Increase</button>
            )
        }
        export default IncreaseButton
        ```
- ### Using state:
    - Using **useSelector**, we can access the state.
        ```
        import React from 'react'
        import { useSelector } from 'react-redux'

        const Counter = () => {
            const count = useSelector(state => state)
            return (
                <div>{count}</div>
            )
        }
        export default Counter
        ```


## Redux using Redux with [simple_redux_combiners]:
- ### Packages needed:
    - Packages needed are **redux, react-redux**.
    - ```
        npm i redux react-redux
      ```
    - In recent times, instead of **redux**, we're using **@redux/toolkit**.
- ### Create Store:
    - In redux/store.js:
        ```
        import { createStore } from 'redux'
        import reducer from './reducers';

        const store = createStore(reducer);
        export default store;
        ```
- ### Reducer with combined reducers:
    - In reducers/index.js:
        ```
        import { combineReducers } from "redux";
        import loginReducer from "./loginReducer";
        import productReducer from "./productReducer";

        const reducer = combineReducers({
            login: loginReducer,
            product: productReducer
        })

        export default reducer;
        ```
    - In productReducer.js:
        ```
        import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/products/productTypes";

        const initialState = []
        const productReducer = (state = initialState, action) => {
            switch (action.type) {
                case ADD_TO_CART:
                    return [
                        ...state,
                        action.payload
                    ]
                case REMOVE_FROM_CART:
                    let removedData = 0
                    const restData = []
                    state.forEach(each => {
                        if(removedData == 0 && each.id === action.payload.id){
                            removedData = 1;
                        }else{
                            restData.push(each)
                        }
                    })
                    return [
                        ...restData
                    ]
                default:
                    return state;
            }
        }

        export default productReducer;
        ```
- ### Create Action types:
  - In **actions/products/productTypes.js**:
    ```
    export const ADD_TO_CART = "ADD_TO_CART"
    export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
    ```
- ### Create Actions:
  - This action types are used in dispatch.
  - In **actions/products/productActions.js**:
    ```
    // productActions.js
    import { ADD_TO_CART, REMOVE_FROM_CART } from "./productTypes";
    export const addToCart = (productData) => {
        return {
            type: ADD_TO_CART,
            payload: productData
        };
    };
    export const removeFromCart = (productData) => {
        return {
            type: REMOVE_FROM_CART,
            payload: productData
        };
    };

    ```
- ### Wrap Store around App:
    - We have to wrap the store around the App, so inside elements can use the store.
        ```
        import { StrictMode } from 'react'
        import { createRoot } from 'react-dom/client'
        import App from './App.jsx'
        import './index.css'

        //redux code-starts
        import { Provider } from 'react-redux'
        import store from './redux/store.js'
        //redux code-ends

        createRoot(document.getElementById('root')).render(
            <StrictMode>
                ////redux code-starts
                <Provider store={store}>
                <App />
                </Provider>
                //redux code-ends
            </StrictMode>,
        )
        ```
- ### Dispatching Action and payload:
    - Here **useDispatch** is used to dispatch the actions.
    - In components/IncreaseButton.jsx
        ```
        import React, { useEffect, useState } from 'react';
        import { useDispatch, useSelector } from 'react-redux';
        import { addToCart, removeFromCart } from '../../redux/actions/products/productActions';

        const EachProduct = ({ product }) => {
            const dispatch = useDispatch();
            const cartProducts = useSelector(state => state.product);
            // console.log("EachProduct: ", cartProducts)
            const addProdToCart = (title, price, id) => {
                dispatch(addToCart({
                    productName: title,
                    cost: price,
                    id
                }))
            }
            const removeProdFromCart = (id) => {
                dispatch(removeFromCart({
                    id
                }))
            }

            const [thisProd, setThisProd] = useState(0);

            useEffect(() => {
                const thisProdExists = cartProducts.filter(each => each.id == product.id)
                setThisProd(thisProdExists.length)
            }, [cartProducts, product])

            return (<div>
                <span style={{ cursor: 'pointer', fontWeight: 'bold', borderRight: "1px solid", paddingRight: "8px" }} onClick={() => removeProdFromCart(product.id)}>-</span>
                <span>{thisProd}</span>
                <span style={{ cursor: 'pointer', fontWeight: 'bold', borderLeft: "1px solid", paddingLeft: "8px" }} onClick={() => addProdToCart(product.title, product.price, product.id)}>+</span>
            </div>)

        }
        ```
- ### Using state:
    - Using **useSelector**, we can access the state. Here in Navbar.jsx, I am using.
        ```
        import React from 'react'
        import { useSelector } from 'react-redux'

        const Navbar = () => {
            const product = useSelector(state => state.product);
            console.log("State: ", product)
            return (
                <div className='navbar'>
                    <div className="inner">
                        <div>MyAPP</div>
                        <div>Cart: {product.length} Total Price: {Math.round(product.reduce((a, b) => a + b.cost, 0))}</div>
                    </div>
                </div>
            )
        }

        export default Navbar
        ```

      
## Redux using @redux/toolkit
- ### Packages needed:
  - Packages needed are:
    - ```
       npm i react-redux @reduxjs/toolkit
      ```
- ### Create Store and Wrap Around App:
  - Store is created and wrapped around the app in index/main.js:
  - In **redux**, **createStore** is used to create store, but here in **reduxjs/toolkit**, **configureStore** is used and it is more powerful.
    - redux/store.js:
        ```
        import { configureStore } from '@reduxjs/toolkit';
        import productSlice from '../redux/slices/productSlices'

        const store = configureStore({
            reducer: {
                product: productSlice
            }
        })
        export default store;
        ```
    - Wrap around the app in Index/main.js:
        ```
        import { StrictMode } from 'react'
        import { createRoot } from 'react-dom/client'
        import './index.css'
        import App from './App.jsx'
        import { Provider } from 'react-redux'
        import store from './redux/store.js'


        createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Provider store={store}>
            <App />
            </Provider>
        </StrictMode>,
        )
      ```
- ### Create Slice:
    - Like reducers, using reduxjs/toolkit, here we create slices. 
    - Using reduxjs/toolkit, we don't need to create any **actions** separately.
    - redux/slices/productSlice.js:
        ```
        import { createSelector, createSlice } from '@reduxjs/toolkit'

        const productSlice = createSlice({
            name: "Product",
            initialState: [],
            reducers: {
                addToCart: (state, action) => {
                    state.push(action.payload)
                    return state;
                },
                removeFromCart: (state, action) => {
                    let removedData = 0
                    const restData = []
                    state.forEach(each => {
                        if (removedData == 0 && each.id === action.payload.id) {
                            removedData = 1;
                        } else {
                            restData.push(each)
                        }
                    })
                    state = [...restData];
                    return state;
                }
            }
        })

        export const getCartproducts = createSelector(state => state.product, state => state);
        export const { addToCart, removeFromCart } = productSlice.actions

        export default productSlice.reducer;
        ```
    - In **createSlice**:
      - **name** is used to give name to the slice and it is nominal and is not used anywhere.
      - **initialState** is the initial state of the particular slice.
      - **reducers** is an ***object of actions*** for which what logic has to be implemented using **state** and **action**. 
      - ```export const { addToCart, removeFromCart } = productSlice.actions``` returns the actions created in the reducer.
      - In any other components, if we want to access the products, we have to write code like
        - ```
          const state = useSelector(state => state);
          console.log(state.product) //here product name is mentioned in **reducer** in **store**.
          ```
        - Using **createSelector** hook from **@reduxjs/toolkit**, we can create a function which can be used wherever we want.
          - ```
            export const getCartproducts = createSelector(state => state.product, state => state);

            ```
          - In other components:
          - ```
            const product = useSelector(getCartproducts);
            console.log(product) // we can directly access the products.
            ```
        - Here we export like 
          - ```
            export default productSlice.reducer;
            ```
- ### Call Dispatch:
  - While using dispatch in **'@reduxjs/toolkit'**, actions are called from exports made in slice only.
  - Dispatch code is as follows:
    - ```
        import { useDispatch, useSelector } from 'react-redux';
        import { addToCart, removeFromCart } from '../../redux/slices/productSlices';

        const EachProduct = ({ product }) => {
            const dispatch = useDispatch();
            const cartProducts = useSelector(getCartproducts);

            const addProdToCart = (title, price, id) => {
            dispatch(addToCart({
                productName: title,
                cost: price,
                id
            }))
            }
            const removeProdFromCart = (id) => {
                dispatch(removeFromCart({
                    id
                }))
            }
            return (
                <div>
                    <button
                        onClick={()=>{addProdToCart(product.title, product.price, product.id)}}
                    >Add To Cart</button>
                    <button
                        onClick={()=>{removeProdFromCart(product.id)}}
                    >Remove From Cart</button>
                </div>
            )
        }
      ```
- ### Access Data:
  - We can access data by
    - Using below away, we can access product directly.
      ```
      const product = useSelector(getCartproducts); 
      ```
    - Using below way, we have to return **state.product** to access the product. [This is recommended].
      ```
      const product = useSelector(state => state.product); 
      ```
## Redux using @redux/toolkit + API Call
- ### Packages needed:
  - Packages needed are:
    - ```
       npm i react-redux @reduxjs/toolkit
      ```
- ### Create Store and Wrap Around App:
  - Store is created and wrapped around the app in index/main.js:
  - In **redux**, **createStore** is used to create store, but here in **reduxjs/toolkit**, **configureStore** is used and it is more powerful.
    - redux/store.js:
        ```
        import { configureStore } from '@reduxjs/toolkit';
        import productSlice from '../redux/slices/productSlice'
        import cartSlice from '../redux/slices/cartSlice'

        const store = configureStore({
            reducer: {
                product: productSlice,
                cart: cartSlice
            }
        })
        export default store;
        ```
    - Wrap around the app in Index/main.js:
        ```
        import { StrictMode } from 'react'
        import { createRoot } from 'react-dom/client'
        import './index.css'
        import App from './App.jsx'
        import { Provider } from 'react-redux'
        import store from './redux/store.js'


        createRoot(document.getElementById('root')).render(
        <StrictMode>
            <Provider store={store}>
            <App />
            </Provider>
        </StrictMode>,
        )
      ```
- ### Create Slice and Made API:
  - Previously, in **src/data/products.json** a static data is created and rendered. But here in products slice, we create an api to fetch data and set it to products.
  - Later on clicking +/- buttons, we add/remove them to/from cart.
  - redux/slices/productSlice.js
    ```
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

    export const fetchProductData = createAsyncThunk('fetchProducts', async () => {
        const resp = await fetch('https://dummyjson.com/products')
        return resp.json();
    })

    const productSlice = createSlice({
        name: "Products",
        initialState: {
            isLoading: false,
            data: null,
            isError: false
        },
        extraReducers: (builder) => {
            builder.addCase(fetchProductData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            builder.addCase(fetchProductData.pending, (state, action) => {
                state.isLoading = true;
            })
            builder.addCase(fetchProductData.rejected, (state, action) => {
                console.log("Error: ", action.payload)
                state.isError = true
            })
        }
    })

    export default productSlice.reducer;
    ```
    - createAsyncThunk takes **api name** and **call back**.
    - To set data from this api, in createSlice, there is something called **extraReducer** which is a function. On fetch call, this extraReducer set the initialState.
- ### Call Dispatch and Call API to fetch Data:
    - Now we have to call that api and have to set data.
      ```
        import React, { useEffect } from 'react'
        import EachProduct from './EachProduct'
        import { useDispatch, useSelector } from 'react-redux'
        import { fetchProductData } from '../../redux/slices/productSlice'

        const Products = () => {
            const dispatch = useDispatch();
            const state = useSelector(state => state);
            useEffect(() => {
                dispatch(fetchProductData())
            }, [])
            return (
                state?.product?.isLoading ? <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        Loading....
                    </div>
                </> : <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {state?.product?.data?.products?.map(product => (
                            <EachProduct key={product.id} product={product} />
                        ))}
                    </div>
                </>
            )
        }
        export default Products
        ```
    - Using dispacth we call the function ```dispatch(fetchProductData())```.
    - While setting data, we are setting as **state.data = action.payload** Now we access the data as follows:
      ```
      const product = useSelector(state => state.product);
      console.log(product.data)
      ```

- ### Access Data:
  ```
  const product = useSelector(state => state.product);
  console.log(product.data)
  ```