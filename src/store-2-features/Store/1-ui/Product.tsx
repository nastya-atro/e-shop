import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingSelector, singleProductSelector } from './../2-bll/StoreSelector';
import {getSingleProductsThunk } from './../2-bll/StoreReducer';
import s from './Store.module.css'
import { useHistory } from 'react-router-dom';


const Product: React.FC = () => {

    const dispatch = useDispatch()
    const singleProduct = useSelector(singleProductSelector)
    const isLoading=useSelector(isLoadingSelector)

    const history = useHistory()
    let adress = history.location.pathname
    let id = Number(adress.substr(10))


    useEffect(() => {
        dispatch(getSingleProductsThunk(id))
    }, [id])

    
    if(isLoading){
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
                <button>Change info</button>
                <button>Delete product</button>
            </div>
            </div>
        </div>
    )
}

export default Product