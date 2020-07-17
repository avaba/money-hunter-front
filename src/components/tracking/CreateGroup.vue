<template>
  <Modal title="Создать группу" closable>
    <template v-slot:logo><span/></template>
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

      <form action="" class="modal-form">
        <template v-if="!firstDone">
          <div class="modal-form__save-project">
            <InputField label="Придумайте название для вашей группы"/>
          </div>

          <div class="modal-form__submit-item">
            <Btn label="Далее" type="button" @click="firstDone=true"/>
          </div>
        </template>
        <template v-if="firstDone">
          <div class="modal-form__save-project">
            <InputField label="Введите URL товара или артикул"/>
          </div>

          <div class="modal-form-search">
            <div class="modal-form-search__not">
<!--              <img src="../../assets/img/" alt="">-->
              <span>Такога товара мы не нашли напишите по другому...</span>
            </div>
          </div>

          <div class="modal-form__double-submit modal-form__double-submit_save-project">
            <div class="modal-form__double-submit-item">
              <Btn label="Назад" clazz="button_gray" @click="firstDone=false"/>
            </div>
            <div class="modal-form__double-submit-item">
              <Btn label="Сохранить"/>
            </div>
          </div>
        </template>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Btn from "../../shared-components/Btn";
  import InputField from "../../shared-components/InputField";
  import Modal from "@/components/Modal";

  export default {
    name: "CreateGroup",
    components: {InputField, Btn, Modal},
    data() {
      return {
        firstDone: false,
      }
    }
  }
</script>

<style scoped>

</style>