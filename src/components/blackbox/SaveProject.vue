<template>
  <Modal title="Сохранить проект">
    <template v-slot:default>
      <ValidationProvider v-slot="{errors, valid, validate}" :rules="{required: true}">
        <form action="" class="modal-form">
          <div class="modal-form__save-project">
            <InputField
              label="Используйте ясное и уникальное имя, чтобы вы могли легко идентифицировать проект."
              placeholder="Название проекта"
              v-model="name"
              :error="nameError"
            />
          </div>
          <div class="modal-form__double-submit modal-form__double-submit_save-project">
            <div class="modal-form__double-submit-item">
              <Btn label="Отмена" clazz="button_gray" @click="hideModal"/>
            </div>
            <div class="modal-form__double-submit-item">
              <Btn label="Сохранить" @click="saveHandler(valid, validate)"/>
            </div>
          </div>
        </form>
      </ValidationProvider>
    </template>
  </Modal>
</template>

<script>
  import Modal from "../Modal";
  import InputField from "../../shared-components/InputField";
  import Btn from "../../shared-components/Btn";
  import {HIDE_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import {mapMutations, mapState} from "vuex";
  import {BlackboxService} from "@/services/blackbox_service";
  import {ValidationProvider} from 'vee-validate';

  export default {
    name: "SaveProject",
    components: {Btn, Modal, InputField, ValidationProvider},
    data() {
      return {
        name: '',
        nameError: null,
      }
    },
    computed: {
      ...mapState('modal', ['nested'])
    },
    methods: {
      async saveHandler(valid, validateCb) {
        if (valid) {
          const blackboxService = new BlackboxService();
          const _nested = {...this.nested};

          const result = await blackboxService.saveSearch(this.name, _nested);

          if (typeof result === 'boolean' && result) {
            this[HIDE_MODAL_MUTATION]();
          } else {
            this.nameError = result;
          }
        } else {
          validateCb().then(({valid, failedRules}) => {
            if (!valid) {
              this.nameError = this.$getValidationError(Object.values(failedRules));
            }
          });
        }
      },
      ...mapMutations('modal', [HIDE_MODAL_MUTATION]),
    }
  }
</script>

<style scoped>

</style>