<template>
  <Fragment>
    <div class="item-row" v-for="(item, idx) in list" :key="idx">
      <img :src="item.img" alt="">
      <span class="item-row__text">{{item.label}}</span>
    </div>
  </Fragment>
</template>

<script>
  import {Fragment} from 'vue-fragment';

  export default {
    name: "RowWithIcon",
    components: {Fragment},
    props: {
      list: {
        type: Array,
        required: true,
      }
    },
  }
</script>

<style scoped lang="scss">
  .item-row {
    margin-right: 2.14rem;
    display: flex;
    align-items: center;

    &:last-child {
      margin-right: 0;
    }
  }

  .item-row__text {
    color: black;
    margin-left: .64rem;
  }
</style>