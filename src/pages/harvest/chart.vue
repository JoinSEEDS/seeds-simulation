<template lang="pug">
    div.column(ref='container' v-if="dataChart")
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
    prop: ['dataChart', 'chartName', 'xAxisTitle', 'yAxisTitle']
  },
  props: {
    dataChart: {
      default: null
    },
    chartName: {
      default: 'Title'
    },
    xAxisTitle: {
      default: 'XTitle'
    },
    yAxisTitle: {
      default: 'YTitle'
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
      var container = this.$refs.container.children[0]
      // var container = document.getElementById('chart-area')
      var data = {
        categories: this.dataChart.categories,
        series: this.dataChart.series
      }
      var options = {
        chart: {
          title: this.chartName,
          width: this.chartWidth
        },
        yAxis: {
          title: this.yAxisTitle,
          pointOnColumn: true
        },
        xAxis: {
          title: this.xAxisTitle
        },
        series: {
          spline: true,
          showDot: true,
          animation: {
            duration: 300
          }
        },
        tooltip: {
          suffix: this.yAxisTitle
        },
        legend: {
          align: 'top'
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
