import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { signUpThunk } from '../2-bll-users/UsersReducer';
import { Redirect } from 'react-router';


type SignUpValuesType = {
    email: string
    password: string
    userName: string
    firstname: string
    lastname: string
    city: string
    street: string
    number: number
    zipcode: string
    phone: string

}

const SignUpPage = () => {
    const dispatch = useDispatch()

    const [isAuth, setIsAuth] = useState(false)

    const login = (values: SignUpValuesType, { setSubmitting }: any) => {
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
        dispatch(signUpThunk(newUser))
        setIsAuth(true)
        setSubmitting(false)
    }

    if (isAuth) {
        return <Redirect to={'/'} />
    }

    return (
        <div>
            <h3>Sign Up Form</h3>

            <Formik
                initialValues={{ email: '', password: '', userName: '', firstname: '', lastname: '', city: '', street: '', number: 1, zipcode: '', phone: '' }}
                onSubmit={login}
            >
                {({ isSubmitting, handleChange, values, isValid,
                    handleBlur, }) => (
                    <Form>
                        <div>Common info: </div>
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="email" value={values.email} placeholder="email" />
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="userName" value={values.userName} placeholder="userName" />
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="firstname" value={values.firstname} placeholder="firstname" />
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="lastname" value={values.lastname} placeholder="lastname" />
                        <div>Adress info: </div>
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="city" value={values.city} placeholder="city" />
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="street" value={values.street} placeholder="street" />
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="number" value={values.number} placeholder="number" />
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="zipcode" value={values.zipcode} placeholder="zipcode" />
                        <div>Contacts: </div>
                        <Field onChange={handleChange} onBlur={handleBlur} type="text"
                            name="phone" value={values.phone} placeholder="phone" />

                        <Field onChange={handleChange} onBlur={handleBlur}
                            type="password" name="password" placeholder="Password" value={values.password} />

                        <button type="submit" disabled={!isValid || isSubmitting}>
                            Sign up
           </button>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default SignUpPage