<template>
  <Btn clazz="tracking-table__cell-action" without-default-class/>
</template>

<script>
  import Btn from "../../shared-components/Btn";

  export default {
    name: "ProductAction",
    components: {Btn}
  }
</script>

<style scoped lang="scss">
  .tracking-table__cell-action {
    width: 3px;
    height: 12px;
    background: url("../../assets/img/ikons/navlist-action.svg") no-repeat;
    opacity: .5;
    z-index: 1;
  }
</style>