import { isEmpty } from "lodash";
import { defineStore } from "pinia";
import {groupBy} from "lodash";


export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);
      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },

    /* Creamos la accion para poder, clicando en la papelera, eliminar */
    clearItem(name) {
      // Filtramos los items para eliminar aquellos que coincidan con el nombre
      this.items = this.items.filter(item => item.name !== name);
    },

  },

  //getters:
  getters: {
    count(){
      return this.items.length;
    },

    isEmpty(){
      return this.count === 0;
    },

    grouped:state => groupBy(state.items, item=>item.name),

    groupCount: (state)=>(name)=>state.grouped[name].length,

    /* Programamos getter para la suma de productos del carro: */
    total(state){
      return state.items.reduce((total, item) => total + item.price, 0);
      /*EXPLICACION:
        Usamos reduce para reducir el array a un valor unico
        En nuestro caso recorremos state.items acumulando todos los 
        precios, y por cada iteracion añade item.price al total 
        (empezando en 0 claro: total + item.price, 0) */
    },
  },
});
