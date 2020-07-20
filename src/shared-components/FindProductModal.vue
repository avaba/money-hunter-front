<template>
  <Fragment>
    <div class="modal-form__save-project">
      <InputField label="Введите артикул товара"
                  v-model="selectedArticul"
                  @input="handleProductSearch"
                  :error="validationError"/>
    </div>

    <template v-if="value!==null">
      <div class="modal-form-search" v-if="typeof value==='string'">
        <div class="modal-form-search__not"><span>{{value}}</span></div>
      </div>
      <div class="modal-form-product" v-if="typeof value==='object'">
        <div class="product-item">
          <div class="product-photo"><img :src="value.imageLink" alt=""></div>
          <div class="product-info">
            <div class="product name">{{value.name}} - {{value.brand}}</div>
            <div class="product-code">{{selectedArticul}}</div>
          </div>
        </div>
      </div>
    </template>
  </Fragment>
</template>

<script>
  import {Fragment} from 'vue-fragment';
  import InputField from "./InputField";
  import {debounce} from "lodash";
  import {TrackingService} from "../services/tracking_service";

  export default {
    name: "FindProductModal",
    components: {InputField, Fragment},
    props: {
      value: {
        type: [Object, String],
        required: false,
      },
      validationError: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        selectedArticul: '',
        debouncedProductSearch: debounce(this.searchProduct, 500),
      }
    },
    methods: {
      handleProductSearch() {
        this.debouncedProductSearch();
      },
      async searchProduct() {
        const service = new TrackingService();
        const result = await service.getProductInfoByArticul(this.selectedArticul);

        this.$emit('input', typeof result === 'object' ? {...result, articul: this.selectedArticul} : result);
      },
    }
  }
</script>

<style scoped lang="scss">
  .product-photo img {
    width: 44px;
    height: 44px;
    object-fit: cover;
  }
</style>