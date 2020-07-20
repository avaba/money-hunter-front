<template>
  <Modal :title='`Группа "${title}"`' closable>
    <template v-slot:logo><span/></template>
    <template v-slot:default>

      <form action="" class="modal-form">
        <ValidationProvider v-slot="{errors, valid, validate}" :rules="{required: true}">
          <div class="modal-form__save-project">
            <InputField label="Введите новое имя группы" v-model="newName" :error="$getValidationError(errors)"/>
          </div>


          <div class="modal-form__submit-item">
            <Btn label="Далее" type="button" @click="()=>{valid ? updateHandler() : validate()}"/>
          </div>
        </ValidationProvider>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Modal from "../Modal";
  import {ValidationProvider} from 'vee-validate';
  import InputField from "../../shared-components/InputField";
  import Btn from "../../shared-components/Btn";
  import {UPDATE_GROUP_NAME_ACTION} from "../../store/modules/tracking/constants";
  import {HIDE_MODAL_MUTATION} from "../../store/modules/modal/constants";

  export default {
    name: "ChangeGroupName",
    props: {
      title: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        newName: '',
      }
    },
    components: {Btn, InputField, Modal, ValidationProvider},
    methods: {
      async updateHandler() {
        const res = await this.$store.dispatch(`tracking/${UPDATE_GROUP_NAME_ACTION}`, {
          groupName: this.title,
          newName: this.newName
        });

        if (res) {
          this.$store.commit(`modal/${HIDE_MODAL_MUTATION}`);
        } else {
          alert(res);
        }
      }
    }
  }
</script>

<style scoped>

</style>