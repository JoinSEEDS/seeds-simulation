<template lang="pug">
    div.column
        #chart-area.full-width
</template>

<script>
import chart from 'tui-chart'
import { dom } from 'quasar'
const { width } = dom
import { seeds } from '~/mixins/seeds'

export default {
  name: 'custom-chart',
  mixins: [ seeds ],
  data () {
    return {
      chartWidth: 200
    }
  },
  mounted () {
    this.resizeChart()

    window.addEventListener('resize', () => { this.resizeChart() })
  },
  beforeDestroy () {
    document.removeEventListener('resize', () => { this.resizeChart() })
  },
  computed: {
    // chartWidth () {
    //   var customTable = document.getElementById('chart-area')
    //   console.log('Width dom:', width(customTable))
    //   return width(customTable)
    // }
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
        categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
        series: [
          {
            name: 'Budget',
            data: [5000, 3000, 6000, 3000, 6000, 4000]
          },
          {
            name: 'Income',
            data: [8000, 1000, 7000, 2000, 5000, 3000]
          },
          {
            name: 'Outgo',
            data: [900, 6000, 1000, 9000, 3000, 1000]
          }
        ]
      }
      var options = {
        chart: {
          title: '24-hr Average Temperature',
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
