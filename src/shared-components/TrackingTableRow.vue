<template>
  <Fragment>
    <tr class="tracking-table__row" 
      :class="{'tracking-table__row_open': rowOpened}"
      @click="open" 
      :style="mappedList[0].linkTo === 'articul' ? 'cursor: pointer' : false" 
      @mousedown="mappedList[0].linkTo === 'articul' ? linkTo(mappedList[1].content) : false">
      <td class="tracking-table__cell"
          :class=" {[headerWidth[idx].status]: headerWidth[idx].status, 
          [headerWidth[idx].clazz]: headerWidth[idx].clazz, 
          [item.clazz]: item.clazz, 
          'tracking-table__cell_open': isCellOpen(idx), 
          'tracking-table__cell_dropdown': isCellDropDown(idx)}"
          :style="{cursor: item.onClick ? 'pointer' : 'inherit'}"
          v-for="(item, idx) in mappedList"
          @click.exact="item.onClick ? item.onClick(item) : ()=>{}"
          :key="idx">
        <component v-bind:is="item.content" v-if="typeof item.content==='object'" v-bind="item.component_data"/>
        <!-- <template v-else>{{item.content}}</template> -->
        <template v-else>
           <div v-if="item.image" class="product-photo row-with-photo"><img :src="item.image" alt="">{{ formattingNum(item) }}</div>
           <span v-else>{{ formattingNum(item) }}</span>
        </template>
      </td>
    </tr>
    <tr class="tracking-table-dropdown tracking-table__row_open" v-if="rowData.nested && rowOpened">
      <td class="tracking-table-dropdown__item" :colspan="mappedList.length">
        <div :class="rowData.nested.clazz || ''">
          <component v-bind:is="getNested(rowData.nested)" v-bind="rowData.nested"/>
        </div>
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
      headerWidth: {
        type: Array,
        required: false
      }
    },
    data() {
      return {
        rowOpened: false,
      };
    },
    computed: {
      mappedList() {
        const result = [];

        this.headerKeys.forEach(name => result.push({...this.rowData[name], name: name}));

        return result;
      }
    },
    methods: {
      getNested(nested) {
        if (nested.content) {
          return nested.content;
        }
        return nested;
      },
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
      },
      formattingNum(n) {
        if(n.name !== 'articul' && n.name !== 'name') {
          return n.content.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        } else {
          return n.content
        }
      },
      linkTo(articul) {
        this.$router.push({name: 'trackingPositions.group', params: {name: articul}});
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  // .width5 {
  //   width: 5%;
  // }

  // .width9 {
  //   width: 9%;
  //   white-space: nowrap;
  // }

  // .width23 {
  //   width: 23%;
  // }

  // .width30 {
  //   width: 30%;
  // }

  // .width10 {
  //   width: 10%;
  // }

  // .width25 {
  //   width: 25%;
  // }

  .hidden {
    display: none;
  }

  .mw400 {
    min-width: 400px;
    max-width: 400px;
  }

  .mw300 {
    min-width: 300px;
    max-width: 300px;
  }

  .mw200 {
    min-width: 200px;
    max-width: 200px;
  }

  .mw150 {
    min-width: 150px;
    max-width: 150px;
  }

  .mw100 {
    min-width: 100px;
    max-width: 100px;
  }

  .mw50 {
    min-width: 50px;
    max-width: 50px;
  }

  .tracking-table {
    // width: 100%;
  }

  .tracking-table__row {
    // width: 100%;
    min-width: 910px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid $drayDevider;
    @media screen and (max-width: 1400px) {
      & .tracking-table__cell {
        font-size: 12px;
      }
    }
  }

  .tracking-table__row_open {
    background: $gray3;
  }

  .positive {
    color:#0ad406;
  }

  .negative {
    color: #ff0303;
  }

  .tracking-table__cell {
    // border-top: 1px solid $drayDevider;
    // padding: 1.71rem .5rem 1.71rem 20px;
    // padding: 1.85rem 1.21rem;
    // padding: 15px 15px 15px 15px;
    // padding-left: 1.21rem;
    // padding: 15px 15px 15px 5px;
    padding: 15px 5px 15px 5px;
    text-align: right;
    letter-spacing: .2px;
    box-sizing: border-box;
    &.width5 {
      white-space: nowrap;
    }
    &.tracking-table__align-center {
      text-align: center;
      padding-left: 0;
      padding-right: 10px;
    }
    &.tracking-table__align-left {
      text-align: left;
      padding-right: 10px;
      &.pl-35 {
        padding-left: 35px !important;
      }
      &.pr-35 {
        padding-left: 35px !important;
      }
    }

    &.tracking-table__cell_dropdown {
      background: url("../assets/img/ikons/tracking-open.svg") no-repeat .71rem center;
    }

    &.tracking-table__cell_open {
      background: url("../assets/img/ikons/tracking-close.svg") no-repeat .71rem center;
    }

    // &:first-child {
    //   padding-left: 1.64rem;
    // }

    // &:last-child {
    //   padding-right: .78rem;
    // }
    &:first-child {
      padding-left: 35px;
    }

    &:last-child {
      padding-right: 35px;
    }
  }

  .tracking-table-dropdown__item {
    padding-bottom: 1.28rem;

    &:first-child {
      padding-left: 1.64rem;
    }

    div {
      display: flex;

      &.tracking-table-dropdown__item-chart {
        justify-content: center;
      }

      /* для charts js - либа генерит div*/
      /deep/ & .chartjs-render-monitor {
        background-color: white;
      }

      /deep/ & .chartjs-render-monitor {
        width: 650px !important;
        height: 240px !important;
        margin: 0px auto !important;
      }
    }
  }

  .row-with-photo {
    display: flex;
    align-items: center;
    & img {
      margin-right: 15px;
    }
  }
</style>