<template>
  <div class="charts">
    <div class="charts-labels">
      <div @click="changeType(label)" v-for="label in types" :key="label.label" :class="`${label.class} ${label.class === currentType ? 'active' : ''}`" class="charts-labels-item">
        <img :src="require(`../../assets/img/ikons/${label.icon}.svg`)" alt="">
        <span>{{ label.label }}</span>
      </div>
    </div>
    <LineChart v-show="currentType === 'orders'" v-if="chartData[`orders`]" :chart-data="chartData['orders']" :chart-options="options['orders']"/>
    <LineChart v-show="currentType === 'qty'" v-if="chartData[`qty`]" :chart-data="chartData['qty']" :chart-options="options['qty']"/>
    <LineChart v-show="currentType === 'price'" v-if="chartData[`price`]" :chart-data="chartData['price']" :chart-options="options['price']"/>
    <LineChart v-show="currentType === 'rating'" v-if="chartData[`rating`]" :chart-data="chartData['rating']" :chart-options="options['rating']"/>
    <LineChart v-show="currentType === 'feedBackCount'" v-if="chartData[`feedBackCount`]" :chart-data="chartData['feedBackCount']" :chart-options="options['feedBackCount']"/>
  </div>
</template>

<script>
  import LineChart from "../../shared-components/LineChart";
  import {BlackboxService} from "../../services/blackbox_service";

  export default {
    name: "ProductBlackboxNested",
    components: {LineChart},
    props: {
      articul: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        chartData: {
          orders: null,
          qty: null,
          price: null,
          rating: null
        },
        currentType: "orders",
        types: {
          orders: {
            label: "Заказы",
            icon: "orders-icon",
            class: "orders"
          },
          qty: {
            label: "Остаток на складе",
            icon: "qty-icon",
            class: "qty"
          },
          price: {
            label: "Стоимость",
            icon: "price-icon",
            class: "price"
          },
          rating: {
            label: "Рейтинг",
            icon: "rating-icon",
            class: "rating"
          },
          feedBackCount: {
            label: "Отзывы",
            icon: "feedback-icon",
            class: "feedBackCount"
          },
        },
        options: {
          orders: {
            scales: {
              xAxes: [{
                ticks: {
                  callback(value) {
                    return value.substr(5);
                  }
                }
              }],
              yAxes: [
              {
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                      return value % 1 ? '' : value + ' шт.'
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Заказы'
                }
              }, 
              ]
            }
          },
          qty: {
            scales: {
              xAxes: [{
                ticks: {
                  callback(value) {
                    return value.substr(5);
                  }
                }
              }],
              yAxes: [
              {
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                      return value % 1 ? '' : value + ' шт.'
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Остатки'
                }
              }, 
              ]
            }
          },
          price: {
            scales: {
              xAxes: [{
                ticks: {
                  callback(value) {
                    return value.substr(5);
                  }
                }
              }],
              yAxes: [
              {
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                      return value % 1 ? '' : value + ' ₽'
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Стоимость'
                }
              }, 
              ]
            }
          },
          rating: {
            scales: {
              xAxes: [{
                ticks: {
                  callback(value) {
                    return value.substr(5);
                  }
                }
              }],
              yAxes: [
              {
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                      return value % 1 ? '' : value + ''
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Рейтинг'
                }
              }, 
              ]
            }
          },
          feedBackCount: {
            scales: {
              xAxes: [{
                ticks: {
                  callback(value) {
                    return value.substr(5);
                  }
                }
              }],
              yAxes: [
              {
                position: 'left',
                id: 'y-axis-1',
                ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                      return value % 1 ? '' : value + ''
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Количество отзывов'
                }
              }, 
              ]
            }
          },
        }
      }
    },
    methods: {
      changeType(label) {
        this.currentType = label.class
      }
    },
    async created() {
      const blackboxService = new BlackboxService();
      const productData = await blackboxService.getChartData(this.articul);
      // const productData = [
      //   {"date": "2020-07-16", "orders": 10},
      //   {"date": "2020-07-17", "orders": 15},
      //   {"date": "2020-07-18", "orders": 0},
      //   {"date": "2020-07-19", "orders": 27},
      //   {"date": "2020-07-20", "orders": 28},
      //   {"date": "2020-07-21", "orders": 20},
      //   {"date": "2020-07-22", "orders": 13},
      //   {"date": "2020-07-23", "orders": 2},
      //   {"date": "2020-07-24", "orders": 11},
      //   {"date": "2020-07-25", "orders": 22},
      //   {"date": "2020-07-26", "orders": 17},
      // ];

      const labels = productData.map(item => item.date);
      const orders = productData.map(item => item.orders);
      const qty = productData.map(item => item.qty);
      const price = productData.map(item => item.price);
      const rating = productData.map(item => item.rating);
      const feedBackCount = productData.map(item => item.feedBackCount);
      console.log(productData)
      this.chartData.orders = {
        labels,
        datasets: [
          {yAxisID: 'y-axis-1', data: orders, fill: false, borderColor: "#7E57C2", lineTension: 0, label: 'Заказы'},
          // {yAxisID: 'y-axis-2', data: qty, fill: false, borderColor: "#ff3f3f", lineTension: 0, label: 'Остаток на складе'}
        ]
      }
      this.chartData.qty = {
        labels,
        datasets: [
          {yAxisID: 'y-axis-1', data: qty, fill: false, borderColor: "#FFAB40", lineTension: 0, label: 'Остаток на складе'},
        ]
      }
      this.chartData.price = {
        labels,
        datasets: [
          {yAxisID: 'y-axis-1', data: price, fill: false, borderColor: "#1E88E5", lineTension: 0, label: 'Стоимость'},
        ]
      }
      this.chartData.rating = {
        labels,
        datasets: [
          {yAxisID: 'y-axis-1', data: rating, fill: false, borderColor: "#26A69A", lineTension: 0, label: 'Рейтинг'},
        ]
      }
      this.chartData.feedBackCount = {
        labels,
        datasets: [
          {yAxisID: 'y-axis-1', data: feedBackCount, fill: false, borderColor: "#D81B60", lineTension: 0, label: 'Отзывы'},
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
.charts {
  flex-direction: column;
  justify-content: center;
}
  .charts-labels {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
    max-width: 672px;
    &-item {
      min-width: 150px;
      cursor: pointer;
      border-radius: 50px;
      color: #fff;
      font-weight: 400;
      padding: 10px 10px 8px 45px;
      position: relative;
      background: #000;
      border: 2px solid transparent;
      transition-duration: .2s;
      user-select: none;
      margin: 5px 5px;
      & img {
        // width: 12px;
        position: absolute;
        left: 10px;
        top: 50%;
        // width: 24px;
        transform: translate(0, -50%) scale(0.7);
      }
      & span {
        display: flex;
        align-items: center;
        line-height: 1;
      }
      &.orders {
        background: #7E57C2;
        &.active {
          border: 2px solid #512DA8;
          background: rgba(126, 87, 194, .8);
        }
      }
      &.qty {
        background: #FFAB40;
        &.active {
          border: 2px solid #FF6D00;
          background: rgba(255, 171, 64, .8);
        }
      }
      &.price {
        background: #1E88E5;
        &.active {
          border: 2px solid #1565C0;
          background: rgba(30, 136, 229, .8);
        }
      }
      &.rating {
        background: #26A69A;
        &.active {
          border: 2px solid #00796B;
          background: rgba(38, 166, 154, .8);
        }
      }
      &.feedBackCount {
        background: #D81B60;
        &.active {
          border: 2px solid #D81B60;
          background: rgba(216, 27, 96, .8);
        }
      }
    }
  }
</style>