<template>
  <Btn :disabled="isDisabled" clazz="button_add" label="Добавить товары" @click="addGoodsBtnHandler"/>
</template>

<script>
  import Btn from "./Btn";
  import {SHOW_MODAL_MUTATION} from "../store/modules/modal/constants";
  import AddGoodsPosition from "../components/tracking/AddGoodsPosition";
  import {mapMutations} from "vuex";

  export default {
    name: "AddGoodsBtn",
    components: {Btn},
    props: {
      group: {
        type: String,
        default: null
      }
    },
    methods: {
      addGoodsBtnHandler() {
        if(!this.isDisabled) {
          this[SHOW_MODAL_MUTATION]({component: AddGoodsPosition});
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