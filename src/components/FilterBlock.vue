<template>
  <div class="filter block_container">
    <form action="" class="filter-form">
      <div class="filter-form__fields">
        <div class="filter-form__item filter-form__item-brands">
          <TreeSelect label="Выберите категории"
                      v-model="categories"
                      :options="availableOptions"
                      :normalizer="node=>({...node, label: node.name})"
                      :limit="3"
                      :limitText="count=>`и еще ${count}`"
                      :multiple="true"/>
          <ValidationProvider class="brandsSelector" :rules="{required: true}" key="byBrandType">
              <BrandsSelector
                v-model="brands"
                @brands="brandsFinding"
              />
          </ValidationProvider>
        </div>
        <div class="filter-form__item">
          <InputField label="Цена" range v-model="priceRange" :min="1" :max="900000"/>
        </div>
        <div class="filter-form__item">
          <InputField label="Рейтинг" range v-model="ratingRange" :min="0" :max="5"/>
        </div>
        <div class="filter-form__item">
          <InputField label="Отзывы" range v-model="feedbackRange" :min="0" :max="900000"/>
        </div>
        <div class="filter-form__item">
          <InputField label="Заказы в неделю" range v-model="ordersRange" :min="0" :max="900000"/>
        </div>
        <div class="filter-form__item">
          <InputField label="Сумма заказов в неделю" range v-model="revenueRange" :min="0" :max="900000"/>
        </div>
      </div>
      <div class="filter-form__actions">
        <div class="filter-form__searchs" v-if="userSubscription==='FREE'">
          <RowWithIcon :list="[{img: searchIcon, label: 'У вас осталось поисков:'}]"/>
          <div class="filter-form__searchs-count">{{blackboxSearches}}</div>
        </div>
        <div class="filter-form__buttons">
          <Btn without-default-class
               label="Загрузить фильтр"
               clazz="filter-form__action-button filter-form__action-button_download"
               @click="loadProject"
               />
          <Btn without-default-class
               label="Сохранить фильтр"
               clazz="filter-form__action-button filter-form__action-button_save"
               @click="saveProject"/>
          <Btn without-default-class
               @click="resetFilters"
               label="Очистить фильтры"
               type="reset"
               clazz="filter-form__action-button filter-form__action-button_clear"/>
        </div>
        <div class="filter-form__send">
          <Btn label="Найти" clazz="button_save" @click="searchBtnHandler"/>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import InputField from "../shared-components/InputField";
  import RowWithIcon from "../shared-components/RowWithIcon";

  import SearchImage from '../assets/img/ikons/search.svg';

  import Btn from "@/shared-components/Btn";
  import {SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import {mapMutations} from "vuex";
  import SaveProject from "@/components/blackbox/SaveProject";
  import LoadProject from "@/components/blackbox/LoadProject";
  import {CHECK_SEARCH_ID_ACTION} from "@/store/modules/blackbox/constants";
  import TreeSelect from "@/shared-components/TreeSelect";
  import {BlackboxService} from "../services/blackbox_service";
  import {ValidationProvider} from 'vee-validate';
  import BrandsSelector from "@/shared-components/BrandsSelector";

  export default {
    name: "FilterBlock",
    components: {BrandsSelector, ValidationProvider, TreeSelect, Btn, InputField, RowWithIcon},
    props: {
      searchHandler: {
        type: Function,
        required: true,
      }
    },
    data() {
      return {
        searchIcon: SearchImage,
        availableOptions: [],

        priceRange: [],
        ordersRange: [],
        ratingRange: [],
        feedbackRange: [],
        revenueRange: [],
        categories: [-1],
        brands: [-1],

        foundedBrands: null
      }
    },
    computed: {
      blackboxSearches() {
        return this.$store.state.user.subscription?.blackBoxSearches;
      },
      userSubscription() {
        return this.$store.state.user.subscription?.subscriptionType;
      },
    },
    methods: {
      async searchBtnHandler() {
        await this.checkSearchID();
        this.searchHandler();
      }
      ,
      brandsFinding(brands) {
        this.foundedBrands = brands
      } 
      ,
      async checkSearchID() {
        const data = {...this.$data};
        delete data.searchIcon;
        delete data.availableOptions;
        delete data.categories;
        delete data.brands;

        const cats = [...this.categories];
        if(cats.length <= 0) {
          cats.push(-1)
        }
        if (cats.length === 1 && cats[0] === -1) {
          data.categories = this.availableOptions[0].children.map(child => child.id);
        } else {
          data.categories = this.categories;
        }

        const brands = [...this.brands];
        console.log(brands)
        if(brands.length < 1 || brands[0] === -1) {
          data.brands = ['all']
        } else {
          data.brands = brands
        }
        
        await this.$store.dispatch(`blackbox/${CHECK_SEARCH_ID_ACTION}`, data);
      }
      ,
      resetFilters() {
        this.priceRange = [];
        this.ordersRange = [];
        this.ratingRange = [];
        this.feedbackRange = [];
        this.revenueRange = [];
        this.categories = [-1];
        this.brands = [-1];
      }
      ,
      loadProject() {
        this[SHOW_MODAL_MUTATION]({component: LoadProject});
        this.$eventBus.$once('find_search_id_data', ({data}) => {
          this.priceRange = data.priceRange;
          this.ordersRange = data.ordersRange;
          this.ratingRange = data.ratingRange;
          this.feedbackRange = data.feedbackRange;
          this.revenueRange = data.revenueRange;
          this.categories = data.categories;
          const brands = []
          data.brands.forEach(name => {
            brands.push(this.foundedBrands.find(item => item.name === name).name)
          })
          this.brands = brands
          if(data.brands[0] === 'Все') {
            this.brands = [-1]
          }
          this.searchBtnHandler()
        })
      }
      ,
      saveProject() {
        const data = {...this.$data}
        this[SHOW_MODAL_MUTATION]({component: SaveProject, data: data});
      }
      ,
      compareTime(dateString, now) {
        const oneDayTime = 86400000
        if(dateString + oneDayTime >= now) {
          return true
        } else {
          return false
        }
      }
      ,
      async loadCategories() {
        const service = new BlackboxService();
        let categories = null
        if(JSON.parse(localStorage.getItem("categories"))) {
          const timestamp = JSON.parse(localStorage.getItem("categories")).timestamp
          const timeNow = new Date().getTime()
          if(this.compareTime(timestamp, timeNow)) {
            categories = JSON.parse(localStorage.getItem("categories")).categories
          } else {
            categories = await service.getCategories()
            localStorage.setItem("categories", JSON.stringify({categories: categories, timestamp: new Date().getTime().toString()}))
          }
        } else {
          categories = await service.getCategories()
          localStorage.setItem("categories", JSON.stringify({categories: categories, timestamp: new Date().getTime().toString()}))
        }
        // const categories = await service.getCategories()
        this.availableOptions = [{
          id: -1,
          name: 'Все',
          isDefaultExpanded: true,
          children: categories
        }];
      }
      ,
      // async loadBrands() {
        
      // }
      // ,
      ...
        mapMutations('modal', [SHOW_MODAL_MUTATION])
    },
    created() {
      this.loadCategories();
      // this.loadBrands();
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .filter-form__action-button {
    border: 1px solid $drayDevider;
    border-radius: 4px;
    // color: $titleColor;
    color: #000;
    padding-left: 2.28rem;
    padding-right: 1rem;
    height: 2.57rem;
    // background: #808080 !important;

    &:not(:last-child) {
      margin-right: 1.07rem;
    }

    &.filter-form__action-button_download {
      background: url("../assets/img/ikons/download2.svg") no-repeat .92rem center, white;
    }

    &.filter-form__action-button_save {
      background: url("../assets/img/ikons/save.svg") no-repeat .85rem center, white;
    }

    &.filter-form__action-button_clear {
      background: url("../assets/img/ikons/clear.svg") no-repeat .78rem center, white;
    }
  }

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

    &:first-child {
      max-width: 240px;
      min-width: 240px;
    }

    &:not(:last-child) {
      margin-right: 1.42rem;
    }

    &-brands {
      // max-width: 180px;
      & .brandsSelector {
        display: block;
        margin: 10px 0px;
      }
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
   @media screen and (max-width: 1300px) {
    .filter-form__fields {
      flex-wrap: wrap;
    }
    .filter-form__item {
      max-width: 250px !important;
      width: 100% !important;
      margin: 10px 5px !important;
      &-brands {
        // max-width: 250px !important;
        margin: 10px 5px !important;
        width: 100% !important;
      }
    }
    .filter-form__item .input-field {
      display: block;
    }
  }
  @media screen and (max-width: 710px) {
    .filter-form__fields {
      justify-content: center;
    }
    .filter {
      margin: 10px;
    }
  }
  @media screen and (max-width: 900px) {
    .filter-form__actions {
      flex-wrap: wrap;
      & button {
        margin: 5px 10px !important;
        width: 170px;
      }
    }
    .filter-form__buttons {
      flex-wrap: wrap;
      justify-content: center;
      margin: 0px auto;
    }
    .block_container {
      padding-bottom: 10px;
    }
    .filter-form__send {
      margin: 10px auto;
      width: auto;
      & .button_save {
        width: 170px;
      }
    }
  }
</style>