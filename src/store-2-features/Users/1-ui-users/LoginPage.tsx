import { Formik, Form } from 'formik';
import s from './User.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginAuthThunk } from '../2-bll-users/UsersReducer';
import { isAuthSelector, errorSelector } from './../2-bll-users/UsersSelector';
import { Redirect } from 'react-router';
import SignUpPage from './SignUpPage';
import { Button, Container, Paper, TextField } from '@material-ui/core';

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
        <Container maxWidth='md'>
            <Paper className={s.user_paper}>
                <h3>Login Form</h3>
                <div className={s.login_input}>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={login}>

                    {({ isSubmitting, handleChange, values, isValid,
                        handleBlur, }) => (
                        <Form>
                            <div> <TextField id="standard-basic" onChange={handleChange} onBlur={handleBlur} type="text"
                                    name="email" value={values.email} label="Email" /> </div>
                            <div> <TextField id="standard-password-input" label="Password" type="password" autoComplete="current-password" onChange={handleChange} onBlur={handleBlur}
                                    name="password" value={values.password} /></div>
                            <div className={s.login_button}>
                                <Button type="submit" disabled={!isValid || isSubmitting} variant="contained" color="secondary">
                                    Login </Button></div>
                        </Form>
                    )}
                </Formik>
                </div>

                {error && <div> Try again with Admin-Login-Page:
                <div><b>Login - </b><span>mor_2314</span>
                        <div><b>Password - </b><span> 83r5^_</span></div>
                    </div></div> }

                <SignUpPage />
            </Paper>
        </Container>
    )
}

export default LoginPage