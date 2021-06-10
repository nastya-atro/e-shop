import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import CartReducer from "../../store-2-features/ShopCart/2-bll-cart/CartReducer";
import StoreReducer from "../../store-2-features/Store/product-2-bll/StoreReducer";
import UsersReducer from "../../store-2-features/Users/2-bll-users/UsersReducer";


let rootReducer = combineReducers({
    store: StoreReducer,
    cart: CartReducer,
    users: UsersReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type CommonActionsTypes<T> = T extends {[key: string]:(...args:any[])=> infer U }?U:never

export type CommonThunkType<A extends Action>= ThunkAction<Promise<void>, AppStateType, unknown, A>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store