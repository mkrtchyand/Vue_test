<template>
  <div class="converter-block">
    <h2 class="converter-block__title">Конвертер</h2>
    <div class="converter-block__main-block">
      <BaseInput
        placeholder="0"
        :currencyType="currencyType"
        type="number"
        v-model="inputValue"
      />
      <ExchangeIcon class="converter-block__icon" @click="exchange" />
      <ConverterItemsBlock
        @getActiveItem="getActiveItem"
        :data="props.data"
        :changedCurrency="concat(exchangeValue)"
        :changeToggle="changeToggle"
      />
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import ExchangeIcon from "@/components/iconst/ExchangeIcon.vue";
import ConverterItemsBlock from "./ConverterItemsBlock.vue";
import { useConverter } from "@/stores/converter";

import { useHelpers } from "@/stores/helpers";
const { concat } = useHelpers();

const converter = useConverter();

const { changeConverter } = converter;
const { activeItem } = converter;
const { exchangeValue } = toRefs(converter);
const { currencyType } = toRefs(converter);
const { inputValue } = toRefs(converter);
const { changeToggle } = toRefs(converter);

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

function exchange() {
  changeConverter();
}

function getActiveItem(val) {
  activeItem(val);
}
</script>

<style scoped lang="scss">
.converter-block {
  height: 100%;

  &__title {
    text-align: center;
    padding-bottom: 20px;
  }

  &__icon {
    width: 20px;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
    transform: rotate(90deg);
  }

  &__main-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
