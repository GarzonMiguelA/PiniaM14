<script setup>
import { ref, reactive } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import AppButton from "@/components/AppButton.vue";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";

const productStore = useProductStore();
const cartStore = useCartStore();

const history = reactive([]);
const future = reactive([]);
const doingHistory = ref(false);
history.push(JSON.stringify(cartStore.$state));

const undo = () => {
  if (history.length === 1) return;
  doingHistory.value = true;
  const currentState = history.pop();
  future.push(currentState);
  cartStore.$state = JSON.parse(history.at(-1));
  doingHistory.value = false;
};

const redo = () => {
  const latestState = future.pop();
  if (!latestState) return;
  doingHistory.value = true;
  history.push(latestState);
  cartStore.$state = JSON.parse(latestState);
  doingHistory.value = false;
};

cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
    future.splice(0, future.length); // Clear future history on new action
  }
  console.log({ mutation });
  console.log({ state });
});

productStore.fill();

cartStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === 'addItems') {
    after(() => {
      console.log(args[0]);
    });
    onError((error) => {
      console.log("Hello error:", error.message);
    });
  }
});
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItems($event, product)" />
    </ul>
  </div>
</template>