import React from 'react'
import { useDispatch } from 'react-redux'

const DecreaseButton = () => {
    const dispatch = useDispatch();
    return (
        <button onClick={() => dispatch({
            type: "DECREMENT"
        })} >Decrease</button>
    )
}

export default DecreaseButton