import { groupBy } from "lodash";
import { defineStore, acceptHMRUpdate } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {

    clearItem(name) {
      this.items = this.items.filter(item => item.name !== name);
    },

    setItemCount(item, count) {
      this.items = this.items.filter(i => i.name !== item.name);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },

    checkout() {
      const authUserStore = useAuthUserStore();
      alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`);
    },

    
  },

  getters: {
    count() {
      return this.items.length;
    },

    isEmpty() {
      return this.count === 0;
    },

    grouped: state => groupBy(state.items, item => item.name),

    groupCount: state => name => state.grouped[name].length,

    total(state) {
      return state.items.reduce((total, item) => total + item.price, 0);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}