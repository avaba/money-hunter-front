<template>
  <Fragment>
    <div class="overlay"></div>
    <div class="modal-title">Это заглушка, {{user}}</div>

  </Fragment>
</template>

<script>
  import {Fragment} from "vue-fragment";
  import {UserService} from "../../services/user_service";

  export default {
    name: "Temp",
    components: {Fragment},
    data() {
      return {
        user: null
      }
    },
    async created() {
      const userService = new UserService();
      const response = await userService.getAbout();

      this.user = response['detail'];
    }
  }
</script>

<style scoped>

</style>