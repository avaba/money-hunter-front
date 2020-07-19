<template>
  <Modal title="Выберите группу" closable>
    <template v-slot:logo><span/></template>
    <template v-slot:default>
      <form action="" class="modal-form">
        <ValidationProvider v-slot="{errors, valid, validate}" :rules="{required: true}">
          <SelectGroupModal v-model="selectedGroup" :error="$getValidationError(errors)"/>

          <div class="modal-form__submit-item">
            <Btn label="Добавить" type="button" @click="()=>valid ? addBtnHandler() : validate()"/>
          </div>
        </ValidationProvider>
      </form>
    </template>
  </Modal>
</template>

<script>
  import SelectGroupModal from "../../shared-components/SelectGroupModal";
  import {ValidationProvider} from 'vee-validate';
  import Btn from "../../shared-components/Btn";
  import {TrackingService} from "@/services/tracking_service";
  import {LOAD_GROUPS_ACTION} from "@/store/modules/tracking/constants";
  import {HIDE_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import Modal from "@/components/Modal";

  export default {
    name: "AddToGroup",
    components: {Modal, Btn, SelectGroupModal, ValidationProvider},
    props: {
      articul: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        selectedGroup: '',
      }
    },
    methods: {
      async addBtnHandler() {
        const service = new TrackingService();
        const result = await service.createUpdateGroup(
          this.selectedGroup,
          [this.articul],
          false
        );

        if (result) {
          await this.$store.dispatch(`tracking/${LOAD_GROUPS_ACTION}`);
          await this.$store.commit(`modal/${HIDE_MODAL_MUTATION}`);
        } else {
          alert('Достигнут максимум отслеживаемых товаров, обновите подписку');
        }
      }
    }
  }
</script>

<style scoped>

</style>