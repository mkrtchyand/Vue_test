import { defineStore } from "pinia";
import axios from "axios";

export const useGetData = defineStore("data", () => {
  async function data() {
    const res = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js");
    const validData = res.data.Valute ? res.data.Valute : {};

    return Object.values(validData);
  }

  return { data };
});
