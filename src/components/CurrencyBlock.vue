<template>
  <div>
    <table class="table">
      <tr>
        <th class="table__th-code">Цифр. код</th>
        <th class="table__th-currency">Валюта</th>
        <th>Выросла/упала</th>
        <th class="table__th-change">Обмен</th>
      </tr>
      <tr v-for="item in itemsData.filtredItems" :key="item.ID">
        <td>{{ item.NumCode }}</td>
        <td>
          <span>
            {{ !item.changed ? `${item.Nominal} ${item.CharCode}` : "1 RUB" }}
          </span>
          <span> - </span>
          <span>
            {{
              item.changed
                ? `${item.Value} ${item.CharCode}`
                : `${item.Value} RUB`
            }}
          </span>
        </td>
        <td :class="[+item.percent > 0 ? 'table__up' : 'table__down']">
          <span>
            {{ +item.percent > 0 ? `+${item.percent}` : item.percent }} %
          </span>
        </td>
        <td class="table__icon-block">
          <ExchangeIcon class="icon" @click="convert(item.ID)" />
        </td>
      </tr>
    </table>
    <h2 class="info-empty" v-if="!itemsData.filtredItems.length">
      Нет информации
    </h2>
  </div>
</template>

<script setup>
import { toRefs, onMounted, watch } from "vue";
import ExchangeIcon from "@/components/iconst/ExchangeIcon.vue";

import { useCurrencyList } from "@/stores/currencyList";

const currencyList = useCurrencyList();

const { exchange } = currencyList;
const { getDataMount } = currencyList;
const { searchFilter } = currencyList;
const { itemsData } = toRefs(currencyList);

const props = defineProps({
  search: {
    type: [String, Number],
    default: "",
  },
  data: {
    type: Array,
    default: () => [],
  },
});

watch(
  () => props.search,
  (val) => {
    searchFilter(val);
  }
);

onMounted(async () => {
  await getDataMount(props.data);
});

function convert(id) {
  exchange(id);
}
</script>

<style scoped lang="scss">
.icon {
  width: 20px;
  cursor: pointer;
}

.table {
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    position: relative;
  }

  &__th-code {
    width: 100px;
  }

  &__th-currency {
    width: 250px;
  }

  &__th-change {
    width: 30px;
  }

  &__icon-block {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__up {
    &::after {
      content: "";
      position: absolute;
      left: calc(100% - 30px);
      border: 10px solid transparent;
      border-top: 10px solid green;
      transform: rotate(180deg);
    }
  }
  &__down {
    &::after {
      content: "";
      position: absolute;
      left: calc(100% - 30px);
      border: 10px solid transparent;
      border-top: 10px solid red;
    }
  }
}

.info-empty {
  text-align: center;
  margin-top: 20px;
}
</style>
