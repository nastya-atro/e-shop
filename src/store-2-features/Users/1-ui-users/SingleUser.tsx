import { useEffect } from 'react';
import s from './User.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getUserCartsThunk } from '../../ShopCart/2-bll-cart/CartReducer';
import { getSingleUserThunk } from '../2-bll-users/UsersReducer';
import { singleUserSelector } from './../2-bll-users/UsersSelector';
import { cartsSelector } from './../../ShopCart/2-bll-cart/CartSelector';
import { Container, Paper } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const User = () => {
    const singleUser = useSelector(singleUserSelector)
    const carts = useSelector(cartsSelector)

    const dispatch = useDispatch()

    const history = useHistory()
    let adress = history.location.pathname
    let id = Number(adress.substr(6))

    useEffect(() => {
        dispatch(getSingleUserThunk(id))

    }, [id])

    useEffect(() => {
        dispatch(getUserCartsThunk(id))
    }, [])

    return (
        <Container maxWidth='sm'>
            <Paper className={s.user_paper}>
                <NavLink to='/admin'><ArrowBackIosIcon className={s.back} /></NavLink>
                <h3> Info about user</h3>

                {singleUser && <div>
                    <div><b>User name: </b>{singleUser.name.firstname} {singleUser.name.lastname}</div>
                    <div><b>User login: </b>{singleUser.username}</div>

                    <div><b>Contacts: </b>
                        <div>Email: {singleUser.email}</div>
                        <div>Phone: {singleUser.phone}</div></div>

                    <div><b>Adress: </b>
                        <div>City: {singleUser.address.city}</div>
                        <div>Street: {singleUser.address.street}</div>
                        <div>Zipcode: {singleUser.address.zipcode}</div>
                        <div>Geolocation lat: {singleUser.address.geolocation.lat}Geolocation long: {singleUser.address.geolocation.long}</div>
                    </div>

                </div>}
                <div><h3>Cart of user</h3>
                    {carts ? carts.map((c, index) =><div key={index}> <NavLink to={`/cart/${c.id}`}><div className={s.user_cart_info} >
                        <div>Date: {new Date(c.date).toLocaleDateString()}</div>
                        <div>{c.products.map((p, index) => <div key={index}>
                            <b>ID of product: </b>{p.productId}
                            <b>Quantity: </b>{p.quantity}
                        </div>)}</div>
                    </div></NavLink></div>) : 'null'}</div>

            </Paper>
        </Container>
    )
}

export default User


