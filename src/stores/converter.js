import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useConverter = defineStore("converter", () => {
  const currencyType = ref("RUB");
  const inputValue = ref("");
  const exchangeValue = ref(0);
  const rate = ref(0);
  const getActiveItemCharCode = ref("");
  const changeToggle = ref(false);

  function changeConverter() {
    if (!getActiveItemCharCode.value) {
      return false;
    }
    changeToggle.value = !changeToggle.value;
    currencyType.value = changeToggle.value
      ? getActiveItemCharCode.value
      : "RUB";
    changeToggle.value
      ? (exchangeValue.value = inputValue.value / rate.value)
      : (exchangeValue.value = inputValue.value * rate.value);
  }

  function activeItem(val) {
    getActiveItemCharCode.value = val.CharCode;
    rate.value = val.Nominal / val.Value;
    changeToggle.value
      ? (exchangeValue.value = inputValue.value / rate.value)
      : (exchangeValue.value = inputValue.value * rate.value);
    changeToggle.value = false;
  }

  watch(inputValue, (val) => {
    changeToggle.value
      ? (exchangeValue.value = val / rate.value)
      : (exchangeValue.value = val * rate.value);
  });

  return {
    changeConverter,
    activeItem,
    currencyType,
    inputValue,
    exchangeValue,
    rate,
    getActiveItemCharCode,
    changeToggle,
  };
});
