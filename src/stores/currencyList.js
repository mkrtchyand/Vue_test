import { reactive } from "vue";
import { defineStore } from "pinia";
import { useHelpers } from "@/stores/helpers";

export const useCurrencyList = defineStore("currencyList", () => {
  const { concat } = useHelpers();

  const itemsData = reactive({
    items: [],
    filtredItems: [],
  });

  async function getDataMount(data) {
    itemsData.items = data;

    itemsData.items.map((item) => {
      item["percent"] =
        item.Value - item.Previous > 0
          ? `${concat(item.Value - item.Previous)}`
          : `${concat(item.Value - item.Previous)}`;
    });
    itemsData.filtredItems = itemsData.items;
  }

  function exchange(id) {
    itemsData.filtredItems.map((item) => {
      if (item.ID === id) {
        item["changed"] = !item["changed"];
        if (item.changed) {
          item["beforChangeValue"] = item.Value;
          item.Value = item.Nominal / item.Value;
          item.Value = concat(item.Value);
        } else {
          item.Value = item.beforChangeValue;
          delete item.beforChangeValue;
        }
      }
    });
  }

  function searchFilter(val) {
    let cloneArray = [...itemsData.items];
    cloneArray = cloneArray.filter((item) => {
      return (
        item.CharCode.toLowerCase().includes(val.toLowerCase()) ||
        item.NumCode.includes(+val)
      );
    });
    itemsData.filtredItems = cloneArray;
  }

  return { exchange, getDataMount, searchFilter, itemsData };
});
