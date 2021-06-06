import { CommonActionsTypes, CommonThunkType } from "../../../store-1-main/2-bll-main/redux-store"
import { ValuesType } from "../1-ui/AddProductForm"
import { apiStore } from "../3-dal/apiStore"


type ProductsType = {
    id?: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}

let initialState = {
    products: [] as Array<ProductsType>,
    isLoading: true,
    limitPage: 5,
    singleProduct: null as null|ProductsType,
    sortValue: 'desc',
    category:[] as null | Array<String>
}

export type InitialStateType = typeof initialState

const StoreReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'products/SET_ALL_PRODUCTS':
            return {
                ...state,
                products: action.products
            }
        
        case 'products/TOOGLE_IS_LOAGING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        case 'products/SET_LIMIT_PAGE':
            return {
                ...state,
                limitPage: action.limitPage
            }
        case 'products/SET_SINGLE_PRODUCT':
            return {
                ...state,
                singleProduct: action.singleProduct
            }
        case 'products/SORT_PRODUCTS':
            return {
                ...state,
                sortValue: action.sortValue
            }
        case 'products/GET_CATEGORY_PRODUCTS':
                return {
                    ...state,
                    category:['Все товары',...action.category] 
                }
        case 'products/ADD_NEW_PRODUCT':
            return {
                ...state,
                products: [action.obj, ...state.products]
            }
        

        default: return state
    }

}

export const actionsStore = {
    allProductsRecived: (products: Array<ProductsType>) => ({
        type: 'products/SET_ALL_PRODUCTS', products
    } as const),
    isLoadingChanged: (isLoading: boolean) => ({
        type: 'products/TOOGLE_IS_LOAGING', isLoading
    } as const),
    limitPageChanged: (limitPage:number) => ({
        type: 'products/SET_LIMIT_PAGE', limitPage
    } as const),
    productSelected: (singleProduct: null|ProductsType) => ({
        type: 'products/SET_SINGLE_PRODUCT', singleProduct
    } as const),
    sortedProducts: (sortValue: string) => ({
        type: 'products/SORT_PRODUCTS', sortValue
    } as const),
    categoryProductsRecived: (category: Array<string>) => ({
        type: 'products/GET_CATEGORY_PRODUCTS', category
    } as const),
    newProductAdded: (obj:ValuesType) => ({
        type: 'products/ADD_NEW_PRODUCT', obj
    } as const),
    
}

type ActionsTypes = CommonActionsTypes<typeof actionsStore>
type ThunkType = CommonThunkType<ActionsTypes>

export const getProductsThunk = (limitPage:number, sortValue: string): ThunkType => {
    return async (dispatch) => {


        dispatch(actionsStore.isLoadingChanged(true))
        dispatch(actionsStore.limitPageChanged(limitPage))
        dispatch(actionsStore.sortedProducts(sortValue))
        let data = await apiStore.getAllProducts(limitPage, sortValue)
 
        dispatch(actionsStore.allProductsRecived(data))
        dispatch(actionsStore.isLoadingChanged(false))
    }
}

export const getCategoryProductsThunk = (limitPage:number, sortValue: string, category: string): ThunkType => {
    return async (dispatch) => {


        dispatch(actionsStore.isLoadingChanged(true))
        dispatch(actionsStore.limitPageChanged(limitPage))
        dispatch(actionsStore.sortedProducts(sortValue))
        let data = await apiStore.getCategoryProducts(limitPage, sortValue, category)
        dispatch(actionsStore.allProductsRecived(data.data))
        dispatch(actionsStore.isLoadingChanged(false))
    }
}

export const getSingleProductsThunk = (idProduct:number): ThunkType => {
    return async (dispatch) => {

        dispatch(actionsStore.isLoadingChanged(true))
        let data = await apiStore.getSingleProduct(idProduct)
        dispatch(actionsStore.productSelected(data))
        dispatch(actionsStore.isLoadingChanged(false))
    }
}

export const getCategoryThunk = (): ThunkType => {
    return async (dispatch) => {

        dispatch(actionsStore.isLoadingChanged(true))
        let data = await apiStore.getCategory()
        dispatch(actionsStore.categoryProductsRecived(data.data))
        dispatch(actionsStore.isLoadingChanged(false))
    }
}


export const addNewProductThunk = (obj:ValuesType): ThunkType => {
    return async (dispatch) => {
        dispatch(actionsStore.isLoadingChanged(true))
        let data = await apiStore.addNewProduct(obj)
        let x = JSON.parse(data.config.data)
        dispatch(actionsStore.newProductAdded(x.obj))
        dispatch(actionsStore.isLoadingChanged(false))
    }
}

export default StoreReducer