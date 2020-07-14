<template>
  <Fragment>
    <tr class="tracking-table__row" :class="{'tracking-table__row_open': rowOpened}" @click="open">
      <td class="tracking-table__cell"
          :class="{[item.clazz]: item.clazz, 'tracking-table__cell_open': isCellOpen(idx), 'tracking-table__cell_dropdown': isCellDropDown(idx)}"
          v-for="(item, idx) in mappedList"
          :key="idx">
        <component v-bind:is="item.content" v-if="typeof item.content==='object'"/>
        <template v-else>{{item.content}}</template>
      </td>
    </tr>
    <tr class="tracking-table-dropdown tracking-table__row_open" v-if="rowData.nested && rowOpened">
      <td class="tracking-table-dropdown__item" :colspan="mappedList.length">
        <component v-bind:is="rowData.nested"/>
      </td>
    </tr>
  </Fragment>
</template>

<script>
  import {Fragment} from 'vue-fragment';

  export default {
    name: "TrackingTableRow",
    components: {Fragment},
    props: {
      rowData: {
        type: Object,
        required: true,
      },
      headerKeys: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        rowOpened: false,
      };
    },
    computed: {
      mappedList() {
        const result = [];

        this.headerKeys.forEach(name => result.push(this.rowData[name]));

        return result;
      }
    },
    methods: {
      open() {
        if (this.rowData.nested) {
          this.rowOpened = !this.rowOpened;
        }
      },
      isCellOpen(idx) {
        return idx === 0 && this.rowOpened;
      },
      isCellDropDown(idx) {
        return idx === 0 && !this.rowOpened && this.rowData.nested;
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