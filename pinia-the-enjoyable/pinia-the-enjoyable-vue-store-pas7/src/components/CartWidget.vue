<script setup>
// imports
import { ref } from "vue";
import CartItem from "./CartItem.vue";
import { useCartStore } from "@/stores/CartStore";

// data
const active = ref(false);
const cartStore = useCartStore(); //Usamos useCartStore para acceder a la store
</script>





<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />

      <!-- <div class="cart-count absolute">10</div> -->
      <div class="cart-count absolute">{{ cartStore.items.length }}</div>
    </span>

    <AppModalOverlay :active="active" @close="active = false">


      <div v-if="!cartStore.isEmpty"><!-- SI tiene productos los muestra -->
        <ul class="items-in-cart">
          <!--
          Ignoramos los productos hardcodeados
          <CartItem
            :product="{ name: 'Dried Pineapple', price: 5 }"
            :count="5"
            @updateCount=""
            @clear=""
          />
          <CartItem
            :product="{ name: 'Pineapple Gum', price: 3 }"
            :count="5"
            @updateCount=""
            @clear=""
          /> -->
          <!-- Y los mostramos con for dentro del carro: -->
          <CartItem
            v-for="(items, name) in cartStore.grouped"
            :key="name"
            :product="items[0]"
            :count="items.length"
            @updateCount=""
            @clear="" 
          />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>$40</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2">Clear Cart</AppButton>
          <AppButton class="primary">Checkout</AppButton>
        </div>
      </div>
      <!-- SI NO tiene productos muestra: -->
      <div v-else><em>Cart is Empty</em></div> 
    </AppModalOverlay>

  </div>
</template>
<style lang="pcss" scoped>
.items-in-cart{
  @apply mb-5;
}
.items-in-cart li{
  @apply flex justify-between p-2;
}
.items-in-cart li:nth-of-type(even){
  @apply bg-gray-300;
}
</style>
