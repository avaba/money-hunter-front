<template>
  <Fragment>
    <FilterBlock :searchHandler="searchHandler"/>

    <div class="blackbox">
      <TrackingTable :headers="tableHeaders" :items="tablePositions" :order="orderType" :order-handler="$orderHandler.bind(this)"/>
    </div>

    <div class="block_container">
      <TrackingPagination :total-count="1000" :prev-handler="prevHandler" :next-handler="nextHandler"/>
    </div>

  </Fragment>
</template>

<script>
  import FilterBlock from "@/components/FilterBlock";
  import {Fragment} from 'vue-fragment';
  import TrackingTable from "@/shared-components/TrackingTable";
  import ProductContent from "@/components/tracking-table/ProductContent";
  import ProductRating from "@/components/tracking-table/ProductRating";
  import {tableMixins} from "@/extenders/mixins/table_mixins";
  import {BlackboxService} from "@/services/blackbox_service";
  import TrackingPagination from "@/shared-components/TrackingPagination";

  export default {
    name: "Blackbox",
    components: {TrackingPagination, TrackingTable, FilterBlock, Fragment},
    mixins: [tableMixins],
    data() {
      return {
        list: [
          {
            name: 'Футболка',
            imageLink: 'https://is4-ssl.mzstatic.com/image/thumb/Music49/v4/34/0a/b7/340ab7f9-fa74-31d7-4998-105e6f9878d0/dj.oypqltuv.jpg/44x44sr-60.jpeg',
            brand: 'Натали',
            articul: '11254837',
            currentPrice: 853,
            currentQty: 5,
            avOrdersSpeed: 5,
            avRevenue: 5,
            currentRating: 3,
            currentFeedBackCount: 5,
            add: 'add',
          }
        ],

        tableHeaders: [
          {name: 'goods', label: 'Товар', clazz: 'width30', sortable: false},
          {name: 'articul', label: 'Артикул'},
          {name: 'currentPrice', label: 'Цена'},
          {name: 'currentQty', label: 'Остаток'},
          {name: 'avOrdersSpeed', label: 'Заказов в день'},
          {name: 'avRevenue', label: 'Доход в день'},
          {name: 'currentRating', label: 'Рейтинг'},
          {name: 'currentFeedBackCount', label: 'Кол-во отзывов'},
          {name: 'add', label: 'Добавить в мои товары', sortable: false},
        ],
        orderType: 'articul',

        page: 1,
      }
    },
    computed: {
      tablePositions() {
        return this.list.map(item => this.$mapItemListToTableItem(item));
      }
    },
    methods: {
      async searchHandler() {
        const service = new BlackboxService();
      },
      prevHandler() {
        console.log('prev clicked')
      },
      nextHandler() {
        console.log('next clicked')
      },
      map_goods(item) {
        return {
          content: ProductContent,
          clazz: 'width30',
          component_data: {goodsName: item.name, imageLink: item.imageLink, brand: item.brand}
        };
      },
      map_currentPrice(item) {
        return {content: `${item.currentPrice} ₽`};
      },
      map_currentRating(item) {
        return {content: ProductRating, component_data: {rating: item.currentRating}};
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