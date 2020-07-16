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

    <TrackingTable :headers="tableHeaders" :items="tableData"/>

  </div>
</template>

<script>
  import Btn from "@/shared-components/Btn";
  import RowWithIcon from "@/shared-components/RowWithIcon";
  import TrackingTable from "@/shared-components/TrackingTable";
  import ProductAction from "@/components/tracking-table/ProductAction";

  export default {
    name: "Groups",
    components: {Btn, RowWithIcon, TrackingTable},
    data() {
      return {
        tableHeaders: [
          {name: 'groups', label: 'Группы', clazz: 'width30', sortable: false},
          {name: 'goods_amount', label: 'Количество товаров'},
          {name: 'orders_amount', label: 'Сумма заказов/шт.'},
          {name: 'orders_sum', label: 'Сумма заказов/руб.'},
          {name: 'actions', label: 'Действия', sortable: false},
        ],
        tableData: [
          {
            groups: {content: 'Футболки', clazz: 'width30'},
            goods_amount: {content: 78},
            orders_amount: {content: 369},
            orders_sum: {content: '870 670 ₽'},
            actions: {content: ProductAction}
          },
          {
            groups: {content: 'Футболки', clazz: 'width30'},
            goods_amount: {content: 78},
            orders_amount: {content: 369},
            orders_sum: {content: '870 670 ₽'},
            actions: {content: ProductAction}
          },
          {
            groups: {content: 'Футболки', clazz: 'width30'},
            goods_amount: {content: 78},
            orders_amount: {content: 369},
            orders_sum: {content: '870 670 ₽'},
            actions: {content: ProductAction}
          },
          {
            groups: {content: 'Футболки', clazz: 'width30'},
            goods_amount: {content: 78},
            orders_amount: {content: 369},
            orders_sum: {content: '870 670 ₽'},
            actions: {content: ProductAction}
          },
          {
            groups: {content: 'Футболки', clazz: 'width30'},
            goods_amount: {content: 78},
            orders_amount: {content: 369},
            orders_sum: {content: '870 670 ₽'},
            actions: {content: ProductAction}
          },
          {
            groups: {content: 'Футболки', clazz: 'width30'},
            goods_amount: {content: 78},
            orders_amount: {content: 369},
            orders_sum: {content: '870 670 ₽'},
            actions: {content: ProductAction}
          },
          {
            groups: {content: 'Футболки', clazz: 'width30'},
            goods_amount: {content: 78},
            orders_amount: {content: 369},
            orders_sum: {content: '870 670 ₽'},
            actions: {content: ProductAction}
          },
        ],
      };
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