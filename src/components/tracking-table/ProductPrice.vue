<template>
  <div class="tracking-table__product-price">{{price===null ? '' : `${price} ₽`}}</div>
</template>

<script>
  export default {
    name: "ProductPrice",
    props: {
      price: {
        type: Number,
        default: null,
      }
    }
  }
</script>

<style scoped>

</style>