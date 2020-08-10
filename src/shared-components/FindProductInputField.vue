<template>
  <div class="input-field">
    <label for="" class="input-field__label">{{label}}</label>

    <span class="input-field__error" v-if="!!error">{{error}}</span>

    <div class="input-field-wrapper">
      <input :disabled="disabled"
           :type="_type"
           :value="value"
           :class="`input-field__input ${!!error ? 'input-field__input_error ' : ''}`+clazz"
           :placeholder="placeholder"
           v-mask="mask"
           @submit.prevent
           @input="$emit('input', $event.target.value)"
           :style="`padding-left: ${paddingLeftInput}px`"/>
      <div v-if="products.length > 0" ref="inputValues" class="input-field-wrapper-values">
        <span @click="removeProduct(i)" v-for="i in products" :key="i" class="input-field-wrapper-values-item">{{ i }}</span>
      </div>
    </div>
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
        value: [String | Array],
        default: '',
      },
      clazz: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      mask: {
        type: [Object, String],
        default: '',
      },
      min: {
        type: Number,
        default: -Infinity
      },
      max: {
        type: Number,
        default: Infinity,
      },
      products: {
        type: Array,
      }
    },
    data() {
      return {
        showPassword: false,
        paddingLeftInput: 10
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
      },
    },
    watch: {
      products: function () {
        this.$nextTick(function () {
          if(this.$refs.inputValues) {
            this.paddingLeftInput = this.$refs.inputValues.clientWidth
          } else {
            this.paddingLeftInput = 10
          }
        })
      }
    },
    mounted() {
      if(this.$refs.inputValues) {
        this.paddingLeftInput = this.$refs.inputValues.clientWidth
      }
    },
    methods: {
      minTransformer() {
        const _v = this.value[0];
        const min = this.min;
        const max = this.value[1] || this.max;
        return [_v < min ? min : (_v > max ? max : _v), this.value[1]];
      },
      maxTransformer() {
        const _v = this.value[1];
        const min = this.value[0] || this.min;
        const max = this.max;

        return [this.value[0], _v > max ? max : (_v < min ? min : _v)];
      },
      removeProduct (i) {
        this.$emit('removeProduct', i)
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
    width: 50%;
    height: 2.85rem;
    padding: 0 5px;
  }

  .input-field-wrapper {
    position: relative;
    width: 100%;
    height: 2.85rem;
    & .input-field__input {
      position: absolute;
    }
  }

  .input-field-wrapper-values {
    position: absolute;
    display: flex;
    align-items: center;
    top: 50%;
    padding: 0px 0.46rem;
    transform: translate(0, -50%);
    margin-top: 4px;
    margin: 4px -1px 0px -1px;
  }
  
  .input-field-wrapper-values-item {
    display: block;
    background: url(/img/clear.50a35f1a.svg) no-repeat 95% center, #808080;
    padding: 3px 30px 3px 6px;
    border-radius: 4px;
    font-size: .85rem;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    user-select: none;
    margin: 0px 1px;
  }
</style>