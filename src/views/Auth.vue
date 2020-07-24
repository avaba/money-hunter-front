<template>
  <Fragment>
    <Modal :title="title">
      <template v-slot:logo>
        <div class="modal-company">
          <img src="../assets/img/logo_modal.svg" alt="">
          <span>MoneyHunter</span>
        </div>
      </template>
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