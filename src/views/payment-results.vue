<template>
  <div>
    <component :is="`results_${result}`"></component>
  </div>
</template>

<script>
import results_success from "../components/payment/success"
import results_fail from "../components/payment/fail"
export default {
  name: 'payment-results',
  components: {
    results_success, results_fail
  },
  data: () => ({
    result: null
  }),
  created() {
    this.result = this.$route.params.results
    if(!this.result || this.result !== 'success' && this.result !== 'fail') {
      this.$router.push('/')
    }
  }
}
</script>

 