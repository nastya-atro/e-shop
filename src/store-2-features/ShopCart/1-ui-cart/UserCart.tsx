import  { useEffect } from 'react';
import s from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { getUserCartsThunk } from '../2-bll-cart/CartReducer';
import { cartsSelector } from './../2-bll-cart/CartSelector';
import { NavLink } from 'react-router-dom';
import { deleteProductCartThunk } from './../2-bll-cart/CartReducer';
import { Button, Container, Paper } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { isAuthSelector } from '../../Users/2-bll-users/UsersSelector';

const UserCart = () => {
    const carts = useSelector(cartsSelector)
    const isAuth = useSelector(isAuthSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserCartsThunk(1))
    }, [])

    const deleteCart = (id: number) => {
        dispatch(deleteProductCartThunk(id))
    }



    return (
        <Container maxWidth='sm'>
            <Paper className={s.cart_paper}>
                <NavLink to='/'><ArrowBackIosIcon className={s.back} /></NavLink>

                <h3>My Cart</h3>

                {isAuth ?
                    <> { carts ? carts.map((c, index) => <div key={index}>

                                <div className={s.cart}>

                                    <NavLink to={`/cart/${c.id}`}>
                                        <h4>Cart {c.id}</h4>
                                    </NavLink>

                                    <div className={s.cart_date}><b>Date  </b> {new Date(c.date).toLocaleDateString()}</div>
                                    <div>
                                        {c.products.map((p, index) => <div key={index}>
                                            <b>Product №  </b>
                                            <span>{p.productId}</span>

                                            <span className={s.cart_quanity}>
                                                <b>Quantity №  </b>
                                                <span>{p.quantity}</span>
                                            </span>
                                        </div>)}
                                    </div>
                                </div>

                                <div>
                                    <Button onClick={() => { deleteCart(c.id as number) }} className={s.cart_button} variant="contained" color="secondary">
                                        Delete Cart </Button>
                                </div>
                            </div>) : 'null'}</>

                    : <div>

                        <h3>You should login</h3>
                        
                        <NavLink to='/login'>
                            <Button className={s.adminButton} variant="contained" color="secondary">Login </Button>
                        </NavLink>
                    </div>
                }
            </Paper></Container>
    )
}

export default UserCart