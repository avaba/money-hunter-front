<template>
  <Modal title="Сохранить проект">
    <template v-slot:logo><span/></template>
    <template v-slot:default>
      <form action="" class="modal-form">
        <div class="modal-form__save-project">
          <InputField
            label="Используйте ясное и уникальное имя, чтобы вы могли легко идентифицировать проект."
            placeholder="Название проекта"
          />
        </div>
        <div class="modal-form__double-submit modal-form__double-submit_save-project">
          <div class="modal-form__double-submit-item">
            <Btn label="Отмена" clazz="button_gray" @click="hideModal"/>
          </div>
          <div class="modal-form__double-submit-item">
            <Btn label="Сохранить"/>
          </div>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
  import Modal from "../Modal";
  import InputField from "../../shared-components/InputField";
  import Btn from "../../shared-components/Btn";
  import {HIDE_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import {mapMutations} from "vuex";

  export default {
    name: "SaveProject",
    components: {Btn, Modal, InputField},
    methods: {
      ...mapMutations('modal', [HIDE_MODAL_MUTATION]),
    }
  }
</script>

<style scoped>

</style>