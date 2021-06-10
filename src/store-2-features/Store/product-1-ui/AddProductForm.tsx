import React from 'react';
import { Formik, Form } from 'formik';
import s from './Store.module.css'
import { useDispatch } from 'react-redux';
import { addNewProductThunk } from '../product-2-bll/StoreReducer';
import { TextField, Button, Container } from '@material-ui/core';

export type ValuesType = {
    title: string
    price: number
    description: string
    image: string
    category: string
}

const AddProductForm: React.FC = () => {

    const dispatch = useDispatch()

    const addNewForm = (values: ValuesType, { setSubmitting }: any) => {
        let title = values.title
        let price = values.price
        let description = values.description
        let image = values.image
        let category = values.category

        dispatch(addNewProductThunk({ title, price, description, image, category }))
        setSubmitting(false)
    }

    return (

        <Container maxWidth='sm' className={s.form_add_new_product}>
            <h3>Add new product form</h3>
            <Formik
                initialValues={{ title: '', price: 0, description: '', image: '', category: '' }}
                onSubmit={addNewForm}
            >
                {({ isSubmitting, handleChange, values, isValid }) => (
                    <Form>
                        <div><TextField onChange={handleChange} label="Title" type="text" name="title" value={values.title} /></div>
                        <div> <TextField onChange={handleChange} label="Price" type="text" name="price" value={values.price} /></div>
                        <div> <TextField onChange={handleChange} label="Description" type="text" name="description" value={values.description} /> </div>
                        <div> <TextField onChange={handleChange} label="Image url" type="text" name="image" value={values.image} /></div>
                        <TextField onChange={handleChange} label="Category" type="text" name="category" value={values.category} />
                        <div> <Button type="submit" disabled={!isValid || isSubmitting} variant="contained" color="primary">
                            Save </Button> </div>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default AddProductForm