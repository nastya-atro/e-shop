import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingSelector, singleProductSelector } from '../product-2-bll/StoreSelector';
import { changeProductinfoThunk, deleteProductThunk, getSingleProductsThunk } from '../product-2-bll/StoreReducer';
import s from './Store.module.css'
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { ValuesType } from './AddProductForm';


const Product: React.FC = () => {

    const singleProduct = useSelector(singleProductSelector)
    const isLoading = useSelector(isLoadingSelector)
    
    const [changeProductFormVisible, setChangeProductFormVisible] = useState(false)
    const [deleteSuccess, setdeleteSuccess] = useState(false)
    const [changedSuccess, setchangedSuccess] = useState(false)

    const dispatch = useDispatch()

    const history = useHistory()
    let adress = history.location.pathname
    let id = Number(adress.substr(10))

    const changeProductInfo = (values: ValuesType, { setSubmitting }: any) => {
        let title = values.title
        let price = values.price
        let description = values.description
        let image = values.image
        let category = values.category

        dispatch(changeProductinfoThunk(id, { title, price, description, image, category }))
        if (!isLoading) {
            setChangeProductFormVisible(false)
            setchangedSuccess(true)
        }
    }

    const deleteProduct = () => {
        dispatch(deleteProductThunk(id))
        if (!isLoading) {
            setdeleteSuccess(true)
        }
    }

    useEffect(() => {
        dispatch(getSingleProductsThunk(id))
    }, [id])


    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div>
                {singleProduct ? <div>
                    <div>Title:{singleProduct.title}</div>
                    <div className={s.products_img}><img src={singleProduct.image}></img></div>
                    <div>Price:{singleProduct.price}</div>
                    <div>Categoty:{singleProduct.category}</div>
                    <div>Description:{singleProduct.description}</div>
                </div> : null}
                <div>

                    <button onClick={deleteProduct}>
                        {isLoading ? 'Deleting...' : 'Delete product'}
                    </button>

                    <button onClick={() => { setChangeProductFormVisible(true) }}>Change info</button>
                    {changeProductFormVisible &&

                        <div>
                            <Formik
                                initialValues={{ title: '', price: 0, description: '', image: '', category: '' }}
                                onSubmit={changeProductInfo}
                            >
                                {({ isSubmitting, handleChange, values, isValid }) => (
                                    <Form>
                                        <Field onChange={handleChange} placeholder="Title of product" type="text" name="title" value={values.title} />
                                        <Field onChange={handleChange} placeholder="Product price" type="text" name="price" value={values.price} />
                                        <Field onChange={handleChange} placeholder="Description" type="text" name="description" value={values.description} />
                                        <Field onChange={handleChange} placeholder="Image url" type="text" name="image" value={values.image} />
                                        <Field onChange={handleChange} placeholder="Category of product" type="text" name="category" value={values.category} />
                                        <button type="submit" disabled={!isValid || isSubmitting}>
                                            ChangeProductInfo </button>
                                        <button onClick={() => { setChangeProductFormVisible(false) }}>Close</button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    }

                    {deleteSuccess ? <div>Product deleted succsesful !!! </div> : null}
                    {changedSuccess ? <div>Product changed succsesful !!! </div> : null}

                </div>
            </div>
        </div>
    )
}

export default Product