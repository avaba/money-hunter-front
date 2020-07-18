<template>
  <Modal title="Добавить товар" closable>
    <template v-slot:logo><span/></template>
    <template v-slot:default>

      <div>types:
        <div v-for="(item, idx) in addTypes"
             :key="idx"
             @click="selectedType=item"
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

      <form action="" class="modal-form">
        <template v-if="!firstDone">

          <template v-if="selectedType==='byGoods'">
            <div class="modal-form__save-project">
              <InputField label="Введите артикул товара"/>
            </div>
          </template>

          <TreeSelect v-else
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

          <div class="modal-form__submit-item">
            <Btn label="Далее" type="button" @click="firstDone=true"/>
          </div>
        </template>
        <template v-if="firstDone">
          <div class="modal-form-category">
            <label for="" class="input-field__label">
              Выберите группу из списка
            </label>
            <div class="modal-form__category-list">
              <div class="radio-item"><input type="radio"><label for="">Брюки</label></div>
              <div class="radio-item"><input type="radio"><label for="">Комбинезоны</label></div>
              <div class="radio-item"><input type="radio"><label for="">Верхняя одежда</label></div>
              <div class="radio-item"><input type="radio"><label for="">Джинсы</label></div>
              <div class="radio-item"><input type="radio"><label for="">Домашняя одежда</label></div>
              <div class="radio-item"><input type="radio"><label for="">Майки</label></div>
              <div class="radio-item"><input type="radio"><label for="">Нижнее белье</label></div>
              <div class="radio-item"><input type="radio"><label for="">Носки и гетры</label></div>
              <div class="radio-item"><input type="radio"><label for="">Одежда больших размеров</label></div>
              <div class="radio-item"><input type="radio"><label for="">Пиджаки и костюмы</label></div>
              <div class="radio-item"><input type="radio"><label for="">Плавки и шорты для плавания</label></div>
              <div class="radio-item"><input type="radio"><label for="">Нижнее белье</label></div>
              <div class="radio-item"><input type="radio"><label for="">Носки и гетры</label></div>
              <div class="radio-item"><input type="radio"><label for="">Одежда больших размеров</label></div>
              <div class="radio-item"><input type="radio"><label for="">Пиджаки и костюмы</label></div>
              <div class="radio-item"><input type="radio"><label for="">Плавки и шорты для плавания</label></div>
              <div class="radio-item">
                <input type="radio">
                <input type="text" class="input-field__input" placeholder="Название новой группы">
              </div>
            </div>
          </div>

          <div class="modal-form__double-submit modal-form__double-submit_save-project">
            <div class="modal-form__double-submit-item">
              <Btn label="Назад" clazz="button_gray" @click="firstDone=false"/>
            </div>
            <div class="modal-form__double-submit-item">
              <Btn label="Сохранить"/>
            </div>
          </div>
        </template>
      </form>

    </template>
  </Modal>
</template>

<script>
  import Modal from "@/components/Modal";
  import Btn from "@/shared-components/Btn";
  import InputField from "@/shared-components/InputField";
  import TreeSelect from "@/shared-components/TreeSelect";
  import {TrackingService} from "@/services/tracking_service";

  const ADD_BY_GOODS = 'byGoods';
  const ADD_BY_BRAND = 'byBrand';

  export default {
    name: "AddGoodsPosition",
    components: {TreeSelect, InputField, Modal, Btn},
    data() {
      return {
        firstDone: false,
        addTypes: [ADD_BY_GOODS, ADD_BY_BRAND],
        selectedType: ADD_BY_GOODS,
        loadedBrands: null,

        brandOptions: null,

        brandsPortionPage: 1,
        brandsPortionSize: 30,
        brandsSearchQuery: '',

        selectedBrands: [],
      }
    },
    computed: {
      firstStepName() {
        return this.selectedType === ADD_BY_GOODS
          ? 'Добавить товар'
          : 'Добавить бренд';
      }
    },
    methods: {
      translatedType(type) {
        return type === ADD_BY_GOODS ? 'По одному' : 'Бренд';
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
            this.brandsPortionPage = parseInt(i / this.brandsPortionSize);
          }
        }

        return results;
      },
      handleSearchChange(searchQuery) {
        this.brandsSearchQuery = searchQuery;
        this.$nextTick(() => {
          this.brandOptions = this.handleBrandsSearch();
        });
      }
    }
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