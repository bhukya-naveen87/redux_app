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

        
## Redux using @redux/toolkit
## Redux using @redux/toolkit + API Call