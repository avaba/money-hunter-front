<template>
  <Fragment>
    <UserData/>
    <TariffList/>
  </Fragment>
</template>

<script>
  import TariffList from "@/components/TariffList";
  import UserData from "@/components/UserData";
  import {Fragment} from 'vue-fragment';

  export default {
    name: "Profile",
    components: {TariffList, UserData, Fragment}
  }
</script>

<style scoped lang="scss">

</style>