<template>
  <div class="tracking-body">
    <div class="tracking-info">
      <div class="tracking-add-product">
        <AddGoodsBtn/>
      </div>
      <div class="tracking-actions">
        <RowWithIcon/>
      </div>
    </div>

    <TrackingTable v-if="tablePositions"
                   :headers="tableHeaders"
                   :items="tablePositions"
                   :order="orderType"
                   :order-handler="$orderHandler"/>

  </div>
</template>

<script>
  import RowWithIcon from "@/shared-components/RowWithIcon";
  import TrackingTable from "@/shared-components/TrackingTable";
  import ProductAction from "@/components/tracking-table/ProductAction";
  import {orderHandler} from "@/extenders/mixins/order_handler";
  import ProductPrice from "@/components/tracking-table/ProductPrice";
  import {tableMixins} from "@/extenders/mixins/table_mixins";
  import {mapState} from "vuex";
  import {GROUPS_SORTED_BY_GETTER} from "@/store/modules/tracking/constants";
  import AddGoodsBtn from "@/shared-components/AddGoodsBtn";

  export default {
    name: "Groups",
    components: {AddGoodsBtn, RowWithIcon, TrackingTable},
    mixins: [orderHandler, tableMixins],
    data() {
      return {
        tableHeaders: [
          {name: 'name', label: 'Группы', clazz: 'width23', sortable: false},
          {
            name: 'count',
            label: 'Количество товаров',
            clazz: 'width23 tracking-table__header-item_align-center',
          },
          {
            name: 'orders',
            label: 'Сумма заказов/шт.',
            clazz: 'width23 tracking-table__header-item_align-center'
          },
          {name: 'revenue', label: 'Сумма заказов/руб.', clazz: 'width23 tracking-table__header-item_align-center'},
        ],

        orderType: 'count',
      };
    },
    computed: {
      tablePositions() {
        return this.groupsSortedBy.map(item => this.$mapItemListToTableItem(item));
      },
      groupsSortedBy() {
        return this.$store.getters[`tracking/${GROUPS_SORTED_BY_GETTER}`](this.orderType);
      },
      ...mapState('tracking', ['groups']),
    },
    methods: {
      map_name(item) {
        return {
          content: item.name,
          clazz: 'width23 pl-35 tracking-table__align-left',
          onClick: ({content}) => this.$router.push({name: 'tracking.group', params: {name: content}})
        }
      },
      map_count: item => ({content: item.details.count, clazz: 'tracking-table__align-center width23'}),
      map_orders: item => ({content: item.details.orders, clazz: 'tracking-table__align-center width23'}),
      map_revenue: item => ({
        content: ProductPrice,
        component_data: {price: item.details.revenue},
        clazz: 'tracking-table__align-center width23'
      })
    },
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