<script>
  import {Line} from "vue-chartjs";

  export default {
    name: "LineChart",
    extends: Line,
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        defaultChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            onClick: false
          }
        }
      }
    },
    mounted() {
      this.renderChart(
        this.chartData,
        {...this.defaultChartOptions, ...this.chartOptions}
      );
    }
  }
</script>

<style scoped>

</style>