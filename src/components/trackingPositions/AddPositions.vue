<template>
  <Modal title="Добавить позицию" closable>
    <template v-slot:default>

      <!-- <div class="modal-form-steps">
        <div class="modal-form-steps__line"/>
        <div class="modal-form-steps__item"
             :class="{'modal-form-steps__item_success': firstDone, 'modal-form-steps__item_active': !firstDone}">
          <div class="step-circle">1</div>
          <div class="step-name" v-text="firstStepName"/>
        </div>
        <div class="modal-form-steps__item" :class="{'modal-form-steps__item_active': firstDone}">
          <div class="step-circle">2</div>
          <div class="step-name">Выберите группу</div>
        </div>
      </div> -->

      <form ref="form" action="" class="modal-form" @submit.prevent>
          <ValidationObserver ref="firstStepObserver">
            <ValidationProvider
              v-if="selectedType==='byGoods'"
              :rules="{required: true, is_type: 'object'}"
              :custom-messages="{is_type: 'Не найдено'}"
              v-slot="{errors}"
              key="byGoodsType">
              <FindProductModal @selectedProducts="selectedProducts" v-model="foundedProduct" :validation-error="$getValidationError(errors)"/>
            </ValidationProvider>
            <div class="modal-form__submit-item">
              <Btn label="Добавить"
                   type="button"
                   :isDisabled="isDisabled"
                   @click="addPosition"/>
            </div>
          </ValidationObserver>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Modal from "@/components/Modal";
  import Warning from "@/components/blackbox/Warning";
  import Btn from "@/shared-components/Btn";
  import {TrackingService} from "@/services/tracking_service";
  import {SET_MODAL_RESPONSE_MUTATION, SHOW_MODAL_MUTATION, HIDE_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import {ADD_POSITIONS_ACTION} from "@/store/modules/trackingPositions/constants";
  import {LOAD_GROUPS_ACTION} from "@/store/modules/tracking/constants";
  import {mapMutations, mapActions} from "vuex";
  import {ValidationProvider, ValidationObserver} from 'vee-validate';
  import FindProductModal from "@/shared-components/FindProductModal";
  // import BrandsSelector from "@/shared-components/BrandsSelector";

  const ADD_BY_GOODS = 'byGoods';
  const ADD_BY_BRAND = 'byBrand';

  export default {
    name: "AddPosition",
    components: {
      // BrandsSelector,
      FindProductModal, Modal, Btn, ValidationProvider, ValidationObserver
    },
    data() {
      return {
        addTypes: [ADD_BY_GOODS, ADD_BY_BRAND],
        selectedType: ADD_BY_GOODS,

        foundedProduct: null,

        selectedBrands: [],
        selectedGroup: '',

        products: null
      }
    },
    computed: {
      isDisabled () {
        if(this.products) {
          return this.products.length <= 0 ? true: false
        } else {
          return true
        }
      }
    },
    mounted() {
      this.$refs.form.addEventListener("submit", (event) => {
          event.preventDefault()
      });
    },
    methods: {
      async addPosition() {
        const result = await this[ADD_POSITIONS_ACTION](this.products);
        if(result.status === 201) {
          this.$store.commit('notifications/ADD_NOTIFICATION', {text: 'Позиции добавлены', status: 'success'})
          await this.$store.commit(`modal/${HIDE_MODAL_MUTATION}`);
        } else {
          this.$store.commit('notifications/ADD_NOTIFICATION', {text: 'Произошла ошибка', status: 'error'})
          await this.$store.commit(`modal/${HIDE_MODAL_MUTATION}`);
        }
      },

      selectedProducts (products) {
        this.products = products
      },

      ...mapMutations('modal', [SET_MODAL_RESPONSE_MUTATION]),
      ...mapMutations('modal', [SHOW_MODAL_MUTATION]),
      ...mapMutations('modal', [HIDE_MODAL_MUTATION]),
      ...mapActions('trackingPositions', [ADD_POSITIONS_ACTION]),
    },
  }
</script>

<style scoped lang="scss">
  @import "../../assets/scss/variables.scss";

  .input-field__label {
    letter-spacing: .2px;
    color: $titleColor;
    font-weight: bold;
    display: block;
  }
</style>