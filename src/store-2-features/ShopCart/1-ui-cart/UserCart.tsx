import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CartType, changeProductInCartThunk, getUserCartsThunk } from '../2-bll-cart/CartReducer';
import { cartsSelector } from './../2-bll-cart/CartSelector';
import { NavLink } from 'react-router-dom';
import { deleteProductCartThunk } from './../2-bll-cart/CartReducer';

const UserCart = () => {
    const carts = useSelector(cartsSelector)

   

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getUserCartsThunk(1))
    }, [])

    const deleteCart = (id: number) => {
        dispatch(deleteProductCartThunk(id))
    }

    

    return (
        <div><h3>My Cart</h3>
            {carts ? carts.map((c, index) => <div key={index}>

                <div>

                    <NavLink to={`/admin/cart/${c.id}`}>
                        <h4>Cart {c.id}</h4>
                    </NavLink>

                    <div>Date: {new Date(c.date).toLocaleDateString()}</div>
                    <div>
                        {c.products.map((p, index) => <div key={index}>
                            <b>ID of product: </b>
                            <span>{p.productId}</span>
                            <b>Quantity: </b>
                            <span>{p.quantity}</span>

                        </div>)}
                    </div>
                    
                </div>




                <div><button onClick={() => { deleteCart(c.id as number) }}>Delete Cart</button></div>
                

            </div>) : 'null'}</div>
    )
}

export default UserCart