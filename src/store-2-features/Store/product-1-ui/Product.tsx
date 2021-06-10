import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingSelector, singleProductSelector } from '../product-2-bll/StoreSelector';
import { changeProductinfoThunk, deleteProductThunk, getSingleProductsThunk } from '../product-2-bll/StoreReducer';
import s from './Store.module.css'
import { NavLink, useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { ValuesType } from './AddProductForm';
import { Button, Container, IconButton, Paper, TextField } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { addNewProductInCartThunk } from './../../ShopCart/2-bll-cart/CartReducer';


const Product: React.FC = () => {

    const singleProduct = useSelector(singleProductSelector)
    const isLoading = useSelector(isLoadingSelector)

    const [changeProductFormVisible, setChangeProductFormVisible] = useState(false)
    const [deleteSuccess, setdeleteSuccess] = useState(false)
    const [changedSuccess, setchangedSuccess] = useState(false)
    const [cartAdded, setCartAdded] = useState(false)

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
        console.log(title, price, description, image, category)
        if (!isLoading) {
            setChangeProductFormVisible(false)
            setchangedSuccess(true)
        }
        setSubmitting(false)
    }

    const deleteProduct = () => {
        dispatch(deleteProductThunk(id))
        if (!isLoading) {
            setdeleteSuccess(true)
        }
    }

    const addProductInCart = (id: number) => {
        let obj = {
            userId: 1,
            date: new Date(),
            products: [{ productId: id, quantity: 1 }]
        }
        dispatch(addNewProductInCartThunk(obj))
        setCartAdded(true)
    }

    useEffect(() => {
        dispatch(getSingleProductsThunk(id))
    }, [id])


    if (isLoading) {
        return <div>Loading...</div>
    }


    return (
        <Container className={s.products_container} maxWidth='sm'>
            <Paper className={s.products_paper}>

                <NavLink to='/'><ArrowBackIosIcon className={s.back} /></NavLink>

                {singleProduct ? <div>
                    <div className={s.products_title}>
                        <h3>{singleProduct.title}</h3>
                        <div><b>Categoty: </b><div>{singleProduct.category}</div></div>
                    </div>

                    <div className={s.products_img}><img src={singleProduct.image} alt={singleProduct.title}></img></div>
                    <h2>{singleProduct.price} $</h2>

                    <div>
                        <IconButton aria-label="add to favorites">
                            <ShoppingCartIcon onClick={() => { addProductInCart(singleProduct.id as number) }} />
                        </IconButton>
                        {cartAdded && <span>done!</span>}
                    </div>

                    <div className={s.products_description}><b>Description: </b><div>{singleProduct.description}</div></div>
                </div> : null}
                <div>

                    {deleteSuccess ? <h4>Product deleted successfully !!! </h4> : null}
                    {changedSuccess ? <h4>Product changed successfully !!! </h4> : null}


                    {changeProductFormVisible &&

                        <div className={s.products_form}>
                            <Formik
                                initialValues={{ title: '', price: 10, description: '', image: '', category: '' }}
                                onSubmit={changeProductInfo}>
                                {({ isSubmitting, handleChange, values, isValid }) => (
                                    <Form>
                                        <div><TextField onChange={handleChange} label="Title of product" type="text" name="title" value={values.title} />
                                        </div>
                                        <div><TextField onChange={handleChange} label="Product price" type="text" name="price" value={values.price} />
                                        </div>
                                        <div><TextField onChange={handleChange} label="Description" type="text" name="description" value={values.description} />
                                        </div>
                                        <div> <TextField onChange={handleChange} label="Image url" type="text" name="image" value={values.image} />
                                        </div>
                                        <div><TextField onChange={handleChange} label="Category of product" type="text" name="category" value={values.category} />
                                        </div>

                                        <div className={s.products_button_form}>

                                            <Button type="submit" disabled={!isValid || isSubmitting} variant="contained" color="primary">
                                                Save </Button>

                                            <Button onClick={() => { setChangeProductFormVisible(false) }} variant="contained" color="primary">
                                                Close </Button>

                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    }

                    <Button onClick={deleteProduct} variant="contained" color="secondary" className={s.products_button}>
                        {isLoading ? 'Deleting...' : 'Delete product'} </Button>

                    <Button onClick={() => { setChangeProductFormVisible(true) }} variant="contained" color="secondary" className={s.products_button}>
                        Change info </Button>

                </div>
            </Paper>
        </Container>
    )
}

export default Product