<template>
  <Modal title="Добавить товар" closable>
    <template v-slot:logo><span/></template>
    <template v-slot:default>
      <div class="modal-form-steps">
        <div class="modal-form-steps__line"/>
        <div class="modal-form-steps__item"
             :class="{'modal-form-steps__item_success': firstDone, 'modal-form-steps__item_active': !firstDone}">
          <div class="step-circle">1</div>
          <div class="step-name">Добавить товар</div>
        </div>
        <div class="modal-form-steps__item" :class="{'modal-form-steps__item_active': firstDone}">
          <div class="step-circle">2</div>
          <div class="step-name">Выберите группу</div>
        </div>
      </div>

      <form action="" class="modal-form">
        <template v-if="!firstDone">
          <div class="modal-form__save-project">
            <InputField label="Введите URL товара или артикул"/>
          </div>

          <div class="modal-form__submit-item">
            <Btn label="Далее" type="button" @click="firstDone=true"/>
          </div>
        </template>
        <template v-if="firstDone">
          <div class="modal-form-category">
            <label for="" class="input-field__label">
              Выберите группу из списка
            </label>
            <div class="modal-form__category-list">
              <div class="radio-item"><input type="radio"><label for="">Брюки</label></div>
              <div class="radio-item"><input type="radio"><label for="">Комбинезоны</label></div>
              <div class="radio-item"><input type="radio"><label for="">Верхняя одежда</label></div>
              <div class="radio-item"><input type="radio"><label for="">Джинсы</label></div>
              <div class="radio-item"><input type="radio"><label for="">Домашняя одежда</label></div>
              <div class="radio-item"><input type="radio"><label for="">Майки</label></div>
              <div class="radio-item"><input type="radio"><label for="">Нижнее белье</label></div>
              <div class="radio-item"><input type="radio"><label for="">Носки и гетры</label></div>
              <div class="radio-item"><input type="radio"><label for="">Одежда больших размеров</label></div>
              <div class="radio-item"><input type="radio"><label for="">Пиджаки и костюмы</label></div>
              <div class="radio-item"><input type="radio"><label for="">Плавки и шорты для плавания</label></div>
              <div class="radio-item"><input type="radio"><label for="">Нижнее белье</label></div>
              <div class="radio-item"><input type="radio"><label for="">Носки и гетры</label></div>
              <div class="radio-item"><input type="radio"><label for="">Одежда больших размеров</label></div>
              <div class="radio-item"><input type="radio"><label for="">Пиджаки и костюмы</label></div>
              <div class="radio-item"><input type="radio"><label for="">Плавки и шорты для плавания</label></div>
              <div class="radio-item">
                <input type="radio">
                <input type="text" class="input-field__input" placeholder="Название новой группы">
              </div>
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
  import Modal from "@/components/Modal";
  import Btn from "@/shared-components/Btn";
  import InputField from "@/shared-components/InputField";

  export default {
    name: "AddGoodsPosition",
    components: {InputField, Modal, Btn},
    data() {
      return {
        firstDone: false
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/scss/variables.scss";

  .input-field__label {
    letter-spacing: .2px;
    color: $titleColor;
    font-weight: bold;
    display: block;
  }
</style>