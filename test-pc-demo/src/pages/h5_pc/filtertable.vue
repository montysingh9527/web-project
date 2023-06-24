<template>
  <div class="filtertable">
    <tables :tabledata="table"></tables>
  </div>
</template>

<script setup>
import tables from "./components/tables.vue";
import { ref } from "vue";

const table = ref([
  {
    id: 0,
    name: 'wesd0',
    time: 1680266770859,
    tbs: 1,
    domain: 'https://obgm0.com/'
  },
  {
    id: 1,
    name: 'wesd1',
    time: 1680266771859,
    tbs: 2,
    domain: 'https://obgm1.com/'
  },
  {
    id: 2,
    name: 'wesd2',
    time: 1680266770829,
    tbs: 2,
    domain: 'https://obgm2.com/'
  },
  {
    id: 3,
    name: 'wesd3',
    time: 1680266270859,
    tbs: 2,
    domain: 'https://obgm3.com/'
  },
  {
    id: 4,
    name: 'wesd4',
    time: 1680266710859,
    tbs: 2,
    domain: 'https://obgm4.com/'
  },
  {
    id: 5,
    name: 'wesd5',
    time: 1680266750859,
    tbs: 2,
    domain: 'https://obgm5.com/'
  },
  {
    id: 6,
    name: 'wesd6',
    time: 1680266779859,
    tbs: 2,
    domain: 'https://obgm6.com/'
  },
  {
    id: 7,
    name: 'wesd7',
    time: 1680266777459,
    tbs: 2,
    domain: 'https://obgm7.com/'
  },
  {
    id: 8,
    name: 'wesd8',
    time: 1680266725859,
    tbs: 2,
    domain: 'https://obgm8.com/'
  },
  {
    id: 9,
    name: 'wesd9',
    time: 1680261570859,
    tbs: 2,
    domain: 'https://obgm9.com/'
  },
  {
    id: 10,
    name: 'wesd10',
    time: 1680262770859,
    tbs: 2,
    domain: 'https://obgm10.com/'
  },
  {
    id: 11,
    name: 'wesd11',
    time: 1680261770859,
    tbs: 2,
    domain: 'https://obgm11.com/'
  },
  {
    id: 12,
    name: 'wesd12',
    time: 1680266070859,
    tbs: 2,
    domain: 'https://obgm12.com/'
  },
  {
    id: 13,
    name: 'wesd13',
    time: 168023770859,
    tbs: 2,
    domain: 'https://obgm13.com/'
  },
  {
    id: 14,
    name: 'wesd14',
    time: 1680261270859,
    tbs: 2,
    domain: 'https://obgm14.com/'
  },
  {
    id: 15,
    name: 'wesd15',
    time: 1680264270859,
    tbs: 2,
    domain: 'https://obgm15.com/'
  },
  {
    id: 16,
    name: 'wesd16',
    time: 1680123210859,
    tbs: 1,
    domain: 'https://po9.obgm16.com/'
  },
  {
    id: 17,
    name: 'wesd17',
    time: 1680265640859,
    tbs: 2,
    domain: 'https://obgm17.com/'
  },
  {
    id: 18,
    name: '没有的是',
    time: 1680261230859,
    tbs: 2,
    domain: 'https://po7.obgm18.com/'
  },
  {
    id: 19,
    name: 'wesd19',
    time: 1680266370859,
    tbs: 2,
    domain: 'https://obgm19.com/'
  },
  {
    id: 20,
    name: 'wesd20',
    time: 1680268570859,
    tbs: 2,
    domain: 'https://obgm20.com/'
  },
  {
    id: 21,
    name: 'wesd21',
    time: 1680299230859,
    tbs: 2,
    domain: 'https://po1.obgm21.com/'
  },
  {
    id: 22,
    name: 'wesd22',
    time: 1680266770859,
    tbs: 2,
    domain: 'https://obgm22.com/'
  },
  {
    id: 23,
    name: 'wesd23',
    time: 1680266770859,
    tbs: 2,
    domain: 'https://obgm23.com/'
  },
  {
    id: 24,
    name: 'wesd24',
    time: 1680266248459,
    tbs: 1,
    domain: 'https://po.obgm24.com/'
  },
  {
    id: 25,
    name: 'wesd25',
    time: 1680266770859,
    tbs: 2,
    domain: 'https://obgm25.com/'
  },
  {
    id: 26,
    name: 'wesd26',
    time: 1680266770859,
    tbs: 1,
    domain: 'https://po.obgm26.com/'
  },
  {
    id: 27,
    name: 'wesd27',
    time: 1680266770859,
    tbs: 2,
    domain: 'https://obgm27.com/'
  },
  {
    id: 28,
    name: 'wesd28',
    time: 168026340859,
    tbs: 1,
    domain: 'https://api.obgm28.com/'
  },
  {
    id: 29,
    name: 'wesd29',
    time: 1680267370859,
    tbs: 2,
    domain: 'https://obgm29.com/'
  },
  {
    id: 30,
    name: '0外部命令0',
    time: 1680266054676,
    tbs: 1,
    domain: 'https://api0.github0.com/'
  },
  {
    id: 31,
    name: '3外部命令1',
    time: 1680266074676,
    tbs: 1,
    domain: 'https://api2.github1.com/'
  },
  {
    id: 32,
    name: '6外部命令2',
    time: 1680266997676,
    tbs: 2,
    domain: 'https://api4.github2.com/'
  },
  {
    id: 33,
    name: '9外部命令3',
    time: 1680289904676,
    tbs: 2,
    domain: 'https://api6.github3.com/'
  }
])


// console.log("===========",table)
</script>

<style scoped lang="scss">
</style>
