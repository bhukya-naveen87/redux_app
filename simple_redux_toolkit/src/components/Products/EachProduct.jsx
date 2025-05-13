import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/slices/productSlices';

const EachProduct = ({ product }) => {
    const dispatch = useDispatch();
    const cartProducts = useSelector(state => state.product);
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
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '12px',
            width: '300px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
            />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ₹{Math.round(product.price)}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid #ccc',
                padding: '0px 10px',
                borderRadius: '5px',
                width: 'fit-content'
            }}>
                <span style={{ cursor: 'pointer', fontWeight: 'bold', borderRight: "1px solid", paddingRight: "8px" }} onClick={() => removeProdFromCart(product.id)}>-</span>
                <span>{thisProd}</span>
                <span style={{ cursor: 'pointer', fontWeight: 'bold', borderLeft: "1px solid", paddingLeft: "8px" }} onClick={() => addProdToCart(product.title, Math.round(product.price), product.id)}>+</span>
            </div>

        </div>
    );
};

export default EachProduct;
