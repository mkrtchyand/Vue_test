import { defineStore } from "pinia";

export const useHelpers = defineStore("helpers", () => {
  function concat(val) {
    const arrayValue = val.toString().split(".");

    let first;
    let last;
    let compleateValue;

    if (arrayValue.length === 2) {
      first = arrayValue[0];
      last =
        arrayValue[1].length > 4 ? arrayValue[1].slice(0, 4) : arrayValue[1];
      compleateValue = `${first}.${last}`;
    } else {
      compleateValue = val;
    }

    return compleateValue;
  }

  return { concat };
});
