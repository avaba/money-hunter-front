<template>
  <div class="tracking-table-wrapper">
    <tr v-if="subheaders" class="tracking-table__header tracking-table__header-subheader">
        <th v-for="item in subheaders" :key="item.name" class="tracking-table__header-item" :class="item.clazz || ''">
          <div v-show="false">
            <span :class="{'tracking-table__header-label': isSortable(item)}"
                  @click="headerClickHandler(item)">{{item.label}}</span>
            <Btn v-if="isSortable(item) && getSortClass(item)"
                 @click="headerClickHandler(item)"
                 without-default-class
                 :clazz="`tracking-table__sort ${getSortClass(item)}`"/>
          </div>
          <span v-if="item.subheader && item.subHeaderValue" class="tracking-table__header-item-subheader">{{ item.subheader }}: <span>{{ item.subHeaderValue }}</span></span>
        </th>
      </tr>
    <table class="tracking-table tracking-table_sticky">
      <tr class="tracking-table__header">
        <th v-for="item in headers" :key="item.name" class="tracking-table__header-item" :class="item.clazz || ''">
          <div>
            <span :class="{'tracking-table__header-label': isSortable(item)}"
                  @click="headerClickHandler(item)">{{item.label}}</span>
            <Btn v-if="isSortable(item) && getSortClass(item)"
                 @click="headerClickHandler(item)"
                 without-default-class
                 :clazz="`tracking-table__sort ${getSortClass(item)}`"/>
          </div>
          <!-- <span v-if="item.subheader && item.subheaderValue" class="tracking-table__header-item-subheader">{{ item.subheader }}: <span>{{ item.subheaderValue }}</span></span> -->
        </th>
      </tr>
    </table>
    <table class="tracking-table" v-if="items.length>0">
      <!-- {{ items[0].currentPrice.component_data.price }} -->
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
        required: false,
      },
      orderHandler: {
        type: Function,
        required: false,
      },
      subheaders: {
        type: Object,
        required: false
      }
    },
    data() {
      return {}
    },
    computed: {
      // subheaders() {
      //   return this.headers.filter(item => item.subheader)
      // }
    },
    methods: {
      isSortable(item) {
        return item.sortable || item.sortable === undefined;
      },
      getSortClass(item) {
        if (this.order === `-${item.name}`) return 'tracking-table__sort_up';
        if (this.order === item.name) return 'tracking-table__sort_down';
        return null;
      },
      headerClickHandler(item) {
        if (this.order === item.name && item.isOnlyAscSorting) {
          return;
        }
        if (this.isSortable(item)) {
          this.orderHandler(item.name);
        }
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .width5{
    width: 5%;
  }

  .width9{
    width: 9%;
  }

  .width23{
    width: 23%;
  }

  .width30 {
    width: 30%;
  }

  .width10 {
    width: 10%;
  }

  .width25 {
    width: 100%;
  }

  .tracking-table-wrapper {
    flex: 1;
    box-sizing: border-box;
    & * {
      box-sizing: border-box;
    }
    // width: 1500px !important;
  }

  .tracking-table {
    width: 100%;
    border-spacing: 0;
    & * {
      box-sizing: border-box;
    }

    &.tracking-table_sticky {
      position: sticky;
      max-width: 100%;
      width: 100%;
      top: 0px;
      z-index: 2;
    }
  }

  .tracking-table__header {
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: white;
    top: 0px;
    width: 100%;
    padding: 0px 10px;
    // height: 95px;
  }

  .tracking-table__header-subheader {
    position: static;
    display: flex;
    justify-content: center;
    // border-bottom: 1px solid #DFE0EB;
    & .tracking-table__header-item {
      min-width: 120px;
      border-bottom: 1px solid #DFE0EB;
      padding: 10px 5px !important;
      margin: 0px 5px;
    }
  }

  .tracking-table__header-label {
    cursor: pointer;
  }

  .tracking-table__header-item {
    text-align: right;
    // padding: 1.85rem 1.21rem;
    padding: 10px 10px 10px 5px;
    background: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 1;
    &.pl-15 {
      padding-left: 25px !important;
    }
    &.pr-15 {
      padding-right: 25px !important;
    }
    & * {
      text-align: right;
      
        justify-content: flex-end;
    }
    & div {
      // height: 40px
    }

    &.tracking-table__header-item_align-center {

      div {
        justify-content: center;
      }
    }

    &.tracking-table__header-item_align-left {

      div {
        justify-content: flex-start;
      }
    }


    &.tracking-table__header-item_align-right {

      div {
        justify-content: flex-end;
      }
    }

    &:first-child {
      padding-left: 25px;
      justify-content: flex-start;
      & * {
        justify-content: flex-start;
      }
    }

    &:last-child {
      padding-right: 25px;
    }

    // &:first-child {
    //   padding-left: 1.64rem;
    // }

    // &:last-child {
    //   padding-right: .78rem;
    // }

    div {
      display: flex;
      align-items: center;
      width: 100%;
    }

    span {
      color: $titleColor;
      letter-spacing: .2px;
      // line-height: 1rem;
      font-weight: 500;
    }
    .tracking-table__header-item-subheader {
      font-weight: 300;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      line-height: .8;
      font-size: 12px;
      height: 35px;
      & span {
        color: #000;
        font-weight: 500;
        display: block;
        line-height: 1;
        font-size: 14px;
      }
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

  @media screen and (max-width: 1400px) {
      .tracking-table__header-label {
        font-size: 12px;
        line-height: 12px;
      }
      .tracking-table__header-item {
        font-size: 12px !important;
        line-height: 12px;
      }
    }
  @media screen and (max-width: 1300px) {
    .tracking-table-wrapper {
      overflow-x: auto;
      max-width: 100%;
      width: 100%;
      & .tracking-table {
        width: 1140px;
      }
    }
  }
</style>