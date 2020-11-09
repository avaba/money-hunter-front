<template>
  <Modal :title="title">
    <form action="" class="modal-form">
      <Btn label="Закрыть" clazz="button_gray" @click="hideModal"/>
    </form>
  </Modal>
</template>

<script>
  import Modal from "../Modal";
  import Btn from "../../shared-components/Btn";
  import {HIDE_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import {mapMutations} from "vuex";

  export default {
    name: 'Warning',
    components: {Modal, Btn},
    props: {
      title: {
        type: String,
        required: true,
      }
    },
    methods: {
      hideModal() {
        this[HIDE_MODAL_MUTATION]()
      },
      ...mapMutations('modal', [HIDE_MODAL_MUTATION]),
    },
  }
</script>