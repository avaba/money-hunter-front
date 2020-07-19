<template>
  <div class="modal-form-category">
    <label for="" class="input-field__label">
      Выберите группу из списка
    </label>
    <span class="input-field__error" v-if="!!error">{{error}}</span>
    <div class="modal-form__category-list">
      <div class="radio-item" v-for="(item, idx) in groups" :key="idx">
        <input type="radio"
               :value="value"
               :checked="value===item.name && !isNewGroup"
               @click="()=>{$emit('input', item.name); isNewGroup=false}"><label for="">{{item.name}}</label>
      </div>
      <div class="radio-item">
        <input type="radio" :checked="isNewGroup" @click="()=>{if(!isNewGroup) {$emit('input', '')}; isNewGroup=true}">
        <input type="text"
               class="input-field__input"
               @input="$emit('input', $event.target.value)"
               @click="()=>{if(!isNewGroup) {$emit('input', '')}; isNewGroup=true}"
               :value="isNewGroup ? value : ''"
               placeholder="Название новой группы">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "SelectGroupModal",
    props: {
      value: {
        type: String,
        required: true,
      },
      error: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        isNewGroup: false
      }
    },
    computed: {
      ...mapState('tracking', ['groups'])
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .input-field__label {
    letter-spacing: .2px;
    color: $titleColor;
    font-weight: bold;
    display: block;
  }
  .input-field__error {
    color: $red;
    letter-spacing: .2px;
  }
</style>