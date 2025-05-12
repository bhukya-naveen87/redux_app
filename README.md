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
## Redux using @redux/toolkit + API Call