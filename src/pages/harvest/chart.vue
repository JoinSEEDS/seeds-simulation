<template lang="pug">
    div.column
        #chart-area.full-width
</template>

<script>
import chart from 'tui-chart'
import { dom } from 'quasar'
const { width } = dom
import { seeds } from '~/mixins/seeds'
import { EventBus } from '~/mixins/utils'
export default {
  name: 'custom-chart',
  mixins: [ seeds, EventBus ],
  data () {
    return {
      chartWidth: 200
    }
  },
  mounted () {
    this.resizeChart()

    window.addEventListener('resize', () => { this.resizeChart() })
    EventBus.$on('on-change-table-selected', clickCount => {
      this.resizeChart()
    })
  },
  beforeDestroy () {
    document.removeEventListener('resize', () => { this.resizeChart() })
  },
  computed: {
    ListenMyDataChart () {
      console.log('Watching myDataChart')
      if (this.myDataChart) this.resizeChart()
      return true
    }
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
        categories: this.myDataChart.categories,
        series: this.myDataChart.series
      }
      console.log('Data sent to chart', data)
      console.log('myDataChart', this.myDataChart)
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
