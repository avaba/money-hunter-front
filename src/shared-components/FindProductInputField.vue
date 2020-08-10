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
        <span @click="removeProduct(i)" v-for="i in products" :key="i" class="input-field-wrapper-values-item">
          <p class="text">{{ i }}</p>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348.333 348.333"><path d="M336.559 68.611L231.016 174.165l105.543 105.549c15.699 15.705 15.699 41.145 0 56.85-7.844 7.844-18.128 11.769-28.407 11.769-10.296 0-20.581-3.919-28.419-11.769L174.167 231.003 68.609 336.563c-7.843 7.844-18.128 11.769-28.416 11.769-10.285 0-20.563-3.919-28.413-11.769-15.699-15.698-15.699-41.139 0-56.85l105.54-105.549L11.774 68.611c-15.699-15.699-15.699-41.145 0-56.844 15.696-15.687 41.127-15.687 56.829 0l105.563 105.554L279.721 11.767c15.705-15.687 41.139-15.687 56.832 0 15.705 15.699 15.705 41.145.006 56.844z"></path></svg>
          </span>
        </span>
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
    padding: 2px 0;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 500;
    color: #039be5;
    cursor: pointer;
    user-select: none;
    margin: 0px 1px;
    display: flex;
    background: #e3f2fd;
  }
  .input-field-wrapper-values-item p {
    border: 1px solid transparent;
    padding: 0px 5px;
    border-right: 1px solid #fff;
  }
  .input-field-wrapper-values-item svg {
    width: 6px;
    height: 6px;
    fill: #039be5;
  }
  .input-field-wrapper-values-item:hover svg {
    fill: red;
  }
  .input-field-wrapper-values-item span {
    width: 17px;
    height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>