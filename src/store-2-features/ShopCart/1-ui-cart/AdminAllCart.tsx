import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartsSelector } from './../2-bll-cart/CartSelector';
import { getAllCartsThunk } from './../2-bll-cart/CartReducer';
import { NavLink } from 'react-router-dom';
import AddProductForm from '../../Store/product-1-ui/AddProductForm';


const AdminAllCart=()=>{
    const carts = useSelector(cartsSelector)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllCartsThunk())
    },[carts])


    return(
        <ul>
            <div><NavLink to ='/users'>Users</NavLink></div>
            {carts.map((c, index)=><NavLink to={`/admin/cart/${c.id}`}><li key={index}>
                <div>Date: {new Date(c.date).toLocaleDateString()}</div>
                <div>Number cart: {c.id}</div>
            </li></NavLink>)}
            <AddProductForm />
        </ul>

    )
}


export default AdminAllCart