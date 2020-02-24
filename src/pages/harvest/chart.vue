<template lang="pug">
    div.column(ref='container')
      //- slot(name='container')
      #chart-area
</template>

<script>
// https://github.com/nhn/tui.chart/blob/master/docs/wiki/README.md
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
    console.log('Container ref', this.$refs)
  },
  beforeDestroy () {
    document.removeEventListener('resize', () => { this.resizeChart() })
  },
  methods: {
    getWidth () {
      // var customTable = document.getElementById('chart-area')
      var customTable = this.$refs.container.children[0]
      this.chartWidth = width(customTable)
    },
    resizeChart () {
      this.$refs.container.children[0].innerHTML = ''
      this.getWidth()
      this.loadChart()
    },
    loadChart () {
      var container = document.getElementById('chart-area')
      // var container = document.getElementById('chart-area')
      var data = {
        categories: this.dataChart.categories,
        series: this.dataChart.series
      }
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
