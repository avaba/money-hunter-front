<template>
  <div class="tracking-body">
    <div class="tracking-info">
      <div class="tracking-add-product">
        <AddGoodsPositionsBtn/>
      </div>
      <div class="tracking-actions">
        <RowWithIcon/>
      </div>
    </div>

    <TrackingTable v-if="tablePositions && loaded"
                   :headers="tableHeaders"
                   :items="tablePositions"
                   :order="orderType"
                   :order-handler="$orderHandler"/>

  </div>
</template>

<script>
  import RowWithIcon from "@/shared-components/RowWithIcon";
  import TrackingTable from "@/shared-components/TrackingTable";
  // import ProductAction from "@/components/tracking-table/ProductAction";
  import {orderHandler} from "@/extenders/mixins/order_handler";
  // import ProductPrice from "@/components/tracking-table/ProductPrice";
  import {tableMixins} from "@/extenders/mixins/table_mixins";
  import {mapState, mapActions} from "vuex";
  import {POSITION_GETTER} from "@/store/modules/trackingPositions/constants";
  import AddGoodsPositionsBtn from "@/shared-components/AddGoodsPositionsBtn";
  import {LOAD_POSITIONS_ACTION} from "@/store/modules/trackingPositions/constants";
  // import AddGoodsBtn from "@/shared-components/AddGoodsBtn";

  // import {UserService} from "@/services/user_service";

  export default {
    name: "Groups",
    // components: {AddGoodsBtn, RowWithIcon, TrackingTable},
    components: {RowWithIcon, TrackingTable, AddGoodsPositionsBtn},
    mixins: [orderHandler, tableMixins],
    data() {
      return {
        tableHeaders: [
          {name: 'name', label: 'Название', clazz: 'width23', sortable: false},
          {
            name: 'articul',
            label: 'Артикул',
            clazz: 'width23 tracking-table__header-item_align-center',
          },
          {
            name: 'categories',
            label: 'Кол-во категорий',
            clazz: 'width23 tracking-table__header-item_align-center'
          },
        ],

        tablePositions: null,

        orderType: 'articul',

        progress: 0,

        isLoaded: false,

        loaded: false
      };
    },
    computed: {
      ...mapState('trackingPositions', ['positions']),
      mySubscription() {
        return this.$store.getters['user/getSubscription'].subscriptionType
      },
      positions() {
        return this.$store.getters[`trackingPositions/${POSITION_GETTER}`]
      }
    },
    methods: {
      ...mapActions('trackingPositions', [LOAD_POSITIONS_ACTION]),
    },
    mounted() {
      this.loaded = false
      this.tablePositions = this.positions.map(item => {
        return {
          name: {
            clazz: "tracking-table__align-left width23",
            content: item.name,
            linkTo: 'articul'
          },
          articul: {
            clazz: "tracking-table__align-center width23",
            content: item.articul
          },
          categories: {
            clazz: "tracking-table__align-center width23",
            content: item.categories_count
          },
        }
      })
      this.loaded = true
    },
    watch: {
      orderType: function () {
        const positions = this.tablePositions
        if (this.orderType[0] !== '-') {
          positions.sort((prev, next) => prev[this.orderType].content - next[this.orderType].content)
        } else {
          positions.sort((prev, next) => next[this.orderType.substr(1)].content - prev[this.orderType.substr(1)].content)
        }
        this.tablePositions = positions
      }, 
      positions: {
        handler: function () {
          this.loaded = false
          this.tablePositions = this.positions.map(item => {
            return {
              name: {
                clazz: "tracking-table__align-left width23",
                content: "test name",
                linkTo: 'articul'
              },
              articul: {
                clazz: "tracking-table__align-center width23",
                content: item.articul
              },
              categories: {
                clazz: "tracking-table__align-center width23",
                content: item.categories_count
              },
            }
          })
          this.loaded = true
        },
        deep: true
      }
    }
  }
</script>


<style scoped lang="scss">
  @import "../../assets/scss/variables";

  .tracking-body {
    background: white;
    border: 1px solid $drayDevider;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .tracking-table-wrapper {
    flex: 1;
  }

  .tracking-info {
    padding: 1.14rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $drayDevider;
  }

  .tracking-add-product {
    width: 11.85rem;
  }

  .tracking-actions {
    flex: 1 0 auto;
    margin-left: 2.14em;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 800px) {
    .tracking-info {
      flex-wrap: wrap;
    }
    .progressBar {
      max-width: 100% !important;
      margin-top: 15px;
    }
  }
</style>