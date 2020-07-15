<template>
  <Modal title="Загрузить проект">
    <template v-slot:logo><span/></template>
    <template v-slot:default>
      <form action="" class="modal-form">
        <div class="modal-form__download-project">
          <div class="modal-form__download-project-item" v-for="(item, idx) in positions" :key="idx">
            <Btn :label="item.label"
                 :clazz="{'button_align-left': true, 'button_empty':idx!==checked, 'button_check': idx===checked}"
                 @click="checked=idx"/>
          </div>
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
  import {mapMutations} from "vuex";
  import {HIDE_MODAL_MUTATION} from "../../store/modules/modal/constants";
  import Btn from "../../shared-components/Btn";


  export default {
    name: "LoadProject",
    components: {Btn, Modal},
    data() {
      return {
        checked: null,
        positions: [
          {label: 'Красота'},
          {label: 'Костюмы'},
          {label: 'Компьютеры'},
          {label: 'Первый поиск'},
        ]
      }
    },
    methods: {
      ...mapMutations('modal', [HIDE_MODAL_MUTATION])
    }
  }
</script>

<style scoped>

</style>