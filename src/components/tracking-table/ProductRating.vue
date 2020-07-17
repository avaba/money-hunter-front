<template>
  <div class="tracking-table__product-rating">
    <Rating :amount="rating" :total-amount="totalAmount"/>
  </div>
</template>

<script>
  import Rating from "@/shared-components/Rating";

  export default {
    components: {Rating},
    props: {
      rating: {
        type: Number,
        default: 5
      },
      totalAmount: {
        type: Number,
        default: null
      },
    },
    name: "ProductRating"
  }
</script>

<style scoped lang="scss">
  .tracking-table__product-rating {
    display: flex;
    justify-content: center;

    /deep/ img {
      margin: 0 2.5px;
    }
  }
</style>