import React from 'react';
import { Formik, Form, Field} from 'formik';
import { useDispatch } from 'react-redux';
import { addNewProductThunk } from '../product-2-bll/StoreReducer';

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
        <div>
            <Formik
                initialValues={{ title: '', price: 0, description: '', image: '', category: '' }}
                onSubmit={addNewForm}
            >
                {({ isSubmitting, handleChange, values, isValid }) => (
                    <Form>
                        <Field onChange={handleChange} placeholder="Title of product" type="text" name="title" value={values.title} />
                        <Field onChange={handleChange} placeholder="Product price" type="text" name="price" value={values.price} />
                        <Field onChange={handleChange} placeholder="Description" type="text" name="description" value={values.description} />
                        <Field onChange={handleChange} placeholder="Image url" type="text" name="image" value={values.image} />
                        <Field onChange={handleChange} placeholder="Category of product" type="text" name="category" value={values.category} />
                        <button type="submit" disabled={!isValid || isSubmitting}>
                            Add New Product
           </button>
                    </Form>
                )}
            </Formik>
        </div>

    )
}

export default AddProductForm