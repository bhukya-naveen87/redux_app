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