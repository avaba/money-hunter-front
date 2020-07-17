<template>
  <div class="select-field">
    <label for="" class="select-field__label">{{label}}</label>
    <VendorTreeSelect v-model="value" :multiple="true" :options="options" class="select-field__select" :always-open="true">

            <template v-slot:option-label="{ node, labelClassName }">
              <label :class="{
                'categories__item': node.isRootNode,
                [labelClassName]: true,
                'categories__sub-categories-item': node.isLeaf}
              ">
                <a href="#" :class="{'categories__link': node.isBranch, 'categories__link_open': node.isExpanded}">
                  {{ node.isBranch ? 'Branch' : 'Leaf' }}: {{ node.label }}
                </a>
              </label>
            </template>

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
    },
    data() {
      return {
        // define the default value
        value: null,
        // define options
        options: [
          {
            id: 'a',
            label: 'Спортивная одежда',
            children: [
              {
                id: 'aa',
                label: 'Кеды',
              },
              {
                id: 'ab',
                label: 'Шорты',
              },
              {
                id: 'ac',
                label: 'футболки',
              },
              {
                id: 'ad',
                label: 'носки',
              },
            ],
          },
          {
            id: 'b',
            label: 'Кепки',
          },
          {
            id: 'c',
            label: 'Костюмы',
          }
        ],
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";


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