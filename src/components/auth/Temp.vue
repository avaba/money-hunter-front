<template>
  <Fragment>
    <div class="modal-title">Это заглушка, {{user.detail}}</div>
  </Fragment>
</template>

<script>
  import {Fragment} from "vue-fragment";
  import {mapActions, mapState} from "vuex";
  import {GET_ABOUT_ACTION} from "@/store/modules/user/constants";

  export default {
    name: "Temp",
    components: {Fragment},
    data() {
      return {
        email: null
      }
    },
    computed: {
      ...mapState({
        user: state => state.user,
      })
    },
    methods: {
      ...mapActions('user', [GET_ABOUT_ACTION])
    },
    created() {
      this[GET_ABOUT_ACTION]();
    }
  }
</script>

<style scoped>

</style>