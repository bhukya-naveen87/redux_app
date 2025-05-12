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