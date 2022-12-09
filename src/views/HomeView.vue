<template>
  <div class="home-view">
    <div class="home-view__list-currency">
      <BaseInputVue
        class="home-view__input"
        type="text"
        placeholder="Валюта или цифровой код"
        v-model="val"
      />
      <CurrencyBlock v-if="itemsData.length" :search="val" :data="itemsData" />
    </div>
    <div class="home-view__converter">
      <ConverterBlock v-if="itemsData.length" :data="itemsData" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BaseInputVue from "@/components/BaseInput.vue";
import CurrencyBlock from "@/components/CurrencyBlock.vue";
import ConverterBlock from "@/components/ConverterBlock.vue";

import { useGetData } from "@/stores/data";

const getData = useGetData();
const { data } = getData;

const val = ref("");
const itemsData = ref([]);

onMounted(async () => {
  itemsData.value = await data();
});
</script>

<style scoped lang="scss">
.home-view {
  max-width: 1440px;
  display: flex;
  margin: 0 auto;
  padding: 20px;
  &__list-currency {
    width: 600px;
  }
  &__input {
    padding-bottom: 10px;
  }
  &__converter {
    width: 530px;
    height: 150px;
    padding: 20px;
    margin-left: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
}
</style>
