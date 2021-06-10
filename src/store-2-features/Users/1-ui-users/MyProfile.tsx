import React, { useEffect, useState } from 'react';
import s from './User.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { deleteProfileThunk, getSingleUserThunk, updateProfileInfoThunk } from '../2-bll-users/UsersReducer';
import { isAuthSelector, isLoadingSelector, singleUserSelector } from './../2-bll-users/UsersSelector';
import { Formik, Form } from 'formik';
import { SignUpValuesType } from './SignUpPage'
import { Button, Container, Paper, TextField } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const MyProfile = () => {
    const singleUser = useSelector(singleUserSelector)
    const isLoading = useSelector(isLoadingSelector)
    const isAuth = useSelector(isAuthSelector)

    const [visibleFormChanges, setVisibleFormChanges] = useState(false)


    const dispatch = useDispatch()

    const changeInfo = (values: SignUpValuesType, { setSubmitting }: any) => {
        let newUser = {
            email: values.email,
            username: values.userName,
            password: values.password,
            name: {
                firstname: values.firstname,
                lastname: values.lastname
            },
            address: {
                city: values.city,
                street: values.street,
                number: values.number,
                zipcode: values.zipcode,
                geolocation: {
                    lat: '',
                    long: ''
                }
            },
            phone: values.phone
        }
        dispatch(updateProfileInfoThunk(1, newUser))
        setSubmitting(false)
        setVisibleFormChanges(false)
    }

    useEffect(() => {
        dispatch(getSingleUserThunk(1))
    }, [])

    const deleteProfile = () => {
        dispatch(deleteProfileThunk(1))
    }

    const changeProfile = () => {
        setVisibleFormChanges(true)
    }


    return (
        <Container maxWidth='sm'>
            <Paper className={s.user_paper}>
                <div className={s.user_title}>
                    <NavLink to='/'><ArrowBackIosIcon className={s.back} /></NavLink>
                    <h2>My Profile</h2>

                    <div>
                        {isAuth ? <>
                            {singleUser && <div>

                                <div className={s.user_name}> <h3>Common info</h3>
                                    <div><b>User name </b>{singleUser.name.firstname} {singleUser.name.lastname}</div>
                                    <div><b>Login </b>{singleUser.username}</div></div>

                                <div className={s.user_contacts}><h3>Contacts </h3>
                                    <div><b>Email </b> {singleUser.email}</div>
                                    <div><b>Phone </b> {singleUser.phone}</div></div>

                                <div className={s.user_adress}><h3>Adress </h3>
                                    <div><b>City </b> {singleUser.address.city}</div>
                                    <div><b>Street </b>{singleUser.address.street}</div>
                                    <div><b>Zipcode </b> {singleUser.address.zipcode}</div>
                                    <div><b>Geolocation lat </b> {singleUser.address.geolocation.lat}Geolocation long: {singleUser.address.geolocation.long}</div>
                                </div>

                            </div>}

                            {visibleFormChanges && <div className={s.user_form}>
                                <Formik
                                    initialValues={{ email: '', password: '', userName: '', firstname: '', lastname: '', city: '', street: '', number: 1, zipcode: '', phone: '' }}
                                    onSubmit={changeInfo} >
                                    {({ isSubmitting, handleChange, values, isValid,
                                        handleBlur, }) => (
                                        <Form>
                                            <div>Common info </div>
                                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                                name="email" value={values.email} label="email" />
                                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                                name="userName" value={values.userName} label="userName" />
                                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                                name="firstname" value={values.firstname} label="firstname" />
                                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                                name="lastname" value={values.lastname} label="lastname" />
                                            <div>Adress  </div>
                                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                                name="city" value={values.city} label="city" />
                                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                                name="street" value={values.street} label="street" />
                                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                                name="number" value={values.number} label="number" />
                                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                                name="zipcode" value={values.zipcode} label="zipcode" />
                                            <div>Contacts </div>
                                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                                name="phone" value={values.phone} label="phone" />

                                            <TextField onChange={handleChange} onBlur={handleBlur}
                                                type="password" name="password" label="Password" value={values.password} />

                                            <div className={s.user_change_button}>
                                                <Button onClick={deleteProfile} variant="contained" color="primary" type="submit" disabled={!isValid || isSubmitting}>
                                                    Change </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            }

                            {!isLoading && <h3>Сompleted successfully !</h3>}

                            <div className={s.user_button_form}>
                                <Button onClick={changeProfile} type="submit" variant="contained" color="secondary">
                                    Change Profile </Button>
                                <Button onClick={deleteProfile} variant="contained" color="primary">
                                    Delete Profile </Button>
                            </div>

                        </>
                            : <div>
                                <h3>You should login</h3>
                                <NavLink to='/login'>
                                    <Button className={s.adminButton} variant="contained" color="secondary">Login </Button>
                                </NavLink>
                            </div>
                        }
                    </div>
                </div>
            </Paper>
        </Container>
    )
}

export default MyProfile