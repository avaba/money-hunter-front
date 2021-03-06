<template>
  <Fragment>
    <FilterBlock :isLoading="isLoading" :searchHandler="searchHandler"/>

    <div class="blackbox">
      <TrackingTable v-if="!isLoading && tablePositions.length > 0"
                     :headers="tableHeaders"
                     :items="tablePositions"
                     :order="orderType"
                     :order-handler="$orderHandler"
                     :subheaders="subheaders"/>
      <div v-else-if="isLoading" class="loading-table">
        <img ondragstart="return false" src="../assets/img/loading.svg" alt="">
      </div>
      <div v-else-if="isLoading === false && tablePositions.length <= 0" class="table-notFounded">
        <p class="table-notFounded-text">Товары по заданным критериям не найдены</p>
      </div>
    </div>

    <div class="block_container">
      <TrackingPagination :total-count="paginationData.totalCount"
                          :page="paginationData.page"
                          :per-page="paginationData.perPage"
                          :per-page-handler="perPageHandler"
                          :prev-handler="$paginationPrevHandler"
                          :next-handler="$paginationNextHandler"/>
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
  import {paginationMixin} from "@/extenders/mixins/pagination_mixin";
  import {debounce} from 'lodash'
  import ProductBlackboxNested from "@/components/tracking-table/ProductBlackboxNested";
  import {SHOW_MODAL_MUTATION} from "@/store/modules/modal/constants";
  import AddToGroup from "@/components/blackbox/AddToGroup";
  import {AmplitudeService} from "../services/amplitude_service";
  import PlusImage from '../assets/img/ikons/plus3.svg';
  import ImgBtn from "../shared-components/ImgBtn";

  const DEFAULT_ORDER_TYPE = '-articul';

  export default {
    name: "Blackbox",
    components: {TrackingPagination, TrackingTable, FilterBlock, Fragment},
    mixins: [tableMixins, paginationMixin],
    data() {
      return {
        list: [],

        tableHeaders: [
          {name: 'goods', label: 'Товар', clazz: 'width30', sortable: false},
          {name: 'articul', label: 'Артикул', clazz: 'width9', isOnlyAscSorting: true},
          {name: 'currentPrice', label: 'Цена', clazz: 'width5'},
          {name: 'currentQty', label: 'Остаток', clazz: 'width9'},
          {name: 'avOrdersSpeed', label: 'Заказов в неделю', clazz: 'width9'},
          {name: 'avRevenue', label: 'Сумма заказов в неделю', clazz: 'width9'},
          {name: 'currentRating', label: 'Рейтинг', clazz: 'tracking-table__header-item_align-right width9'},
          {name: 'currentFeedBackCount', label: 'Кол-во отзывов', clazz: 'width9'},
          {name: 'add', label: 'Добавить в мои товары', sortable: false, clazz: 'width9'},
        ],
        orderType: DEFAULT_ORDER_TYPE,

        debounceLoadGoods: debounce(this.loadGoods, 200),

        isLoading: null,

        subheaders: {}
      }
    },
    computed: {
      tablePositions() {
        return this.list.map(item => ({
          ...this.$mapItemListToTableItem(item),
          nested: {content: ProductBlackboxNested, articul: item.articul, clazz: 'tracking-table-dropdown__item-chart'}
        }));
      },
      searchID() {
        return this.$store.state.blackbox.searchID;
      },
      agregatedData() {
        return this.$store.state.blackbox.agregated
      }
    },
    methods: {
      async searchHandler() {
        this.paginationData.page = 1;
        this.orderType = DEFAULT_ORDER_TYPE;

        this.debounceLoadGoods();
      },
      perPageHandler(value) {
        this.paginationData.page = 1;
        this.paginationData.perPage = value;

        AmplitudeService.blackBoxOnPageData(parseInt(value));

        this.loadGoods();
      },
      prevHandler() {
        this.paginationData.page -= 1;

        this.loadGoods();
      },
      nextHandler() {
        this.paginationData.page += 1;

        this.loadGoods();
      },

      async loadGoods() {
        if (this.$store.state.blackbox.searchID) {
          this.isLoading = true;
          const service = new BlackboxService();

          const result = await service.getGoodsBySearchID(
            this.searchID,
            this.orderType,
            this.paginationData.page,
            this.paginationData.perPage
          );
    
          this.paginationData.totalCount = result.countAll;
          this.list = [];
          this.$nextTick(() => {
            this.list = result.products;
            this.isLoading = false
          })
        }
      },
      insertHeaders(headers) {
        console.log(headers)
        const renamedHeaders = {
          priceAvg: {
            label: "currentPrice",
            title: "Средняя цена",
            value: "₽",
            formatting: true
          },
          qtyAvg: {
            label: "currentQty",
            title: "Cреднее кол-во остатков",
            value: null,
            formatting: true
          },
          qtySum: {
            label: "currentQtySum",
            title: "Общая сумма остатков",
            value: null,
            formatting: true
          },
          orderSum: {
            label: "avOrdersSpeed",
            title: "Кол-во заказов",
            value: null,
            formatting: true
          },
          revenueSum: {
            label: "avRevenue",
            title: "Сумма заказов",
            value: "₽",
            formatting: true
          },
          ratingAvg: {
            label: "currentRating",
            title: "Средний рейтинг",
            value: null,
            formatting: false
          },
          feedbackAvg: {
            label: "currentFeedBackCount",
            title: "Среднее кол-во отзывов",
            value: null,
            formatting: true
          }
        }
        const tableHeaders = []
        Object.keys(renamedHeaders).forEach(header => {
          // this.tableHeaders.find(item => item.name === renamedHeaders[header].label)["subheader"] = renamedHeaders[header].title
          this.subheaders[header] = {}
          this.subheaders[header]["subheader"] = renamedHeaders[header].title
          let subHeaderValue = headers.find(item => item.label === header).value
          if(renamedHeaders[header].formatting) {
            subHeaderValue = subHeaderValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
          if(typeof subHeaderValue === "number" && !Number.isInteger(subHeaderValue, 1)) {
            subHeaderValue = subHeaderValue.toFixed(2)
          }
          if(renamedHeaders[header].value) {
            subHeaderValue += renamedHeaders[header].value
          }
          this.subheaders[header]["subHeaderValue"] = subHeaderValue
          console.log(this.subheaders)
          // this.tableHeaders.find(item => item.name === renamedHeaders[header].label)["subheaderValue"] = subHeaderValue
        })
      },
      map_goods(item) {
        return {
          content: ProductContent,
          clazz: 'width30',
          component_data: {goodsName: item.name, articul: item.articul, brand: item.brand, link: item.link}
        };
      },
      map_currentPrice(item) {
        return {content: `${item.currentPrice} ₽`, clazz: 'width5'};
      },
      map_currentRating(item) {
        return {content: ProductRating, component_data: {rating: item.currentRating}, clazz: 'width9'};
      },
      map_add(item) {
        return {
          content: ImgBtn, component_data: {
            src: PlusImage,
            'click-handler': this.addGoodsPositionHandler.bind(this, item)
          }, clazz: 'tracking-table__align-center width9'
        }
      },
      addGoodsPositionHandler(item) {
        this.$store.commit(`modal/${SHOW_MODAL_MUTATION}`, {component: AddToGroup, data: {articul: item.articul}})
      }
    },
    async mounted() {
      this.$initPaginationHandlers(this.prevHandler, this.nextHandler);
    },
    watch: {
      orderType: function () {
        AmplitudeService.blackBoxOrdering(this.orderType);
        this.debounceLoadGoods();
      },
      agregatedData: {
        handler: function () {
          this.isLoading = true
          const result = this.agregatedData
          const mainInfo = ['onPage', 'products', "countAll"]
          const potentialHeaders = []
          Object.keys(result).forEach(resultItem => {
            if(!mainInfo.find(resultPotentialItem => resultPotentialItem === resultItem)) {
              potentialHeaders.push({label: resultItem, value: result[resultItem]})
            }
          })
          if(potentialHeaders.length > 0) {
            this.insertHeaders(potentialHeaders)
          }
          this.$nextTick(() => {
            this.isLoading = false
          })
        },
        deep: true
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
    flex: 1;
    position: relative;
    min-height: 200px;
  }

  .loading-table {
    flex: 1;
    background: #fff;
    box-sizing: border-box;
    width: 100%;
  }

  .loading-table img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .table-notFounded {
    flex: 1;
    background: #fff;
    box-sizing: border-box;
    width: 100%;
  }

  .table-notFounded-text {
    font-size: 1.71rem;
    font-weight: bold;
    letter-spacing: .3px;
    color: black;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 768px) {
      font-size: 1.41rem;
    }
    @media screen and (max-width: 550px) {
      font-size: 1.2rem;
    }
  }
  @media screen and (max-width: 710px) {
    .blackbox {
      margin: 10px;
      min-height: 140px;
    }
  }
</style>