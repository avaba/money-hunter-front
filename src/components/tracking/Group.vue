<template>
  <Fragment>
    <div class="tracking-body">
      <div class="tracking-info">
        <div class="tracking-add-product">
          <AddGoodsBtn/>
        </div>
        <div class="tracking-actions">
          <RowWithIcon :list="trackingActionList"/>
        </div>
      </div>

      <TrackingTable :headers="tableHeaders" :items="tablePositions" :order="orderType" :order-handler="$orderHandler"/>
    </div>
  </Fragment>
</template>

<script>
  import RowWithIcon from "@/shared-components/RowWithIcon";
  import TrackingTable from "@/shared-components/TrackingTable";

  import AlertImg from "@/assets/img/ikons/alert.svg";
  import AutosortImg from "@/assets/img/ikons/autosort.svg";
  import DownloadImg from "@/assets/img/ikons/download.svg";

  import ProductContent from "@/components/tracking-table/ProductContent";
  import ProductPrice from "@/components/tracking-table/ProductPrice";
  import ProductRating from "@/components/tracking-table/ProductRating";
  import ProductAction from "@/components/tracking-table/ProductAction";

  import ProductNestedSizesTable from "@/components/tracking-table/ProductNestedSizesTable";
  import {tableMixins} from "@/extenders/mixins/table_mixins";

  import {Fragment} from 'vue-fragment'
  import {orderHandler} from "@/extenders/mixins/order_handler";
  import {TrackingService} from "@/services/tracking_service";
  import AddGoodsBtn from "@/shared-components/AddGoodsBtn";
  import {debounce} from "lodash";

  export default {
    name: "Group",
    components: {AddGoodsBtn, RowWithIcon, TrackingTable, Fragment},
    mixins: [tableMixins, orderHandler],
    data() {
      return {
        tableHeaders: [
          {name: 'goods', label: 'Товар', clazz: 'width30', sortable: false},
          {name: 'currentPrice', label: 'Цена', clazz: 'width9 tracking-table__header-item_align-center', sortable: false},
          {name: 'rating', label: 'Рейтинг', clazz: 'width9 tracking-table__header-item_align-center', sortable: false},
          {name: 'currentQty', label: 'Доступно к заказу', clazz: 'width9', sortable: false},
          {name: 'todayOrders', label: 'Заказы Сегодня', clazz: 'width9', sortable: false},
          {name: 'yesterdayOrders', label: 'Заказы Вчера', clazz: 'width9', sortable: false},
          {name: 'weekOrders', label: 'Заказы Неделя', clazz: 'width9', sortable: false},
          {name: 'monthOrders', label: 'Заказы Месяц', clazz: 'width9', sortable: false},
          {name: 'actions', label: 'Действия', sortable: false, clazz: 'width5'},
        ],
        list: [],
        trackingActionList: [
          {label: "Добавить оповещения для групп", img: AlertImg},
          {label: "Автоподсорт", img: AutosortImg},
          {label: "Скачать", img: DownloadImg},
        ],
        orderType: 'currentPrice',

        debounceLoadGoods: debounce(this.loadGoods, 200)
      }
    },
    computed: {
      tablePositions() {
        return this.list.map(item => ({
          ...this.$mapItemListToTableItem({...item, ...item.ordersInfo}),
          nested: {content: ProductNestedSizesTable, articul: item.articul,},
        }));
      }
    },
    methods: {
      prevHandler() {
        console.log('prev');
      },
      nextHandler() {
        console.log('next');
      },
      map_goods(item) {
        return {
          content: ProductContent,
          clazz: 'width30',
          component_data: {goodsName: item.name, articul: item.articul, brand: item.brand, link: item.link}
        };
      },
      map_currentPrice(item) {
        return {
          content: ProductPrice,
          clazz: 'width9 tracking-table__align-center',
          component_data: {price: item.currentPrice}
        };
      },
      map_rating(item) {
        return {
          content: ProductRating,
          component_data: {rating: item.currentRating},
          clazz: 'width9 tracking-table__align-center'
        }
      },
      map_actions() {
        return {content: ProductAction, clazz: 'width5 tracking-table__align-center'}
      },
      async loadGoods() {
        const service = new TrackingService();
        const results = await service.getGroupGoods(this.$route.params.name, this.orderType);

        this.list = [];
        this.$nextTick(() => {
          this.list = results;
        })
      }
    },
    async mounted() {
      this.loadGoods();
    },
    watch: {
      orderType: function () {
        this.debounceLoadGoods();
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