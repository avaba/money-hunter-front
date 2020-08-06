<template>
  <Modal title="Создать группу" closable @next="onNext">
    <template v-slot:default>
      <div class="modal-form-steps">
        <div class="modal-form-steps__line"/>
        <div class="modal-form-steps__item"
             :class="{'modal-form-steps__item_success': firstDone, 'modal-form-steps__item_active': !firstDone}">
          <div class="step-circle">1</div>
          <div class="step-name">Название группы</div>
        </div>
        <div class="modal-form-steps__item" :class="{'modal-form-steps__item_active': firstDone}">
          <div class="step-circle">2</div>
          <div class="step-name">Добавить продукты</div>
        </div>
      </div>

      <form class="modal-form">
        <template v-if="!firstDone">
          <ValidationProvider :rules="{required: true}" v-slot="{errors}" ref="firstStepProvider">
            <div class="modal-form__save-project">
              <InputField label="Придумайте название для вашей группы"
                          v-model="groupName"
                          :error="$getValidationError(errors)"/>
            </div>

            <div class="modal-form__submit-item">
              <Btn label="Далее" type="button" @click="firstStepDoneHandler"/>
            </div>
          </ValidationProvider>
        </template>
        <template v-if="firstDone">
          <ValidationProvider v-slot:="{errors}"
                              :rules="{required: true, is_type: 'object'}"
                              :custom-messages="{is_type: 'Не найдено'}"
                              ref="secondStepObserver">
            <FindProductModal v-model="foundedProduct"
                              :validation-error="$getValidationError(errors)"/>
            <div class="modal-form__double-submit modal-form__double-submit_save-project">
              <div class="modal-form__double-submit-item">
                <Btn label="Назад" clazz="button_gray" @click="firstDone=false"/>
              </div>
              <div class="modal-form__double-submit-item">
                <Btn label="Сохранить" @click="createGroupBtnHandler"/>
              </div>
            </div>
          </ValidationProvider>
        </template>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Btn from "../../shared-components/Btn";
  import InputField from "../../shared-components/InputField";
  import Warning from "@/components/blackbox/Warning";
  import Modal from "@/components/Modal";
  import FindProductModal from "@/shared-components/FindProductModal";
  import {ValidationProvider} from 'vee-validate';
  import {TrackingService} from "@/services/tracking_service";
  import {LOAD_GROUPS_ACTION} from "@/store/modules/tracking/constants";
  import {SET_MODAL_RESPONSE_MUTATION, SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import {mapMutations} from "vuex";

  export default {
    name: "CreateGroup",
    components: {FindProductModal, InputField, Btn, Modal, ValidationProvider},
    data() {
      return {
        firstDone: false,
        groupName: '',
        foundedProduct: null,
      }
    },
    methods: {
      onNext() {
        if (this.firstDone) {
          this.createGroupBtnHandler();
        } else {
          this.firstStepDoneHandler();
        }
      },
      async firstStepDoneHandler() {
        this.firstDone = await this.$validationProviderIsValid(this.$refs.firstStepProvider);
      },
      async createGroupBtnHandler() {
        if (await this.$refs.secondStepObserver.validate) {
          const service = new TrackingService();
          const result = await service.createUpdateGroup(
            this.groupName,
            [this.foundedProduct.articul],
            false
          );

          if (result) {
            this[SHOW_MODAL_MUTATION]({component: Warning});
            this[SET_MODAL_RESPONSE_MUTATION]('Группа создана')
            await this.$store.dispatch(`tracking/${LOAD_GROUPS_ACTION}`);
            // await this.$store.commit(`modal/${HIDE_MODAL_MUTATION}`);
            await this.$router.push({name: 'tracking.group', params: {name: this.groupName.toUpperCase()}});
          } else {
            this[SHOW_MODAL_MUTATION]({component: Warning});
            this[SET_MODAL_RESPONSE_MUTATION]('Произошла ошибка')
          }
        }
      },
      ...mapMutations('modal', [SET_MODAL_RESPONSE_MUTATION]),
      ...mapMutations('modal', [SHOW_MODAL_MUTATION])
    }
  }
</script>

<style scoped>

</style>