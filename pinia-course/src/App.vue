<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./store/useProductStore";
import { storeToRefs } from "pinia";
import { useCartStore } from "./store/CartStore";
 
useProductStore();

const productStore = useProductStore();
const cartStore = useCartStore();
productStore.fill();

const addToCart = (count, product) => {
  count = parseInt(count)
  for (let i = 0; i < count; i++) {
    cartStore.items.push({ product });
  }

};

</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="adToCart($event, product)"
        />
    </ul>
  </div>
</template>
