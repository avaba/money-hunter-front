<template>
  <div class="tracking-table__product-price">{{price}} ₽</div>
</template>

<script>
  export default {
    name: "ProductPrice",
    props: {
      price: {
        type: Number,
        default: 100
      }
    }
  }
</script>

<style scoped>

</style>