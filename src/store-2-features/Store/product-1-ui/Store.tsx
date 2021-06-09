import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsSelector, limitPageSelector, isLoadingSelector, sortValueSelector, categoryProductsSelector } from '../product-2-bll/StoreSelector';
import { getProductsThunk, getCategoryThunk, getCategoryProductsThunk } from '../product-2-bll/StoreReducer';
import s from './Store.module.css'
import { NavLink } from 'react-router-dom';
import { addNewProductInCartThunk } from './../../ShopCart/2-bll-cart/CartReducer';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Theme, Container, IconButton, Typography, makeStyles, createStyles, Grid, Box, Backdrop, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 345,
            height: 520,
        },
        media: {
            height: 0,
            padding: '40%',
        },
        cardHeader: {
            height: 100
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        container_grid: {
            marginLeft: '90px'
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);


const Store: React.FC = () => {

    const classes = useStyles();

    const products = useSelector(productsSelector)
    const limitPage = useSelector(limitPageSelector)
    const isLoading = useSelector(isLoadingSelector)
    const valueSort = useSelector(sortValueSelector)
    const categoryProducts = useSelector(categoryProductsSelector)

    const [pageLimit, setPageLimit] = useState(limitPage)
    const [sortValue, setSortValue] = useState('')
    const [category, setCategory] = useState('')
    const [quantityValue, setQuantityValue] = useState(1)
    const [visibleCart, setVisibleCart] = useState(false)

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
            products: [{ productId: id, quantity: quantityValue }]
        }
        dispatch(addNewProductInCartThunk(obj))
        setVisibleCart(true)
    }


    return (
        <Container className={s.container_store} maxWidth="lg">


            <div className={s.products_sort} >
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
                            {categoryProducts && categoryProducts.map((c) => <MenuItem value={c as string}>{c}</MenuItem>)}
                    </Select>
                </FormControl>


                
            </div>
            <div>
            </div>
            <Box className={classes.container_grid}>
                <Grid container direction="row" justify="flex-start" spacing={2} className={s.root}>
                    {products && products.map((p) => <Grid  item><Card className={s.container_item}>

                        <CardHeader
                            action={<NavLink to={`/products/${p.id}`}>
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            </NavLink>}
                            title={p.category}
                            subheader={p.title}
                            className={classes.cardHeader} />
                        <CardMedia className={classes.media} image={p.image} title={p.description} />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Price:<b>{p.price}</b> $ </Typography>

                        </CardContent>

                        <CardActions disableSpacing>

                            <IconButton aria-label="add to favorites">
                                <ShoppingCartIcon onClick={() => { addProductInCart(p.id as number) }} />
                            </IconButton>
                            <input className={s.form} type='text' value={quantityValue} onChange={(e) => { setQuantityValue(Number(e.target.value)) }} />
                        </CardActions>

                    </Card>

                    </Grid>

                    )}
                </Grid>
            </Box>
        </Container>
    )
}

export default Store