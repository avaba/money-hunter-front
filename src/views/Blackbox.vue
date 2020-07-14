<template>
  <Fragment>
    <FilterBlock/>

    <div class="blackbox">
      <TrackingTable :headers="tableHeaders" :items="tableItems" class=""/>
    </div>
  </Fragment>
</template>

<script>
  import FilterBlock from "@/components/FilterBlock";
  import {Fragment} from 'vue-fragment';
  import TrackingTable from "@/shared-components/TrackingTable";
  import ProductContent from "@/components/tracking-table/ProductContent";
  import ProductRating from "@/components/tracking-table/ProductRating";

  export default {
    name: "Blackbox",
    components: {TrackingTable, FilterBlock, Fragment},
    data() {
      return {
        tableHeaders: [
          {name: 'goods', label: 'Товар', clazz: 'width30', sortable: false},
          {name: 'vendor_code', label: 'Артикул', sortable: false},
          {name: 'price', label: 'Цена'},
          {name: 'remains', label: 'Остаток'},
          {name: 'orders_in_day', label: 'Заказов в день'},
          {name: 'profit_in_dat', label: 'Доход в день'},
          {name: 'rating', label: 'Рейтинг'},
          {name: 'feedback_amount', label: 'Кол-во отзывов'},
          {name: 'add', label: 'Добавить в мои товары', sortable: false},
        ],
        tableItems: [
          {
            goods: {content: ProductContent, clazz: 'width30'},
            vendor_code: {content: '11254837'},
            price: {content: '853 ₽'},
            remains: {content: 5},
            orders_in_day: {content: 5},
            profit_in_dat: {content: 5},
            rating: {content: ProductRating},
            feedback_amount: {content: 5},
            add: {content: 'add'},
          },
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables";

  .blackbox {
    margin: 1.42rem 2.28rem 0;
    background: white;
    border: 1px solid $drayDevider;
  }

</style>