import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartsSelector } from './../2-bll-cart/CartSelector';
import { getAllCartsThunk } from './../2-bll-cart/CartReducer';
import { NavLink } from 'react-router-dom';


const AdminAllCart=()=>{
    const carts = useSelector(cartsSelector)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllCartsThunk())
    },[carts])


    return(
        <ul>
            {carts.map((c, index)=><NavLink to={`/admin/cart/${c.id}`}><li key={index}>
                <div>Date: {new Date(c.date).toLocaleDateString()}</div>
                <div>Number cart: {c.id}</div>
            </li></NavLink>)}
        </ul>

    )
}


export default AdminAllCart