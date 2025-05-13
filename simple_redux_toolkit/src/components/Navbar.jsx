import React from 'react'
import { useSelector } from 'react-redux'
import { getCartproducts } from '../redux/slices/productSlices';

const Navbar = () => {
    const product = useSelector(getCartproducts);
    return (
        <div className='navbar'>
            <div className="inner">
                <div>MyAPP</div>
                <div>Cart: {product.length} Total Price: {product.reduce((a, b) => a + b.cost, 0)}</div>
            </div>
        </div>
    )
}

export default Navbar