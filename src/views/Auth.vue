<template>
  <Fragment>
    <Modal :title="title">
      <router-view/>
    </Modal>
  </Fragment>
</template>

<script>
  import {Fragment} from 'vue-fragment';
  import Modal from "@/components/Modal";

  export default {
    name: "Auth",
    components: {Modal, Fragment},
    computed: {
      title() {
        return this.$route.meta?.title
      }
    }
  };
</script>