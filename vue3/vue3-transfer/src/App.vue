<template>
  <div>
    <Transfer :data="data" right-title="已选择机型" />
  </div>
</template>
  
<script setup>
import { Transfer } from "../modules/index";

const data = [
  {
    title: "华为",
    data: [
      {
        id: 1,
        phone_name: "Mate 40 Pro",
        disabled: false,
      },
      {
        id: 2,
        phone_name: "P40 Pro",
        disabled: true,
      },
      {
        id: 3,
        phone_name: "P50 Pro",
        disabled: false,
      },
      {
        id: 4,
        phone_name: "Mate Xs 2",
        disabled: false,
      },
    ],
  },
  {
    title: "小米",
    data: [
      {
        id: 5,
        phone_name: "XiaoMi 11",
        disabled: true,
      },
      {
        id: 6,
        phone_name: "XiaoMi P1 Pro",
        disabled: true,
      },
      {
        id: 7,
        phone_name: "HonMi P50",
        disabled: false,
      },
    ],
  },
  {
    title: "IPhone",
    data: [
      {
        id: 8,
        phone_name: "IPhone 11",
        disabled: true,
      },
      {
        id: 9,
        phone_name: "IPhone11 Pro",
        disabled: true,
      },
      {
        id: 10,
        phone_name: "IPhone14",
        disabled: false,
      },
      {
        id: 11,
        phone_name: "IPhoneX",
        disabled: true,
      },
      {
        id: 12,
        phone_name: "IPhone10",
        disabled: false,
      },
    ],
  },
];
</script>
  
  <style scoped lang="scss">
</style>