import React, { useEffect } from 'react';
import s from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { cartsSelector } from './../2-bll-cart/CartSelector';
import { getAllCartsThunk } from './../2-bll-cart/CartReducer';
import { NavLink } from 'react-router-dom';

const AdminAllCart = React.memo(() => {

    const carts = useSelector(cartsSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCartsThunk())
    }, [carts])

    return (
        <div>

            {carts.map((c, index) =><div key={index}> <NavLink to={`/cart/${c.id}`}>

                <div className={s.cart_all} >

                    <div>Date: {new Date(c.date).toLocaleDateString()}</div>
                    <div>Number cart: {c.id}</div>

                </div>
            </NavLink></div>)}

        </div>
    )
})


export default AdminAllCart