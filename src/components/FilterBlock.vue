<template>
  <div class="filter block_container">
    <form action="" class="filter-form">
      <div class="filter-form__fields">
        <div class="filter-form__item">
          <SelectField label="Выберите категории" :options="[{option: 'Спортивные костюмы'}]"/>
        </div>
        <div class="filter-form__item">
          <InputField label="Цена" range/>
        </div>
        <div class="filter-form__item">
          <InputField label="Рейтинг" range/>
        </div>
        <div class="filter-form__item">
          <InputField label="Отзывы" range/>
        </div>
        <div class="filter-form__item">
          <InputField label="Заказы в день" range/>
        </div>
        <div class="filter-form__item">
          <InputField label="Доход в день" range/>
        </div>
      </div>
      <div class="filter-form__actions">
        <div class="filter-form__searchs">
          <RowWithIcon :list="[{img: searchIcon, label: 'У вас осталось поисков:'}]"/>
          <div class="filter-form__searchs-count">58</div>
        </div>
        <div class="filter-form__buttons">
          <ButtonGroup :items="buttonGroupItems"/>
        </div>
        <div class="filter-form__send">
          <Btn label="Найти" clazz="button_save"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import SelectField from "../shared-components/SelectField";
  import InputField from "../shared-components/InputField";
  import RowWithIcon from "../shared-components/RowWithIcon";
  import ButtonGroup from "../shared-components/ButtonGroup";

  import SearchImage from '../assets/img/ikons/search.svg';
  import Btn from "@/shared-components/Btn";

  export default {
    name: "FilterBlock",
    components: {Btn, SelectField, InputField, RowWithIcon, ButtonGroup},
    data() {
      return {
        searchIcon: SearchImage,
        buttonGroupItems: [
          {clazz: "filter-form__action-button filter-form__action-button_download", label: "Загрузить поиск "},
          {clazz: "filter-form__action-button filter-form__action-button_save", label: "Сохранить поиск"},
          {clazz: "filter-form__action-button filter-form__action-button_clear", label: "Очистить фильтры"}
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .filter {
    margin: 1.42rem 2.28rem 0;
    padding: 1.71rem 1.42rem 2.28rem;
    border-radius: 8px;
    background: white;
    border: 1px solid $drayDevider;
  }

  .filter-form__fields {
    display: flex;
    justify-content: space-between;
  }

  .filter-form__item {

    &:not(:last-child) {
      margin-right: 1.42rem;
    }
  }

  .filter-form__actions {
    margin-top: 1.42rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .filter-form__send {
    width: 10rem;
    margin-left: 1.07rem;
  }

  .filter-form__buttons {
    display: flex;
    align-items: center;
  }

  .filter-form__searchs {
    display: flex;
    align-items: center;
    margin-right: 3.85rem;

    .item-row {
      margin-right: .71rem;
    }
  }

  .filter-form__searchs-count {
    font-weight: bold;
  }
</style>