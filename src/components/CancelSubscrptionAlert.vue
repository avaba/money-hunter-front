<template>
  <Modal title="Отмена подписки" closable>
    <h2 class="CancelSubscrptionAlert-subtitle">{{ subtitleText }}</h2>
    <div v-if="!isCanceled" class="modal-form__double-submit modal-form__double-submit_save-project">
      <div class="modal-form__double-submit-item">
        <Btn label="Назад" clazz="button_gray" @click="hideModal"/>
      </div>
      <div class="modal-form__double-submit-item">
        <Btn label="Подтвердить" @click="cancelSubscription"/>
      </div>
    </div>
  </Modal>
</template>

<script>
  import Modal from "@/components/Modal";
  import Btn from "@/shared-components/Btn";
  import {mapMutations} from "vuex";
  import {HIDE_MODAL_MUTATION} from "@/store/modules/modal/constants";

  export default {
    name: "CancelSubscrptionAlert",
    components: {Modal, Btn},
    data: () => ({
      isCanceled: false,
      subtitleText: 'Вы уверены, что хотите отменить действующую подписку?'
    }),
    methods: {
      hideModal() {
        this[HIDE_MODAL_MUTATION]();
      },
      async cancelSubscription() {
        const result = await this.$store.dispatch('user/cancelSubscription')
        if(result.status === 200) {
          this.isCanceled = true
        }
        if(result.data.detail && result.data.detail.length > 0) {
          this.subtitleText = result.data.detail
        }
      },
      ...mapMutations('modal', [HIDE_MODAL_MUTATION]),
    }
  }
</script>

<style lang="scss" scoped>
  .CancelSubscrptionAlert {
    &-subtitle {
      text-align: center;
      font-weight: 500;
      font-size: 1.2em;
      line-height: 1;
      margin-top: 30px;
    }
    &-actions {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .modal-form__double-submit {
    max-width: 350px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
</style>