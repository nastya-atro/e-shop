import { AppStateType } from "../../../store-1-main/2-bll-main/redux-store"


export const productsSelector=(state: AppStateType)=>{
    return state.store.products
}

export const isLoadingSelector=(state: AppStateType)=>{
    return state.store.isLoading
}

export const limitPageSelector=(state: AppStateType)=>{
    return state.store.limitPage
}

export const singleProductSelector=(state: AppStateType)=>{
    return state.store.singleProduct
}

export const sortValueSelector=(state: AppStateType)=>{
    return state.store.sortValue
}

export const categoryProductsSelector=(state: AppStateType)=>{
    return state.store.category
}