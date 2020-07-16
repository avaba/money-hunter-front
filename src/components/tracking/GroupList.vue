<template>
  <div class="tracking-body">
    <div class="tracking-info">
      <div class="tracking-add-product">
        <Btn clazz="button_add" label="Добавить товары"/>
      </div>
      <div class="tracking-actions">
        <RowWithIcon/>
      </div>
    </div>

    <TrackingTable :headers="tableHeaders" :items="tableData" :order="orderType" :order-handler="$orderHandler"/>

  </div>
</template>

<script>
  import Btn from "@/shared-components/Btn";
  import RowWithIcon from "@/shared-components/RowWithIcon";
  import TrackingTable from "@/shared-components/TrackingTable";
  import ProductAction from "@/components/tracking-table/ProductAction";
  import {orderHandler} from "@/extenders/mixins/order_handler";
  import ProductPrice from "@/components/tracking-table/ProductPrice";
  import {tableMixins} from "@/extenders/mixins/table_mixins";

  export default {
    name: "Groups",
    components: {Btn, RowWithIcon, TrackingTable},
    mixins: [orderHandler, tableMixins],
    data() {
      return {
        tableHeaders: [
          {name: 'groups', label: 'Группы', clazz: 'width23', sortable: false},
          {
            name: 'goods_amount',
            label: 'Количество товаров',
            clazz: 'width23 tracking-table__header-item_align-center',
          },
          {
            name: 'orders_amount',
            label: 'Сумма заказов/шт.',
            clazz: 'width23 tracking-table__header-item_align-center'
          },
          {name: 'orders_sum', label: 'Сумма заказов/руб.', clazz: 'width23 tracking-table__header-item_align-center'},
          {
            name: 'actions',
            label: 'Действия',
            clazz: 'width5 tracking-table__header-item_align-center',
            sortable: false
          },
        ],
        tableData: [
          {
            groups: {content: 'Футболки', clazz: 'width23'},
            goods_amount: {content: 78, clazz: 'width23 tracking-table__align-center'},
            orders_amount: {content: 13, clazz: 'width23 tracking-table__align-center'},
            orders_sum: {
              content: ProductPrice,
              component_data: {price: 100},
              clazz: 'width23 tracking-table__align-center'
            },
            actions: {content: ProductAction, clazz: 'width5 tracking-table__align-center'}
          },
          {
            groups: {content: 'Футболки', clazz: 'width23'},
            goods_amount: {content: 45, clazz: 'width23 tracking-table__align-center'},
            orders_amount: {content: 369, clazz: 'width23 tracking-table__align-center'},
            orders_sum: {
              content: ProductPrice,
              component_data: {price: 100500},
              clazz: 'width23 tracking-table__align-center'
            },
            actions: {content: ProductAction, clazz: 'width5 tracking-table__align-center'}
          },
          {
            groups: {content: 'Футболки', clazz: 'width23'},
            goods_amount: {content: 78, clazz: 'width23 tracking-table__align-center'},
            orders_amount: {content: 100, clazz: 'width23 tracking-table__align-center'},
            orders_sum: {
              content: ProductPrice,
              component_data: {price: 400},
              clazz: 'width23 tracking-table__align-center'
            },
            actions: {content: ProductAction, clazz: 'width5 tracking-table__align-center'}
          },
          {
            groups: {content: 'Футболки', clazz: 'width23'},
            goods_amount: {content: 122, clazz: 'width23 tracking-table__align-center'},
            orders_amount: {content: 369, clazz: 'width23 tracking-table__align-center'},
            orders_sum: {
              content: ProductPrice,
              component_data: {price: 0.01},
              clazz: 'width23 tracking-table__align-center'
            },
            actions: {content: ProductAction, clazz: 'width5 tracking-table__align-center'}
          },
          {
            groups: {content: 'Футболки', clazz: 'width23'},
            goods_amount: {content: 0, clazz: 'width23 tracking-table__align-center'},
            orders_amount: {content: 90, clazz: 'width23 tracking-table__align-center'},
            orders_sum: {
              content: ProductPrice,
              component_data: {price: 10},
              clazz: 'width23 tracking-table__align-center'
            },
            actions: {content: ProductAction, clazz: 'width5 tracking-table__align-center'}
          },
        ],

        orderType: 'goods_amount',
      };
    },
    computed: {
      tablePositions() {
        return this.tableData.map(item => this.$mapItemListToTableItem(item));
      }
    },
    methods: {
      directionChecker(direction, val) {
        return direction === 'asc' ? val : ~val;
      },
      sort_goods_amount(direction) {
        return (a, b) => this.directionChecker(direction, a.goods_amount.content - b.goods_amount.content);
      },
      sort_orders_amount(direction) {
        return (a, b) => this.directionChecker(direction, a.orders_amount.content - b.orders_amount.content);
      },
      sort_orders_sum(direction) {
        return (a, b) => this.directionChecker(direction, a.orders_sum.component_data.price - b.orders_sum.component_data.price);
      }
    },
    watch: {
      orderType: function (n) {
        const direction = n.startsWith('-') ? 'desc' : 'asc';
        const type = n.startsWith('-') ? n.substr(1) : n;

        this.tableData.sort(this[`sort_${type}`](direction));
      }
    }
  }
</script>


<style scoped lang="scss">
  @import "../../assets/scss/variables";

  .tracking-body {
    background: white;
    border: 1px solid $drayDevider;
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
</style>