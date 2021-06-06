import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import StoreReducer from "../../store-2-features/Store/2-bll/StoreReducer";
import AppReducer from './AppReducer';

let rootReducer = combineReducers({
    app: AppReducer,
    store: StoreReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type CommonActionsTypes<T> = T extends {[key: string]:(...args:any[])=> infer U }?U:never

export type CommonThunkType<A extends Action>= ThunkAction<Promise<void>, AppStateType, unknown, A>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store