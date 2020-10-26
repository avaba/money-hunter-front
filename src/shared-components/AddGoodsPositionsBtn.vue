<template>
  <Btn :disabled="isDisabled" clazz="button_add" label="Добавить товары" @click="addGoodsPositionsBtnHandler"/>
</template>

<script>
  import Btn from "./Btn";
  import {SHOW_MODAL_MUTATION} from "../store/modules/modal/constants";
  import AddPositions from "../components/trackingPositions/AddPositions";
  import {mapMutations} from "vuex";

  export default {
    name: "AddGoodsPositionsBtn",
    components: {Btn},
    props: {
      group: {
        type: String,
        default: null
      }
    },
    methods: {
      addGoodsPositionsBtnHandler() {
        if(!this.isDisabled) {
          this[SHOW_MODAL_MUTATION]({component: AddPositions});
        }
      },
      ...mapMutations('modal', [SHOW_MODAL_MUTATION]),
    },
    computed: {
      getSubscription() {
        return this.$store.getters['user/getSubscription']
      },
      isDisabled() {
        // return this.getSubscription.maxTrackingProducts <= 0
        return false
      }
    }
  }
</script>

<style scoped>

</style>