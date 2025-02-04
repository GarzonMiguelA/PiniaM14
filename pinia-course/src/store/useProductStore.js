import {defineStore} from 'pinia'
import products from '@/data/products'

export const useProductStore = defineStore("ProductStore", {

    //state
    state: () => {
        return {
            products: []
        }
    },
  
    //actions
    actions: {
        fill() {
            this.products = products;
        }
    },
  
    //getters
    
})