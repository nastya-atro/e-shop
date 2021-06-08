import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { singleCartSelector } from './../2-bll-cart/CartSelector';
import {getSingleCartThunk } from './../2-bll-cart/CartReducer';
import {  useHistory } from 'react-router-dom';



const AgminSingleCart=()=>{

    const singleCart = useSelector(singleCartSelector)
    
    const dispatch = useDispatch()

    const history = useHistory()
    let adress = history.location.pathname
    let id = Number(adress.substr(12))


    useEffect(()=>{
        dispatch(getSingleCartThunk(id))

    },[])

    return(
        <div>{singleCart && <div>
            <div>{new Date(singleCart.date).toLocaleDateString()}</div>
            <div>{singleCart.products.map((p, index)=><div key={index}><b>ID of product: </b>{p.productId}
                <b>Quantity: </b>{p.quantity}</div>)}</div>
                <div>User id: {singleCart.userId}</div>
            
            </div>}</div>
    )
}

export default AgminSingleCart