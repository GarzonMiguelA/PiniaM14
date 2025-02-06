<script setup>
// imports
import { ref } from "vue";
import AppCountInput from "./AppCountInput.vue";
import { useCartStore } from "@/stores/CartStore";

// props
const props = defineProps({
  product: Object,
});

// emits
const emit = defineEmits(["addToCart"]);

// data
const count = ref(0);

// store
const cartStore = useCartStore();

const updateStore = () => {
  cartStore.$patch({
    counter: cartStore.counter + 1,
    name: 'Samarreta',
  });
};

const addToCart = () => {
  emit('addToCart', count.value);
  count.value = 0;
  updateStore();
};
</script>

<template>
  <li class="card">
    <img :src="`/images/${product.image}`" class="mb-3" width="300" />
    <div>
      {{ product.name }} - <span class="text-green-500">${{product.price}}</span>
      <div class="text-center m-4">
        <AppCountInput v-model="count" />
      </div>
      <AppButton class="primary" @click="addToCart">Add to Cart</AppButton>
    </div>
  </li>
</template>