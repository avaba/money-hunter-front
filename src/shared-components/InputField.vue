<template>
  <div class="input-field">
    <label for="" class="input-field__label">{{label}}</label>

    <span class="input-field__error" v-if="!!error">{{error}}</span>

    <div class="input-field__range" v-if="range">
      <input type="text" class="input-field__input_range" placeholder="Min">
      <span>-</span>
      <input type="text" class="input-field__input_range" placeholder="Max">
    </div>

    <input v-else
           :type="_type"
           :value="value"
           :class="`input-field__input ${!!error ? 'input-field__input_error ' : ''}`+clazz"
           :placeholder="placeholder"
           @input="$emit('input', $event.target.value)"/>
    <button class="vision-password vision-password_error"
            :class="{'vision-password_visible': !showPassword}"
            @click="showPassword=!showPassword"
            v-if="isPassword"
            type="button"/>
  </div>
</template>

<script>
  export default {
    name: "InputField",
    props: {
      label: {
        type: String,
        default: '',
      },
      error: {
        type: String,
        default: null,
      },
      range: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'text',
      },
      value: {
        type: String,
        default: '',
      },
      clazz: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showPassword: false,
      }
    },
    computed: {
      _type() {
        if (this.type !== 'password') {
          return this.type;
        }

        return this.showPassword ? 'text' : 'password';
      },
      isPassword() {
        return this.type === 'password';
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .input-field {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
  }

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

  .input-field__input {
    flex: 1 0 100%;
    display: block;
    margin-top: 3px;
    border: 1px solid $drayDevider;
    border-radius: 4px;
    padding: 0 .92rem;
    height: 2.85rem;
    width: 100%;
    letter-spacing: .2px;
    color: black;

    &.input-field__input_error {
      border-color: red;
      color: $red;
    }
  }

  .input-field__range {
    display: flex;
    align-items: center;

    span {
      margin: 0 .35rem;
    }
  }

  .input-field__input_range {
    border-bottom: 1px solid $drayDevider;
    background: none;
    letter-spacing: .2px;
    color: black;
    width: 6.42rem;
    height: 2.85rem;
    padding: 0 5px;
  }
</style>