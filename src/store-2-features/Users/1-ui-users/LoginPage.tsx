import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginAuthThunk } from '../2-bll-users/UsersReducer';
import { isAuthSelector, errorSelector } from './../2-bll-users/UsersSelector';
import { Redirect } from 'react-router';
import SignUpPage from './SignUpPage';

type LoginFormValuesType = {
    email: string
    password: string
}


const LoginPage = () => {

    const isAuth = useSelector(isAuthSelector)
    const error = useSelector(errorSelector)
    const dispatch = useDispatch()

    const login = (values: LoginFormValuesType, { setSubmitting }: any) => {
        dispatch(loginAuthThunk(values.email, values.password))
        setSubmitting(false)
        values.email = ''
        values.password = ''

    }

    if (isAuth) {
        return <Redirect to={'/'} />
    }



    return (
        <div><h3>Login Form</h3>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={login}
            >
                {({ isSubmitting, handleChange, values, isValid,
                    handleBlur, }) => (
                    <Form>
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="email" value={values.email} placeholder="email or userName" />

                        <Field onChange={handleChange} onBlur={handleBlur}
                            type="password" name="password" placeholder="Password" value={values.password} />

                        <button type="submit" disabled={!isValid || isSubmitting}>
                            Login
           </button>
                    </Form>
                )}
            </Formik>
            {error && <div>
                Not correct value. Try again with test login-page:
                <div>
                    <b>Login: </b>
                    <span>mor_2314</span>
                    <div>
                        <b>Password: </b>
                        <span> 83r5^_</span>
                    </div>
                </div>
            </div>}
            
            <SignUpPage/>

        </div>
    )
}

export default LoginPage