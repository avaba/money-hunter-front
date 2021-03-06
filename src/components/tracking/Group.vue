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
        <progressBar
          v-if="progress || progress === 0 && isLoaded"
          :progress="progress"
          :fontSize="'12px'"
          :text="`Товаров в отслеживании: ${defaultMaxGoods[mySubscription] - maxTrackingProducts} / ${defaultMaxGoods[mySubscription]}`"
        />
      </div>
      <TrackingTable v-if="loaded && tablePositions" :headers="tableHeaders" :items="tablePositions" :order="orderType" :order-handler="$orderHandler"/>
      <div v-else class="loading-table">
        <img ondragstart="return false" src="../../assets/img/loading.svg" alt="">
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

  import progressBar from "@/shared-components/progressBar"
  import {UserService} from "@/services/user_service";

  export default {
    name: "Group",
    components: {AddGoodsBtn, RowWithIcon, TrackingTable, Fragment, progressBar},
    mixins: [tableMixins, orderHandler],
    data() {
      return {
        tableHeaders: [
          {name: 'goods', label: 'Товар', clazz: 'width23', sortable: false},
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
          {name: 'actions', label: 'Действия', sortable: false, clazz: 'width9'},
        ],
        list: [],
        trackingActionList: [
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
        orderType: '',

        debounceLoadGoods: debounce(this.loadGoods, 200),

        loaded: false,

        defaultMaxGoods: {
          FREE: 10,
          PRO: 150
        },

        progress: 0,
        
        maxTrackingProducts: 0,

        isLoaded: false
      }
    },
    computed: {
      tablePositions() {
        if(this.list.length > 0) {
          return this.list.map(item => ({
            ...this.$mapItemListToTableItem({...item, ...item.ordersInfo}),
            nested: {
              content: ProductNestedSizesTable,
              articul: item.articul,
              groupName: this.$route.params.name,
              priceWithDiscount: item.currentPrice
            },
          }));
        } else {
          return false
        }
      },
      modalResponse() {
        return this.$store.state.modal.componentResponse;
      },
      mySubscription() {
        return this.$store.getters['user/getSubscription'].subscriptionType
      }
    },
    methods: {
      map_goods(item) {
        return {
          content: ProductContent,
          clazz: 'width23',
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
          clazz: 'width9 tracking-table__align-center'
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

        setTimeout(() => {
          this.orderType = "currentPrice"
        }, 0);
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
        const list = [...this.list]
        this.list = []
        const ordersInfo = ['yesterdayOrders', 'weekOrders', 'todayOrders', 'monthOrders']
        const currentHeaderItem = this.orderType[0] === '-' ? this.orderType.substr(1) : this.orderType
        const operation = this.orderType[0] === '-' ? 'from' : 'to'
        if(ordersInfo.find(item => item === currentHeaderItem)) {
          if(operation === 'to') {
            list.sort((a, b) => a.ordersInfo[currentHeaderItem] > b.ordersInfo[currentHeaderItem] ? 1 : -1)
          } else if (operation === 'from'){
            list.sort((a, b) => a.ordersInfo[currentHeaderItem] < b.ordersInfo[currentHeaderItem] ? 1 : -1)
          }
        } else {
          if(operation === 'to') {
            list.sort((a, b) => a[currentHeaderItem] > b[currentHeaderItem] ? 1 : -1)
          } else if (operation === 'from'){
            list.sort((a, b) => a[currentHeaderItem] < b[currentHeaderItem] ? 1 : -1)
          }
        }
        setTimeout(() => {
          this.list = [...list]
        }, 200);
      },
      list: {
        handler: function () {
          this.isLoaded = false
          const userService = new UserService();
          userService.getSubscription().then(res => {
            this.maxTrackingProducts = res.maxTrackingProducts
            const progressValue = (this.defaultMaxGoods[this.mySubscription] - this.maxTrackingProducts) * (100 / this.defaultMaxGoods[this.mySubscription])
            if(progressValue <= 100 && progressValue >= 0) {
              this.progress = progressValue
            } else {
              this.progress =  false
            }
            this.isLoaded = true
          })
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
  @media screen and (max-width: 1030px){
    .tracking-info {
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .progressBar {
      max-width: 100% !important;
      // margin: 10px 0px;
      margin-top: 15px;
    }
    .tracking-actions {
      flex: 0 0 auto;
    }
  }

  @media screen and (max-width: 600px){
    .tracking-info {
      justify-content: center;
    }
    .progressBar {
      max-width: 100% !important;
      // margin: 10px 0px;
      margin-top: 15px;
    }
    .tracking-actions {
      width: 100%;
      margin-left: 0px;
      justify-content: center;
      margin-top: 15px;
    }
  }
</style>