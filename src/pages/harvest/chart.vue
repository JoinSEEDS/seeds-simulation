<template lang="pug">
    div.column
        #chart-area.full-width
</template>

<script>
import chart from 'tui-chart'
import { dom } from 'quasar'
const { width } = dom
export default {
  name: 'custom-chart',
  model: {
    prop: 'dataChart'
  },
  props: {
    dataChart: {
      default: null
    }
  },
  data () {
    return {
      chartWidth: 200
    }
  },
  watch: {
    dataChart () {
      this.resizeChart()
    }
  },
  mounted () {
    window.addEventListener('resize', () => { this.resizeChart() })
  },
  beforeDestroy () {
    document.removeEventListener('resize', () => { this.resizeChart() })
  },
  methods: {
    getWidth () {
      var customTable = document.getElementById('chart-area')
      this.chartWidth = width(customTable)
    },
    resizeChart () {
      document.getElementById('chart-area').innerHTML = ''
      this.getWidth()
      this.loadChart()
    },
    loadChart () {
      var container = document.getElementById('chart-area')
      var data = {
        categories: this.dataChart.categories,
        series: this.dataChart.series
      }
      // console.log('Data sent to chart', dataChart)
      // console.log('myDataChart', this.dataChart)
      var options = {
        chart: {
          title: 'Custom Chart',
          width: this.chartWidth
        },
        yAxis: {
          title: 'Amount',
          pointOnColumn: true
        },
        xAxis: {
          title: 'Month'
        },
        series: {
          spline: true,
          showDot: false
        },
        tooltip: {
          suffix: '°C'
        }
      }
      //   var theme = {
      //     series: {
      //       colors: [
      //         '#83b14e', '#458a3f', '#295ba0', '#2a4175', '#289399',
      //         '#289399', '#617178', '#8a9a9a', '#516f7d', '#dddddd'
      //       ]
      //     }
      //   }

      // For apply theme

      // tui.chart.registerTheme('myTheme', theme);
      // options.theme = 'myTheme';

      chart.lineChart(container, data, options)
    }
  }
}
</script>
