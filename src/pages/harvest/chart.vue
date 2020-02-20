<template lang="pug">
    div
        #chart-area
</template>

<script>
import chart from 'tui-chart'

export default {
  name: 'custom-chart',
  mounted () {
    this.loadChart()
  },
  methods: {
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
          width: 1000,
          height: 540,
          title: '24-hr Average Temperature'
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
