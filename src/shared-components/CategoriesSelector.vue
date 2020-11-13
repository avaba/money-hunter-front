<template>
  <div class="input-field v-application" data-app>
    <label for="" class="input-field__label">Выберите категорию</label>

    <!-- <span class="input-field__error" v-if="!!error">{{error}}</span> -->
    <div @click="dialog = !dialog" v-if="!isCategoriesLoading" ref="inputWordsWrapper" class="input-field-wrapper">
      <input 
          disabled="disabled"
          :class="`input-field__input`"
          :style="`
          padding-left: ${paddingLeftInput}px;
          padding-top: ${paddingTopInput}px;
          padding-bottom: ${paddingBottomInput}px;
          `"/>
        <div v-if="categories.length > 0" ref="inputValues" class="input-field-wrapper-values">
        <!-- <span v-for="i in partOfCategories" :key="i" class="input-field-wrapper-values-item">
          <p class="text">{{ i.name }}</p>
        </span> -->
      </div>
    </div>
    <div v-else ref="inputWordsWrapper" class="input-field-wrapper input-disabled">
      <input 
          disabled="disabled"
          :class="`input-field__input`"
          :style="`
          padding-left: ${paddingLeftInput}px;
          padding-top: ${paddingTopInput}px;
          padding-bottom: ${paddingBottomInput}px;
          `"/>
        <div ref="inputValues" class="input-field-wrapper-values">
        <span class="input-field-wrapper-values-item">
          <p class="text">Все</p>
        </span>
      </div>
    </div>



    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card
        class="mx-auto"
        max-width="500"
      >
        <v-sheet class="pa-4 primary lighten-2">
          <v-text-field
            v-model="search"
            label="Поиск категорий"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
      </v-sheet>
        <v-treeview
          selectable
          :items="availableOptions"
          :search="search"
          v-model="categories"
        />
      </v-card>
    </v-dialog>



  </div>
</template>

<script>
import {BlackboxService} from "../services/blackbox_service";
  export default {
    name: "InputWords",
    props: {
      label: String,
      value: Array
    },
    data() {
      return {
        word: '',

        paddingLeftInput: 10,
        paddingTopInput: 0,
        paddingBottomInput: 0,
        isCategoriesLoading: false,
        categories: [0],
        allCategories: null,

        dialog: false,

        search: null
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
      },
      value: {
        handler: function () {
          this.items = [...this.value]
        },
        deep: true
      },
      categories: {
        handler: function () {
          const items = []
          this.categories.forEach(item => {
            items.push(this.availableOptions.find(c => c.id === item).name)
          })
          this.items = [...items]
        },
        deep: true
      }
    },
    created() {
      this.loadCategories()
      setInterval(() => {
        console.log(this.categories)
      }, 1000);
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
      },
      async loadCategories() {
        const service = new BlackboxService();
        let categories = null
        this.isCategoriesLoading = true
        this.availableOptions = [{
          id: -2,
          name: 'Загрузка...',
          isDefaultExpanded: true
        }];
        this.categories = [-2]
        if(JSON.parse(localStorage.getItem("categories")) && JSON.parse(localStorage.getItem("categoryUpdated0611"))) {
          const timestamp = JSON.parse(localStorage.getItem("categories")).timestamp
          const timeNow = new Date().getTime()
          if(this.compareTime(Number.parseInt(timestamp), timeNow)) {
            categories = JSON.parse(localStorage.getItem("categories")).categories
          } else {
            categories = await service.getCategories()
            localStorage.setItem("categories", JSON.stringify({categories: categories, timestamp: new Date().getTime().toString()}))
            localStorage.setItem("categoryUpdated0611", true) 
          }
        } else {
          categories = await service.getCategories()
          localStorage.setItem("categoryUpdated0611", true) 
          localStorage.setItem("categories", JSON.stringify({categories: categories, timestamp: new Date().getTime().toString()}))
        }
        console.log(categories)
        this.allCategories = categories
        this.availableOptions = categories;
        this.categories = [0]
        this.availableOptions[0]['isDefaultExpanded'] = true
        this.isCategoriesLoading = false
      },
      compareTime(dateString, now) {
        const oneDayTime = 10000000
        if(dateString + oneDayTime >= now) {
          return true
        } else {
          return false
        }
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
    cursor: pointer;
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
    & .input-field__input {
      position: absolute;
    }
    &.input-disabled {
      cursor: default;
      & * {
        cursor: default;
      }
      & .input-field-wrapper-values-item {
        background: #9FA2B4;
        color: #fff;
      }
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
    margin: 5px 1px 1px 1px;
    display: flex;
    background: #e3f2fd;
  }
  .input-field-wrapper-values-item p {
    border: 1px solid transparent;
    padding: 0px 5px;
    margin: 0px;
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