<template>
  <select v-model="selectValue" class="select">
    <option
      :disabled="changeToggle && activeItem.CharCode !== item.CharCode"
      v-for="item in props.data"
      :key="item.ID"
      :value="item.CharCode"
    >
      <span>{{
        changeToggle && activeItem.CharCode === item.CharCode
          ? "RUB"
          : item.CharCode
      }}</span>
      &nbsp;
      <span v-if="activeItem.CharCode === item.CharCode">{{
        changedCurrency
      }}</span>
    </option>
  </select>
</template>

<script setup>
import { ref, watch } from "vue";

const selectValue = ref("");
const activeItem = ref("");

const emit = defineEmits(["getActiveItem"]);

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  changedCurrency: {
    type: [Number, String],
    default: 0,
  },
  changeToggle: {
    type: Boolean,
    default: false,
  },
});

watch(selectValue, (val) => {
  activeItem.value = props.data.find((item) => item.CharCode === val);
  emit("getActiveItem", activeItem.value);
});
</script>

<style scoped lang="scss">
.select {
  min-width: 150px;
  padding: 8px;
  border: 2px solid #aaa;
  border-radius: 4px;
  outline: none;
}
</style>
