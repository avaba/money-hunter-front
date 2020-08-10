<template>
  <LineChart :chart-data="chartData" :chart-options="options" v-if="chartData"/>
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
        chartData: null,
        options: {
          scales: {
            xAxes: [{
              ticks: {
                callback(value) {
                  return value.substr(5);
                }
              }
            }]
          }
        }
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
      const data = productData.map(item => item.orders);

      this.chartData = {
        labels,
        datasets: [
          {data, fill: false, borderColor: "#FFC700", lineTension: 0, label: 'Заказы'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>