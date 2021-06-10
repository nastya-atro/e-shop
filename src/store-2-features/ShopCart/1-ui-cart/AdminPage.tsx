import React from 'react';
import { Button, Container, Paper } from '@material-ui/core';
import s from './Cart.module.css'
import { useState } from 'react';
import AdminAllCart from './AdminAllCart';
import Users from '../../Users/1-ui-users/Users';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthSelector } from '../../Users/2-bll-users/UsersSelector';

const AdminPage = () => {

    const [orderVisible, setOrderVisible] = useState(false)
    const [usersVisible, setUsersVisible] = useState(false)
    const isAuth = useSelector(isAuthSelector)

    return (
        <Container maxWidth='sm'>
            <Paper className={s.cart_paper}>

                {isAuth ? <React.Fragment>
                    <NavLink to='/'><ArrowBackIosIcon className={s.back} /></NavLink>

                    <div onClick={() => { setUsersVisible(!usersVisible) }} className={s.cart_users}>Users</div>
                    {usersVisible && <Users />}

                    <div onClick={() => { setOrderVisible(!orderVisible) }} className={s.cart_orders}>Orders</div>
                    {orderVisible && <AdminAllCart />}
                </React.Fragment> 

                : <div>
                        <NavLink to='/'><ArrowBackIosIcon className={s.back} /></NavLink>

                        <h3>You should login as Admin</h3>

                        <NavLink to='/login'>
                            <Button className={s.adminButton} variant="contained" color="secondary">Login </Button>
                        </NavLink>
                        
                    </div>}
            </Paper>
        </Container>
    )
}

export default AdminPage