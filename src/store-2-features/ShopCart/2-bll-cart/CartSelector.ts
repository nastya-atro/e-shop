import { AppStateType } from "../../../store-1-main/2-bll-main/redux-store"


export const cartsSelector=(state: AppStateType)=>{
    return state.cart.carts
}

export const singleCartSelector=(state: AppStateType)=>{
    return state.cart.singleCart
}
