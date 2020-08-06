<template>
  <Modal title="Добавить товар" closable @next="onNext">
    <template v-slot:default>

      <div class="modal-tabs">
        <div class="modal-tabs__item" v-for="(item, idx) in addTypes" :class="{active: selectedType===item}"
             :key="idx"
             @click="_=>{selectedType=item; firstDone=false}"
             style="display: block; cursor:pointer;">
          <strong v-if="selectedType===item">
            <span v-html="translatedType(item)"/>
          </strong>
          <span v-else v-html="translatedType(item)"/>
        </div>
      </div>

      <div class="modal-form-steps">
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
      </div>

      <form action="" class="modal-form" @submit.prevent>
        <template v-if="!firstDone">
          <ValidationObserver ref="firstStepObserver">
            <ValidationProvider
              v-if="selectedType==='byGoods'"
              :rules="{required: true, is_type: 'object'}"
              :custom-messages="{is_type: 'Не найдено'}"
              v-slot="{errors}"
              key="byGoodsType">
              <FindProductModal v-model="foundedProduct" :validation-error="$getValidationError(errors)"/>
            </ValidationProvider>

            <ValidationProvider v-else :rules="{required: true}" v-slot="{errors}" key="byBrandType">
              <TreeSelect
                :error="$getValidationError(errors)"
                v-model="selectedBrands"
                ref="brandsSelector"
                label="Выберите бренд"
                :multiple="true"
                :load-options="loadBrands"
                :options="brandOptions"
                :normalizer="brandsNormalizer"
                :dont-use-local-search="true"
                @open="handleMenuOpen"
                @close="handleMenuClose"
                @search-change="handleSearchChange"
              />

            </ValidationProvider>

            <div class="modal-form__submit-item">
              <Btn label="Далее"
                   type="button"
                   @click="firstStepDoneHandler"/>
            </div>
          </ValidationObserver>
        </template>

        <template v-if="firstDone">
          <ValidationProvider v-slot="{errors}" :rules="{required: true}" ref="secondStepProvider">
            <SelectGroupModal v-model="selectedGroup" :error="$getValidationError(errors)"/>

            <div class="modal-form__double-submit modal-form__double-submit_save-project">
              <div class="modal-form__double-submit-item">
                <Btn label="Назад" clazz="button_gray" @click="firstDone=false"/>
              </div>
              <div class="modal-form__double-submit-item">
                <Btn label="Сохранить" @click="handleSaveBtn"/>
              </div>
            </div>
          </ValidationProvider>
        </template>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Modal from "@/components/Modal";
  import Warning from "@/components/blackbox/Warning";
  import Btn from "@/shared-components/Btn";
  import TreeSelect from "@/shared-components/TreeSelect";
  import {TrackingService} from "@/services/tracking_service";
  import {SET_MODAL_RESPONSE_MUTATION, SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import {LOAD_GROUPS_ACTION} from "@/store/modules/tracking/constants";
  import {mapMutations} from "vuex";
  import {ValidationProvider, ValidationObserver} from 'vee-validate';
  import SelectGroupModal from "@/shared-components/SelectGroupModal";
  import FindProductModal from "@/shared-components/FindProductModal";

  const ADD_BY_GOODS = 'byGoods';
  const ADD_BY_BRAND = 'byBrand';

  export default {
    name: "AddGoodsPosition",
    components: {FindProductModal, SelectGroupModal, TreeSelect, Modal, Btn, ValidationProvider, ValidationObserver},
    data() {
      return {
        firstDone: false,
        addTypes: [ADD_BY_GOODS, ADD_BY_BRAND],
        selectedType: ADD_BY_GOODS,

        loadedBrands: null,
        foundedProduct: null,

        brandOptions: null,

        brandsPortionPage: 1,
        brandsPortionSize: 30,
        brandsSearchQuery: '',

        selectedBrands: [],
        selectedGroup: '',

      }
    },
    computed: {
      firstStepName() {
        return this.selectedType === ADD_BY_GOODS
          ? 'Добавить товар'
          : 'Добавить бренд';
      },
    },
    methods: {
      translatedType(type) {
        return type === ADD_BY_GOODS ? 'По одному' : 'Бренд';
      },
      onNext() {
        if (this.firstDone) {
          this.handleSaveBtn();
        } else {
          this.firstStepDoneHandler();
        }
      },
      async firstStepDoneHandler() {
        this.firstDone = await this.$refs.firstStepObserver.validate();
      },
      async loadBrands() {
        const service = new TrackingService();
        this.loadedBrands = await service.getBrands();
        this.brandOptions = this.loadedBrands.slice(0, this.brandsPortionSize);
      },
      brandsNormalizer: node => ({id: node.brand, label: node.brand}),
      handleMenuOpen() {
        this.$nextTick(() => {
          const menu = this.$refs.brandsSelector.getMenu();

          menu.addEventListener('scroll', () => {
            const hasReachedEnd = menu.scrollHeight - menu.scrollTop <= menu.clientHeight * 1.25;

            if (hasReachedEnd) {
              this.brandsPortionPage += 1;

              const fromIndex = (this.brandsPortionPage - 1) * this.brandsPortionSize + 1;
              const toIndex = this.brandsPortionPage * this.brandsPortionSize;

              if (this.brandsSearchQuery) {
                this.brandOptions.push(...this.handleBrandsSearch(fromIndex))
              } else {
                this.brandOptions.push(
                  ...this
                    .loadedBrands
                    .slice(fromIndex, toIndex)
                );
              }
            }
          });
        })
      },
      handleMenuClose() {
        this.$nextTick(() => {
          this.brandOptions = this.loadedBrands.slice(0, this.brandsPortionSize);
          this.brandsPortionPage = 1;
        })
      },
      handleBrandsSearch(fromIndex = 0) {
        const results = [];
        const searchQuery = this.brandsSearchQuery;

        for (let i = fromIndex; i < this.loadedBrands.length && results.length < this.brandsPortionSize; i++) {
          const loadedName = this.loadedBrands[i].brand.toLowerCase();
          const _searchQuery = searchQuery.toLowerCase();
          if (loadedName.indexOf(_searchQuery) > -1 && !this.brandOptions.find(e => e.brand.toLowerCase() === loadedName)) {
            results.push(this.loadedBrands[i]);
          }

          if (results.length === this.brandsPortionPage) {
            this.brandsPortionPage = parseInt(String(i / this.brandsPortionSize));
          }
        }

        return results;
      },
      handleSearchChange(searchQuery) {
        this.brandsSearchQuery = searchQuery;
        this.brandOptions = [];
        this.$nextTick(() => {
          this.brandOptions = this.handleBrandsSearch();
        });
      },

      async handleSaveBtn() {
        if (!this.$validationProviderIsValid(this.$refs.secondStepProvider)) {
          return;
        }

        const service = new TrackingService();
        const result = await service.createUpdateGroup(
          this.selectedGroup,
          this.selectedType === ADD_BY_GOODS ? [this.foundedProduct.articul] : this.selectedBrands,
          this.selectedType === ADD_BY_BRAND
        );

        if (result) {
          this[SHOW_MODAL_MUTATION]({component: Warning});
          this[SET_MODAL_RESPONSE_MUTATION]('Товары добавлены')
          await this.$store.dispatch(`tracking/${LOAD_GROUPS_ACTION}`);
          // await this.$store.commit(`modal/${HIDE_MODAL_MUTATION}`);
          if (this.$route.fullPath !== this.$router.resolve({
            name: 'tracking.group',
            params: {name: this.selectedGroup.toUpperCase()}
          }).route.fullPath) {
            await this.$router.push({name: 'tracking.group', params: {name: this.selectedGroup.toUpperCase()}});
          } else {
            this.$eventBus.$emit('tracking.group.loadGoods');
          }
        } else {
          this[SHOW_MODAL_MUTATION]({component: Warning});
          this[SET_MODAL_RESPONSE_MUTATION]('Произошла ошибка')
        }
      },

      ...mapMutations('modal', [SET_MODAL_RESPONSE_MUTATION]),
      ...mapMutations('modal', [SHOW_MODAL_MUTATION])
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