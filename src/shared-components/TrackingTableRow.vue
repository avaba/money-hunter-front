<template>
  <Fragment>
    <tr class="tracking-table__row" :class="{'tracking-table__row_open': rowOpened}" @click="rowOpened=!rowOpened">
      <td class="tracking-table__cell"
          :class="{[item.clazz]: true, 'tracking-table__cell_open': idx===0 && rowOpened, 'tracking-table__cell_dropdown': idx===0 && !rowOpened}"
          v-for="(item, idx) in list"
          :key="idx">
        <component v-bind:is="item.content" v-if="typeof item.content==='object'"/>
        <template v-else>{{item.content}}</template>
      </td>
    </tr>
    <tr class="tracking-table-dropdown tracking-table__row_open" v-if="nested!==null && rowOpened">
      <td class="tracking-table-dropdown__item" :colspan="list.length">
        <ProductNestedSizesTable/>
      </td>
    </tr>
  </Fragment>
</template>

<script>
  import {Fragment} from 'vue-fragment';
  import ProductNestedSizesTable from "@/components/tracking-table/ProductNestedSizesTable";
  import ProductContent from "../components/tracking-table/ProductContent";
  import ProductPrice from "../components/tracking-table/ProductPrice";
  import ProductRating from "../components/tracking-table/ProductRating";
  import ProductAction from "../components/tracking-table/ProductAction";

  export default {
    name: "TrackingTableRow",
    components: {ProductNestedSizesTable, Fragment},
    props: {
      nested: {
        type: Object,
        default: () => null,
      }
    },
    data() {
      return {
        rowOpened: false,
        list: [
          {content: ProductContent, clazz: 'width30'},
          {content: ProductPrice, clazz: 'width10'},
          {content: ProductRating},
          {content: 1},
          {content: 1},
          {content: 0},
          {content: 0},
          {content: 3},
          {content: ProductAction}
        ],
      };
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .width30 {
    width: 30%;
  }

  .width10 {
    width: 10%;
  }

  .tracking-table__row {
  }

  .tracking-table__row_open {
    background: $gray3;
  }

  .tracking-table__cell {
    border-top: 1px solid $drayDevider;
    padding: 1.71rem .5rem;
    text-align: center;
    letter-spacing: .2px;

    &.tracking-table__cell_dropdown {
      background: url("../assets/img/ikons/tracking-open.svg") no-repeat .71rem center;
    }

    &.tracking-table__cell_open {
      background: url("../assets/img/ikons/tracking-close.svg") no-repeat .71rem center;
    }

    &:first-child {
      padding-left: 1.64rem;
    }

    &:last-child {
      padding-right: .78rem;
    }
  }

  .tracking-table-dropdown__item {
    padding-bottom: 1.28rem;

    &:first-child {
      padding-left: 1.64rem;
    }

    div {
      display: flex;
    }
  }

  .tracking-table-dropdown {
  }
</style>