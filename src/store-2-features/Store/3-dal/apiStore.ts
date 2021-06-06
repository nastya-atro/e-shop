import { ValuesType } from '../1-ui/AddProductForm';
import { instanse } from './../../../store-1-main/3-dal-main/api';




export const apiStore = {
    getAllProducts(limitPage: number, value: string) {
        return instanse.get(`products?limit=${limitPage}&sort=${value}`)
            .then(res => res.data)
    },
    getSingleProduct(idProduct: number) {
        return instanse.get(`products/${idProduct}`)
            .then(res => res.data)
    },
    sortProducts(value: string){
        return instanse.get(`products?sort=${value}`)
    },
    getCategory(){
        return instanse.get(`products/categories`)
    },
    getCategoryProducts(limitPage: number, value: string, titleCategory: string){
        return instanse.get(`products/category/${titleCategory}?limit=${limitPage}&sort=${value}`)
    },
   addNewProduct(obj: ValuesType){
        return instanse.post(`products`, {obj})
    },


}