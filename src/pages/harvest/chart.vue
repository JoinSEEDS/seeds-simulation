<template lang="pug">
    #chartL.column(ref='container' v-if="dataChart")
      //- slot(name='container')
      #chart-area
</template>

<script>
// https://github.com/nhn/tui.chart/blob/master/docs/wiki/README.md
// https://nhn.github.io/tui.chart/latest/tui.chart
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
    // $('#table-filters>ul>li.active').removeClass('tui-chart-tooltip')
    // this.$refs.container.children[0].removeClass('tui-chart-tooltip')
    // this.$refs.container.children[0].children[0].children[0].children[0].classList.remove('tui-chart-tooltip')
    // this.$refs.container.children[0].children[0].children[0].children[0].children[0].classList.remove('tui-chart-tooltip')
  },
  updated () {
    const b = this.$refs.container.children[0].children[0].children[2].childNodes
    // this.$refs.container.children[0].children[0].children[2].style.backgroundColor = 'gray'
    // b[0].style.backgroundColor = 'gray'
    // const a = this.$refs.container.children[0].children[0].children[2]
    console.log('ID', b)
    b.forEach(element => {
      console.log('CHILDREN', element)
    })
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
          template: (category, item, categoryTimestamp) => {
            const head = `<div class="tooltip-container">
              <div class="text-tooltip-title">${`${item.legend}:`}</div>
              <div class="text-tooltip-value">${`${this.formatToMoney(item.value)} Seeds`}</div>
              </div>`
            return head
          }
        },
        legend: {
          align: 'top'
        }
      }

      chart.lineChart(container, data, options)
    }
  }
}
</script>

<style lang="sass">
.tooltip-container
  padding: 10px
  min-width: 150px
#chartL .myTooltipContainer
    background-color: rgb(149, 149, 149)
    padding: 10px
    width: auto
    border-radius: 3px
    min-width: 150px
    text-align: center
#chartL .tui-chart-tooltip
  background-color: gray !important
#chartL .tui-chart, #chartL .tui-chart-tooltip-area, #chartL .tui-chart-tooltip
  // background-color: rgb(149, 149, 149)

</style>
