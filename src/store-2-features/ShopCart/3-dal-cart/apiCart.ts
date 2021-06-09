import { instanse } from "../../../store-1-main/3-dal-main/api"
import {CartType} from './../2-bll-cart/CartReducer'


export const apiCart = {
    getAllCart() {
        return instanse.get(`carts`)
            .then(res => res.data)
    },
    getSingleCart(idCart: number){
        return instanse.get(`carts/${idCart}`)
        .then(res => res.data)
    },
    getUserCart(idUser: number){
        return instanse.get(`carts/user/${idUser}`)
        .then(res => res.data)
    },
    addProductInCart(objNewProduct: CartType){
        return instanse.post(`carts`, {objNewProduct})
        .then(res => res.data)
    },
    changeProductCart(idCart: number, objNewProduct: CartType){
        return instanse.put(`carts/${idCart}`, {objNewProduct})
        .then(res => res.data)
    },
    deleteProductCart(idCart: number){
        return instanse.delete(`carts/${idCart}`)
        .then(res => res.data)
    }
}