<template>
  <Modal :title='`Группа "${groupName}"`' closable @next="send">
    <template v-slot:default>

      <form action="" class="modal-form" @submit.prevent>

        <ValidationProvider :rules="{required: true}" v-slot="{errors}" ref="validation">
          <div class="modal-form__save-project">
            <InputField label="Введите количество дней"
                        v-model.number="daysCount"
                        :error="$getValidationError(errors)"/>
          </div>


          <div class="modal-form__double-submit modal-form__double-submit_save-project">
            <div class="modal-form__double-submit-item">
              <Btn label="Отмена" clazz="button_gray" @click="cancelHandler"/>
            </div>
            <div class="modal-form__double-submit-item">
              <Btn label="Отправить" @click="send"/>
            </div>
          </div>
        </ValidationProvider>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Modal from "../Modal";
  import InputField from "../../shared-components/InputField";
  import {ValidationProvider} from 'vee-validate';
  import {TrackingService} from "../../services/tracking_service";
  import Btn from "../../shared-components/Btn";
  import {HIDE_MODAL_MUTATION} from "../../store/modules/modal/constants";

  export default {
    name: "AutoSort",
    components: {Btn, InputField, Modal, ValidationProvider},
    props: {
      groupName: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        daysCount: null,
      }
    },
    methods: {
      cancelHandler() {
        this.closeModal();
      },
      async send() {
        if (!this.$validationProviderIsValid(this.$refs.validation)) {
          return;
        }

        const service = new TrackingService();
        await service.getGroupSortFile(this.$route.params.name, this.daysCount);
        this.closeModal();
      },
      closeModal() {
        this.$store.commit(`modal/${HIDE_MODAL_MUTATION}`);
      }
    }
  }
</script>

<style scoped>

</style>