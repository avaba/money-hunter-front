<template>
  <Fragment>
    <img src="../assets/img/ikons/star_yellow.svg" alt="" v-for="item in getStarredSequence" :key="item">
    <img src="../assets/img/ikons/star_gray.svg" alt="" v-for="item in getTailSequence" :key="item">
  </Fragment>
</template>

<script>
  import {Fragment} from 'vue-fragment';

  export default {
    name: "Rating",
    components: {Fragment},
    props: {
      totalAmount: {
        type: Number,
        default: null
      },
      amount: {
        type: Number,
        default: 0
      },
    },
    computed: {
      getStarredSequence() {
        return [...Array(this.amount)].map((e, idx) => idx);
      },
      getTailSequence() {
        return this.totalAmount === null ? [] : [...Array(this.totalAmount - this.amount)].map((e, idx) => idx);
      }
    }
  }
</script>