<template>
  <TreeSelect
    :error="$getValidationError(errors)"
    :value="value"
    @input="data=>$emit('input', data)"
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
</template>

<script>
  import TreeSelect from "./TreeSelect";
  import {TrackingService} from "../services/tracking_service";

  export default {
    name: "BrandsSelector",
    components: {TreeSelect},
    props: {
      errors: {
        type: Array,
        default: () => []
      },
      value: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        loadedBrands: null,
        brandOptions: null,

        brandsPortionPage: 1,
        brandsPortionSize: 30,
        brandsSearchQuery: '',
      }
    },
    methods: {
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
    }
  }
</script>

<style scoped>

</style>