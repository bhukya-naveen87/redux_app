import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const cart = useSelector(state => state.cart);
    return (
        <div className='navbar'>
            <div className="inner">
                <div>MyAPP</div>
                <div>Cart: {cart.length} Total Price: {cart.reduce((a, b) => a + b.cost, 0)}</div>
            </div>
        </div>
    )
}

export default Navbar