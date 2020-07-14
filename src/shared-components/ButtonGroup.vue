<template>
  <Fragment>
    <Btn without-default-class :label="item.label" :clazz="item.clazz" v-for="(item, idx) in items" :key="idx"/>
  </Fragment>
</template>

<script>
  import Btn from "./Btn";
  import {Fragment} from 'vue-fragment';

  export default {
    name: "ButtonGroup",
    components: {Btn, Fragment},
    props: {
      items: {
        type: Array,
        required: true,
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .filter-form__action-button {
    border: 1px solid $drayDevider;
    border-radius: 4px;
    color: $titleColor;
    padding-left: 2.28rem;
    padding-right: 1rem;
    height: 2.57rem;
    background: white;

    &:not(:last-child) {
      margin-right: 1.07rem;
    }

    &.filter-form__action-button_download {
      background: url("../assets/img/ikons/download2.svg") no-repeat .92rem center, white;
    }

    &.filter-form__action-button_save {
      background: url("../assets/img/ikons/save.svg") no-repeat .85rem center, white;
    }

    &.filter-form__action-button_clear {
      background: url("../assets/img/ikons/clear.svg") no-repeat .78rem center, white;
    }
  }
</style>