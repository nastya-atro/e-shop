import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProfileThunk, getSingleUserThunk, updateProfileInfoThunk } from '../2-bll-users/UsersReducer';
import { isLoadingSelector, singleUserSelector} from './../2-bll-users/UsersSelector';
import { Formik, Form, Field } from 'formik';
import {SignUpValuesType} from './SignUpPage'



const MyProfile = () => {
    const singleUser = useSelector(singleUserSelector)
    const isLoading = useSelector(isLoadingSelector)

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

    const deleteProfile=()=>{
        dispatch(deleteProfileThunk(1))
    }
    const changeProfile=()=>{
        setVisibleFormChanges(true)

    }


    return (
        <div>{singleUser && <div>
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
{visibleFormChanges &&<div>
    <Formik
                initialValues={{ email: '', password: '', userName: '', firstname: '', lastname: '', city: '', street: '', number: 1, zipcode: '', phone: '' }}
                onSubmit={changeInfo}
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
                            ChangeInfo
           </button>
                    </Form>
                )}
            </Formik>
                 </div>
        }
        
  


        <button onClick={changeProfile}>Change Profile</button>
        <div><button onClick={deleteProfile}>Delete Profile</button></div>
        {!isLoading && <div>Profile deleted successfuly</div>}
            
        </div>
    )
}

export default MyProfile