import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsSelector, limitPageSelector, isLoadingSelector, sortValueSelector, categoryProductsSelector } from '../product-2-bll/StoreSelector';
import { getProductsThunk, getSingleProductsThunk, getCategoryThunk, getCategoryProductsThunk } from '../product-2-bll/StoreReducer';
import s from './Store.module.css'
import { NavLink } from 'react-router-dom';
import AddProductForm from './AddProductForm';
import { isAuthSelector } from '../../Users/2-bll-users/UsersSelector';


const Store: React.FC = () => {
    const products = useSelector(productsSelector)
    const limitPage = useSelector(limitPageSelector)
    const isLoading = useSelector(isLoadingSelector)
    const valueSort = useSelector(sortValueSelector)
    const categoryProducts = useSelector(categoryProductsSelector)
    const isAuth = useSelector(isAuthSelector)

    const [pageLimit, setPageLimit] = useState(limitPage)
    const [sortValue, setSortValue] = useState(valueSort)
    const [category, setCategory] = useState('')

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
        return <div>Loading...</div>
    }


    return (
        <div>
            <div><NavLink to ='/admin'>Admin cart</NavLink></div>
            <div><NavLink to ='/usercart'>User's shopping cart</NavLink></div>
            <div><NavLink to ='/users'>Users</NavLink></div>
            {!isAuth && <div><NavLink to ='/login'>Login</NavLink></div>}


            <div className={s.products_sort} >
                <div>
                    <b>Choose number of products: </b>
                    <select value={pageLimit} onChange={(e) => { setPageLimit(Number(e.target.value)) }}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </select>
                </div>
                <div>
                    <b>Choose sort of products: </b>
                    <select value={sortValue} onChange={(e) => { setSortValue(e.target.value) }}>
                        <option value='asc'>first the old ones</option>
                        <option value='desc' >new ones first</option>
                    </select>
                </div>
                <div> <b>Сhoose for a category: </b>
                    <select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                        {categoryProducts && categoryProducts.map((c) => <option>{c}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <AddProductForm/>   
            </div>

            {products ? products.map((p) =><div key={p.id}> <NavLink to={`/products/${p.id}`}><div key={p.id} >
                <div onClick={() => { dispatch(getSingleProductsThunk(p.id as number)) }}>{p.title}</div>
                <div><b>Price:</b>{p.price}$</div>
                <div className={s.products_img}><img src={p.image}></img></div>

            </div></NavLink>
            
            </div>) : 'no products'}

        </div>
    )
}

export default Store