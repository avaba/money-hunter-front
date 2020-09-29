<template>
  <div class="tracking-table__product-price">{{currentPrice===null ? '' : `${currentPrice} ₽`}}</div>
</template>

<script>
  export default {
    name: "ProductPrice",
    props: {
      price: {
        type: Number,
        default: null,
      }
    },
    data: () => ({
      currentPrice: String
    }),
    methods: {
      formattingNum() {
        if(this.price) {
          this.currentPrice = this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        } else {
          this.currentPrice = '0'
        }
      }
    },
    mounted() {
      this.formattingNum()
    }
  }
</script>

<style scoped>

</style>