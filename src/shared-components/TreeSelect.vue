<template>
  <div class="select-field">
    <label for="" class="select-field__label">{{label}}</label>
    <span class="select-field__error" v-if="!!error">{{error}}</span>
    <VendorTreeSelect ref="treeselect"
                      v-bind="$attrs"
                      :clear-on-select="true"
                      :value="value"
                      v-on="listeners"
                      class="select-field__select">
      <div slot="value-label" slot-scope="{ node }">{{ getValue(node) }}</div>

    </VendorTreeSelect>
  </div>
</template>

<script>
  import VendorTreeSelect from '@riophae/vue-treeselect';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';

  export default {
    name: "TreeSelect",
    components: {VendorTreeSelect},
    props: {
      label: {
        type: String,
        required: true,
      },
      value: {
        required: true,
      },
      dontUseLocalSearch: {
        type: Boolean,
        default: false,
      },
      error: {
        type: String,
        default: null
      }
    },
    computed: {
      listeners() {
        const data = {...this.$listeners};
        if (this.dontUseLocalSearch) {
          delete data['search-change'];
        }

        return data;
      }
    },
    methods: {
      getValue(node) {
        const label = node.label;
        if (label.endsWith(' (unknown)')) {
          return label.substr(0, label.lastIndexOf(' (unknown)'));
        }

        return label;
      },
      getMenu() {
        return this.$refs.treeselect.getMenu();
      },
      handleLocalSearch() {
        const origFunc = this.$refs.treeselect.handleLocalSearch;

        this.$refs.treeselect.handleLocalSearch = () => {
          if (this.dontUseLocalSearch) {
            this.$emit('search-change', this.$refs.treeselect.trigger.searchQuery);
          } else {
            origFunc.call(this.$refs.treeselect);
          }
        }

      }
    },
    mounted() {
      this.handleLocalSearch();
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .select-field__error {
    color: $red;
    letter-spacing: .2px;
  }

  .select-field {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-wrap: wrap;
  }

  .select-field__label {
    letter-spacing: .2px;
    color: $titleColor;
    font-weight: bold;
    display: block;
  }

  .select-field__select {
    flex: 1 0 100%;
    display: block;
    margin-top: 5px;
  }

  .categories__link {
    padding: 8px 14px;
    display: block;
    background: url("../assets/img/ikons/categories-open.svg") no-repeat calc(100% - 12px) center;
    transition: all ease-in .2s;

    &:hover {
      background: url("../assets/img/ikons/categories-open.svg") no-repeat calc(100% - 12px) center, $yellow;
    }
  }

  .categories__link_open, .categories__link_open:hover {
    background: url("../assets/img/ikons/categories-close.svg") no-repeat calc(100% - 12px) center, $yellow;
  }

  .categories__sub-categories-item {
    padding: 7px 14px 7px 30px;
    transition: all ease-in .2s;

    &:hover {
      background: #EFF6FD;

      span {
        color: $blue;
      }
    }

    label {
      display: flex;
      align-items: center;
    }

    input {
      margin-right: 10px;
    }

    span {
      color: #9FA2B4;
      letter-spacing: .2px;
      transition: all ease-in .2s;
    }
  }
</style>