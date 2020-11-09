<template>
  <div class="select-field">
    <label for="" class="select-field__label">{{label}}</label>
    <select name="" id="" class="select-field__select">
      <option :value="item.value" v-for="(item, idx) in options" :key="idx">{{item.option}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: "SelectField",
    props: {
      label: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        required: true,
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .select-field {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
  }

  .select-field__label {
    letter-spacing: .2px;
    color: $titleColor;
    font-weight: bold;
    display: block;
  }
</style>