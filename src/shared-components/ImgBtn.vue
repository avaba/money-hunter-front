<template>
  <Btn without-default-class v-bind="$attrs" style="background-color: transparent">
    <img :src="src"/>
  </Btn>
</template>

<script>
  import Btn from "./Btn";

  export default {
    name: "ImgBtn",
    props: {
      src: {
        type: String,
        required: true
      }
    },
    components: {Btn}
  }
</script>

<style scoped lang="scss">

</style>