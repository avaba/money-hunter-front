<template>
  <div class="tracking-table-wrapper">
    <table class="tracking-table tracking-table_sticky">
      <tr class="tracking-table__header">
        <th v-for="item in headers" :key="item.name" class="tracking-table__header-item" :class="item.clazz || ''">
          <div>
            <span :class="{'tracking-table__header-label': isSortable(item)}"
                  @click="headerClickHandler(item)">{{item.label}}</span>
            <Btn v-if="isSortable(item) && getSortClass(item)"
                 @click="orderHandler(item.name)"
                 without-default-class
                 :clazz="`tracking-table__sort ${getSortClass(item)}`"/>
          </div>
        </th>
      </tr>
    </table>
    <table class="tracking-table" v-if="items.length>0">
      <TrackingTableRow :row-data="item" :header-keys="headers.map(h=>h.name)" v-for="(item, idx) in items" :key="idx"/>
    </table>
  </div>
</template>

<script>
  import Btn from "@/shared-components/Btn";
  import TrackingTableRow from "@/shared-components/TrackingTableRow";

  export default {
    name: "TrackingTable",
    components: {TrackingTableRow, Btn},
    props: {
      headers: {
        type: Array,
        required: true
      },
      items: {
        type: Array,
        required: true,
      },
      order: {
        type: String,
        required: true,
      },
      orderHandler: {
        type: Function,
        required: true,
      }
    },
    data() {
      return {}
    },
    methods: {
      isSortable(item) {
        return item.sortable || item.sortable === undefined;
      },
      getSortClass(item) {
        if (this.order === item.name) return 'tracking-table__sort_up';
        if (this.order === `-${item.name}`) return 'tracking-table__sort_down';

        return null;
      },
      headerClickHandler(item) {
        if (this.isSortable(item)) {
          this.orderHandler(item.name);
        }
      }
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

  .tracking-table-wrapper {
  }

  .tracking-table {
    width: 100%;
    border-spacing: 0;

    &.tracking-table_sticky {
      position: sticky;
      top: 0px;
      z-index: 2;
    }
  }

  .tracking-table__header {
    position: sticky;
    top: 0px;
  }

  .tracking-table__header-label {
    cursor: pointer;
  }

  .tracking-table__header-item {
    text-align: left;
    padding: 1.85rem 1.21rem;
    background: white;

    &.tracking-table__header-item_align-center {

      div {
        justify-content: center;
      }
    }

    &:first-child {
      padding-left: 1.64rem;
    }

    &:last-child {
      padding-right: .78rem;
    }

    div {
      display: flex;
      align-items: center;
    }

    span {
      color: $titleColor;
      letter-spacing: .2px;
      font-weight: 500;
    }
  }

  .tracking-table__sort {
    flex: 0 0 1.14rem;
    height: 1.14rem;
    margin-left: .42rem;

    &.tracking-table__sort_down {
      background: url("../assets/img/ikons/sort-down.svg") no-repeat;
    }

    &.tracking-table__sort_up {
      background: url("../assets/img/ikons/sort-up.svg") no-repeat;
    }
  }
</style>