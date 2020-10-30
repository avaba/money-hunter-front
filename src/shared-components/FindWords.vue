<template>
  <div class="input-field">
    <label for="" class="input-field__label">{{label}}</label>

    <div ref="inputWordsWrapper" class="input-field-wrapper">
      <input 
           @keyup.enter="word.replace(/\s+/g, '').length > 0 ? addNewWord(word) : false"
           @blur="word.replace(/\s+/g, '').length > 0 ? addNewWord(word) : false"
           v-model="word"
           :class="`input-field__input`"
           placeholder="В разработке"
           :style="`
           padding-left: ${paddingLeftInput}px;
           padding-top: ${paddingTopInput}px;
           padding-bottom: ${paddingBottomInput}px;
           `"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InputWords",
    props: {
      label: String
    },
    data() {
      return {
        items: [],
        
        word: '',
        paddingLeftInput: 10,
        paddingTopInput: 0,
        paddingBottomInput: 0
      }
    },
    computed: {
    },
    watch: {
      items: function () {
        this.$nextTick(function () {
          if(this.$refs.inputValues) {
            this.paddingLeftInput = this.$refs.inputValues.clientWidth
          } else {
            this.paddingLeftInput = 10
          }
          if(this.$refs.inputWordsWrapper && this.$refs.inputValues) {
            if(this.$refs.inputWordsWrapper.clientWidth <= this.$refs.inputValues.clientWidth) {
              this.paddingLeftInput = 10
              this.paddingTopInput = this.$refs.inputValues.clientHeight
              this.paddingBottomInput = 15
            } else {
              this.paddingTopInput = 0
              this.paddingBottomInput = 0
            }
          }
        })
      }
    },
    methods: {
      addNewWord(word) {
        this.items.push(word)
        this.word = ''
        this.$emit('input', this.items)
      },
      removeProduct (word) {
        this.items.splice(this.items.findIndex(item => item === word), 1)
        this.$emit('input', this.items)
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
    pointer-events: none;
    user-select: none;
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
    // margin-top: 4px;
    border: 1px solid $drayDevider;
    border-radius: 4px;
    padding: 0 .92rem;
    // min-height: 2.65rem;
    width: 100%;
    letter-spacing: .2px;
    color: black;
    position: relative !important;
    margin-top: 5px;
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
    min-height: 2.85rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: none;
    user-select: none;
    & .input-field__input {
      position: absolute;
      pointer-events: none;
      background: #F4F4F3;
    }
  }
  .input-field-wrapper-values {
    position: absolute;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    // top: 50%;
    padding: 5px 0.46rem;
    // transform: translate(0, -50%);
    margin: 3px -1px 0px -1px;
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
    margin: 1px 1px;
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