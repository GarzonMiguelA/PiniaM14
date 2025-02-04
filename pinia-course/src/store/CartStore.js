import { defineStore } from 'pinia';

export const useCartStore = defineStore("CartStore", {
    // state
    state: () => {
        return {
            items: []
        };
    },
  
    // actions
    actions: {
        addToCart(count, product) {
            count = parseInt(count);
            for (let i = 0; i < count; i++) {
                this.items.push(product);
            }
        }
    },
  
    // getters
});