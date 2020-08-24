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
      <TrackingTable v-if="loaded && tablePositions" :headers="tableHeaders" :items="tablePositions" :order="orderType" :order-handler="$orderHandler"/>
      <div v-else class="loading-table">
        <img ondragstart="return false" src="../../assets/img/loading.gif" alt="">
      </div>
    </div>
  </Fragment>
</template>

<script>
  import RowWithIcon from "@/shared-components/RowWithIcon.vue";
  import TrackingTable from "@/shared-components/TrackingTable.vue";

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
  import {SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import DeleteProductFromTracking from "@/components/tracking/DeleteProductFromTracking";
  import AutoSort from "./AutoSort";

  export default {
    name: "Group",
    components: {AddGoodsBtn, RowWithIcon, TrackingTable, Fragment},
    mixins: [tableMixins, orderHandler],
    data() {
      return {
        tableHeaders: [
          {name: 'goods', label: 'Товар', clazz: 'width30', sortable: false},
          {
            name: 'currentPrice',
            label: 'Цена',
            clazz: 'width9 tracking-table__header-item_align-center',

          },
          {name: 'rating', label: 'Рейтинг', clazz: 'width9 tracking-table__header-item_align-center', },
          {name: 'currentQty', label: 'Доступно к заказу', clazz: 'width9', },
          {name: 'todayOrders', label: 'Заказы Сегодня', clazz: 'width9', },
          {name: 'yesterdayOrders', label: 'Заказы Вчера', clazz: 'width9', },
          {name: 'weekOrders', label: 'Заказы Неделя', clazz: 'width9', },
          {name: 'monthOrders', label: 'Заказы Месяц', clazz: 'width9', },
          {name: 'actions', label: 'Действия', sortable: false, clazz: 'width5'},
        ],
        list: [],
        trackingActionList: [
          {label: "Добавить оповещения для групп", img: AlertImg},
          {
            label: "Автоподсорт", img: AutosortImg, onClick: () => {
              this.$store.commit(`modal/${SHOW_MODAL_MUTATION}`, {
                component: AutoSort,
                data: {groupName: this.$route.params.name}
              })
            }
          },
          {
            label: "Скачать", img: DownloadImg, onClick: () => {
              const service = new TrackingService();
              service.getGroupInfoFile(this.$route.params.name);
            }
          },
        ],
        orderType: 'currentPrice',

        debounceLoadGoods: debounce(this.loadGoods, 200),

        loaded: false
      }
    },
    computed: {
      tablePositions() {
        return this.list.map(item => ({
          ...this.$mapItemListToTableItem({...item, ...item.ordersInfo}),
          nested: {
            content: ProductNestedSizesTable,
            articul: item.articul,
            groupName: this.$route.params.name,
            priceWithDiscount: item.currentPrice
          },
        }));
      },
      modalResponse() {
        return this.$store.state.modal.componentResponse;
      }
    },
    methods: {
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
      map_actions(item) {
        return {
          content: ProductAction,
          component_data: {isRecycle: true, clickHandler: this.deleteProductFromTracking, articul: item.articul},
          clazz: 'width5 tracking-table__align-center'
        }
      },
      async loadGoods() {
        const service = new TrackingService();
        const results = await service.getGroupGoods(this.$route.params.name, this.orderType);

        if (results === null) {
          this.$router.push({name: 'tracking.group_list'})
        } else {
          this.list = [];
          this.$nextTick(() => {
            this.list = results;
          })
        }
        
        this.loaded = true
      },
      /**
       *
       * @param {MouseEvent} $event
       * @param {string} articul
       * @returns {Promise<void>}
       */
      async deleteProductFromTracking($event, articul) {
        $event.stopPropagation();

        const groupName = this.$route.params.name;
        this.$store.commit(`modal/${SHOW_MODAL_MUTATION}`, {
          component: DeleteProductFromTracking,
          data: {articul, groupName, callback: () => this.loadGoods()},
        });
      }
    },
    async mounted() {
      this.loaded = false
      this.loadGoods();
      this.$eventBus.$on('tracking.group.loadGoods', () => {
        this.loadGoods();
      })
    },
    beforeDestroy() {
      this.$eventBus.$off('tracking.group.loadGoods');
    },
    watch: {
      orderType: function () {
        // this.debounceLoadGoods();
        console.log(this.orderType)
      },
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

  .loading-table {
    flex: 1;
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>