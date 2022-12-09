<template>
  <div class="base-input">
    <input
      class="base-input__input"
      :class="{ 'add-currency': currencyType }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
    <span class="base-input__currency-type" v-if="currencyType">{{
      currencyType
    }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  currencyType: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
.base-input {
  position: relative;
  &__input {
    width: 100%;
    border: 2px solid #aaa;
    border-radius: 4px;
    outline: none;
    padding: 8px;
    &:focus {
      border-color: dodgerBlue;
    }
  }
  &__currency-type {
    position: absolute;
    top: 8px;
    left: 10px;
    z-index: 1;
  }
}
.add-currency {
  padding-left: 48px;
}
</style>
