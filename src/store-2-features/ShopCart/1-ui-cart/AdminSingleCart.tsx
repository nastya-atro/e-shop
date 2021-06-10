import React, { useEffect } from 'react';
import s from './Cart.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { isLoadingSelector, singleCartSelector } from './../2-bll-cart/CartSelector';
import { getSingleCartThunk, deleteProductCartThunk } from './../2-bll-cart/CartReducer';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Container, Paper } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const AgminSingleCart = React.memo(() => {

    const singleCart = useSelector(singleCartSelector)
    const isLoading = useSelector(isLoadingSelector)

    const dispatch = useDispatch()

    const history = useHistory()
    let adress = history.location.pathname
    let id = Number(adress.substr(6))


    useEffect(() => {
        dispatch(getSingleCartThunk(id))
    }, [id])

    let processOrder = () => {
        dispatch(deleteProductCartThunk(id))
    }

    return (
        <Container maxWidth='sm'>
            <Paper className={s.cart_single_paper}>

                <NavLink to='/'><ArrowBackIosIcon className={s.back} /></NavLink>

                {singleCart && <div>
                    <div><b>User id </b> <div>{singleCart.userId}</div> </div>
                    <div><b>Date  </b> <div>{new Date(singleCart.date).toLocaleDateString()}</div></div>

                    <div>{singleCart.products && singleCart.products.map((p, index) => <div key={index}>

                        <b>Product № </b> {p.productId}
                        <span className={s.cart_quanity}>
                            <b>Quantity №  </b> {p.quantity}
                        </span>
                    </div>)}

                    </div>
                </div>}

                {!isLoading && <h3>Сompleted successfully !</h3>}

                <Button onClick={processOrder} className={s.orderButton} variant="contained" color="secondary">
                    Process an order</Button>

            </Paper>
        </Container>
    )
})

export default AgminSingleCart