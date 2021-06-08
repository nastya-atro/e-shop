import { instanse } from "../../../store-1-main/3-dal-main/api"


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
    }
}