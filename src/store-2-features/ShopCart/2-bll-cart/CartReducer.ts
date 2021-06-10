import { CommonActionsTypes, CommonThunkType } from "../../../store-1-main/2-bll-main/redux-store"
import { apiCart } from './../3-dal-cart/apiCart';

type ProductsType = {
    productId: number
    quantity: number
}

export type CartType = {
    id?: number
    userId: number
    date: Date
    products: Array<ProductsType>
}


let initialState = {
    carts: [] as Array<CartType>,
    singleCart: null as null | CartType,
    isLoading: true
}

export type InitialStateType = typeof initialState

const CartReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'cart/SET_ALL_CARTS':
            return {
                ...state,
                carts: action.carts
            }

        case 'cart/SET_SINGLE_CART':
            return {
                ...state,
                singleCart: action.cart
            }

        case 'cart/SET_USER_CARTS':
            return {
                ...state,
                carts: state.carts.filter((c) => c.userId === action.idUser)
            }

        case 'cart/ADD_PRODUCT_IN_CART':
            return {
                ...state,
                carts: [...state.carts, action.cart]
            }
        case 'cart/CHANGE_CART':
            return {
                ...state,
                singleCart: action.cart
            }
        case 'cart/DELETE_CART':
            return {
                ...state,
                carts: state.carts.filter(c => c.id !== action.idCart)
            }
        case 'cart/TOOGLE_IS_LOAGING':
            return {
                ...state,
                isLoading: action.isLoading
            }

        default: return state
    }

}

export const actionsCart = {
    cartsRecived: (carts: Array<CartType>) => ({
        type: 'cart/SET_ALL_CARTS', carts
    } as const),
    singleCartRecived: (cart: CartType) => ({
        type: 'cart/SET_SINGLE_CART', cart
    } as const),
    userCartsRecived: (idUser: number) => ({
        type: 'cart/SET_USER_CARTS', idUser
    } as const),
    productAddedInCart: (cart: CartType) => ({
        type: 'cart/ADD_PRODUCT_IN_CART', cart
    } as const),
    cartChanged: (cart: CartType) => ({
        type: 'cart/CHANGE_CART', cart
    } as const),
    cartDeleted: (idCart: number) => ({
        type: 'cart/DELETE_CART', idCart
    } as const),
    isLoadingChanged: (isLoading: boolean) => ({
        type: 'cart/TOOGLE_IS_LOAGING', isLoading
    } as const),

}

type ActionsTypes = CommonActionsTypes<typeof actionsCart>
type ThunkType = CommonThunkType<ActionsTypes>

export const getAllCartsThunk = (): ThunkType => {
    return async (dispatch) => {
        let data = await apiCart.getAllCart()
        dispatch(actionsCart.cartsRecived(data))
    }
}

export const getSingleCartThunk = (idCart: number): ThunkType => {
    return async (dispatch) => {
        let data = await apiCart.getSingleCart(idCart)
        dispatch(actionsCart.singleCartRecived(data))
    }
}

export const getUserCartsThunk = (idUser: number): ThunkType => {
    return async (dispatch) => {
        let data = await apiCart.getUserCart(idUser)
        dispatch(actionsCart.userCartsRecived(idUser))
        dispatch(actionsCart.cartsRecived(data))
    }
}

export const addNewProductInCartThunk = (obj: CartType): ThunkType => {
    return async (dispatch) => {
        let data = await apiCart.addProductInCart(obj)
        dispatch(actionsCart.productAddedInCart(data))
    }
}

export const changeProductInCartThunk = (idCart: number, obj: CartType): ThunkType => {
    return async (dispatch) => {
        let data = await apiCart.changeProductCart(idCart, obj)
        dispatch(actionsCart.cartChanged(data))
    }
}

export const deleteProductCartThunk = (id: number): ThunkType => {

    return async (dispatch) => {
        dispatch(actionsCart.isLoadingChanged(true))
        await apiCart.deleteProductCart(id)
        dispatch(actionsCart.cartDeleted(id))
        dispatch(actionsCart.isLoadingChanged(false))
    }
}

export default CartReducer