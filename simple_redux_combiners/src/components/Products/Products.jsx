import React from 'react'
import products from '../../data/products.json'
import EachProduct from './EachProduct'

const Products = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {products.products.map(product => (
                <EachProduct key={product.id} product={product} />
            ))}
        </div>
    )
}

export default Products