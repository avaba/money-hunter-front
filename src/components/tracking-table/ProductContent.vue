<template>
  <div class="tracking-table__product">
    <div class="tracking-table__product-photo">
      <img src="../../assets/img/product-photo.jpg" alt="">
    </div>
    <div class="tracking-table__product-info">
      <div class="tracking-table__product-name">Футболка "Джевел" - Натали</div>
      <div class="tracking-table__product-see">Посмотреть на Wildberries</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProductContent"
  }
</script>

<style scoped lang="scss">
  @import "../../assets/scss/variables";

  .tracking-table__product {
    display: flex;
    align-items: center;
  }

  .tracking-table__product-info {
    margin-left: 1.42rem;
    text-align-last: left;
  }

  .tracking-table__product-name {
    letter-spacing: .2px;
  }

  .tracking-table__product-see {
    font-size: .85rem;
    color: $titleColor;
    letter-spacing: .2px;
    margin-top: 3px;
  }
</style>