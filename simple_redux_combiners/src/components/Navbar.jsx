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