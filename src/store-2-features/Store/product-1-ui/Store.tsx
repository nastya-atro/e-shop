import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsSelector, limitPageSelector, isLoadingSelector, categoryProductsSelector } from '../product-2-bll/StoreSelector';
import { getProductsThunk, getCategoryThunk, getCategoryProductsThunk } from '../product-2-bll/StoreReducer';
import s from './Store.module.css'
import { NavLink } from 'react-router-dom';
import { addNewProductInCartThunk } from './../../ShopCart/2-bll-cart/CartReducer';
import { Container, IconButton, Grid, Box, Backdrop, CircularProgress, FormControl, InputLabel, Select, MenuItem, Button, Paper } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddProductForm from './AddProductForm';
import { tokenSelector } from './../../Users/2-bll-users/UsersSelector'
import { useStylesStore } from '../../../store-3-common/Material.styles';

const Store: React.FC = () => {

    const classes = useStylesStore();
    const products = useSelector(productsSelector)
    const limitPage = useSelector(limitPageSelector)
    const isLoading = useSelector(isLoadingSelector)
    const categoryProducts = useSelector(categoryProductsSelector)
    const token = useSelector(tokenSelector)

    const [pageLimit, setPageLimit] = useState(limitPage)
    const [sortValue, setSortValue] = useState('')
    const [category, setCategory] = useState('')
    const [visibleAddForm, setvisibleAddForm] = useState(false)

    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsThunk(pageLimit, sortValue))
        dispatch(getCategoryThunk())
    }, [pageLimit, sortValue])


    useEffect(() => {
        if (category !== 'Все товары') {
            dispatch(getCategoryProductsThunk(pageLimit, sortValue, category))
        } else {
            dispatch(getProductsThunk(pageLimit, sortValue))
        }
    }, [category])


    if (isLoading) {
        return <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    const addProductInCart = (id: number) => {
        let obj = {
            userId: 1,
            date: new Date(),
            products: [{ productId: id, quantity: 1 }]
        }
        dispatch(addNewProductInCartThunk(obj))
    }


    return (
        <Container className={s.container_store} maxWidth="lg">


            <Container maxWidth="md" className={s.products_sort} >
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Order</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortValue}
                        onChange={(e) => { setSortValue(e.target.value as string) }}  >
                        <MenuItem value='asc'>first the old ones</MenuItem>
                        <MenuItem value='desc'>new ones first</MenuItem>
                    </Select>
                </FormControl>


                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={(e) => { setCategory(e.target.value as string) }}  >
                        {categoryProducts && categoryProducts.map((c, index) => <MenuItem key={index} value={c as string}>{c}</MenuItem>)}
                    </Select>
                </FormControl>
            </Container>

            <Box className={classes.container_grid}>

                {token &&
                    <div className={s.add_new_product}>
                        <Button onClick={() => { setvisibleAddForm(!visibleAddForm) }} variant="contained" color="secondary"> Add New Product </Button>
                    </div>

                }

                {visibleAddForm && <AddProductForm />}

                <Grid container direction="row" justify="flex-start" spacing={2} className={s.root}>
                    {products && products.map((p, index) => <Grid item key={index}>

                        <Paper className={s.container_paper}>
                            <NavLink to={`/products/${p.id}`}>
                                <div className={s.title}> {p.title} </div>
                            </NavLink>


                            <div className={s.category}>{p.category}</div>
                            <NavLink to={`/products/${p.id}`}>
                                <div className={s.product_img}><img src={p.image} alt={p.title}></img></div>
                            </NavLink>
                            <div className={s.price}><b>{p.price} $</b></div>

                            <div>
                                <IconButton aria-label="add to favorites">
                                    <ShoppingCartIcon onClick={() => { addProductInCart(p.id as number) }} />
                                </IconButton>

                            </div>
                        </Paper>
                    </Grid>)}
                </Grid>
            </Box>
        </Container>
    )
}

export default Store