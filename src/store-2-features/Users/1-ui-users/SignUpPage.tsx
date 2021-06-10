import { useState } from 'react';
import { Formik, Form } from 'formik';
import s from './User.module.css'
import { useDispatch } from 'react-redux';
import { signUpThunk } from '../2-bll-users/UsersReducer';
import { Redirect } from 'react-router';
import { Button, TextField } from '@material-ui/core';


export type SignUpValuesType = {
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
            <div className={s.sign_up_input}>
                <Formik
                    initialValues={{ email: '', password: '', userName: '', firstname: '', lastname: '', city: '', street: '', number: 1, zipcode: '', phone: '' }}
                    onSubmit={login}
                >
                    {({ isSubmitting, handleChange, values, isValid,
                        handleBlur, }) => (
                        <Form>
                            <div>Common info </div>
                            <div>
                                <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                    name="email" value={values.email} label="Email" />
                            </div>
                            <div>
                                <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                    name="userName" value={values.userName} label="UserName" />
                            </div>
                            <div>
                                <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                    name="firstname" value={values.firstname} label="Firstname" />
                            </div>
                            <div>
                                <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                    name="lastname" value={values.lastname} label="Lastname" />
                            </div>
                            <div>Adress  </div>
                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                name="city" value={values.city} label="City" />
                            <div>
                                <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                    name="street" value={values.street} label="Street" />
                            </div>
                            <div>
                                <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                    name="number" value={values.number} label="Number" />
                            </div>
                            <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                name="zipcode" value={values.zipcode} label="Zipcode" />
                            <div>Contacts </div>
                            <div>
                                <TextField onChange={handleChange} onBlur={handleBlur} type="text"
                                    name="phone" value={values.phone} label="Phone" />
                            </div>
                            <div>
                                <TextField onChange={handleChange} onBlur={handleBlur}
                                    type="password" name="password" label="Password" value={values.password} />
                            </div>
                            <div className={s.sign_up_button}>
                                <Button type="submit" disabled={!isValid || isSubmitting} variant="contained" color="secondary">
                                    Sign Up </Button></div>

                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}

export default SignUpPage