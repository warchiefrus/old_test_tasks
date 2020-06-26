<template>
  <div class="chartSection">
    <div class="chart_top">
      <div class="headers">
        <div class="header">Эффективность сотрудников</div>
        <div class="subheader">Прогресс по выработкам с общими показателями</div>
      </div>
      <button class="btnMore"><span class="icon-more_vert icon"></span></button>
    </div>
    
    <div class="chartArea">
      <v-chart class="eCharts" :options="chartData" autoresize/>
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'

export default {
  components: {
    'v-chart': ECharts
  },

  data: () => ({
    chartData: {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
          data: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.']
      },
      grid: {
        left: '0px',
        right: '0px',
        bottom: '0px',
        top: '10px',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
          axisTick: false,
          axisLine: {
            lineStyle: {
              color: '#999999'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {color: '#999999'},
          splitLine: {
            lineStyle: {
              color : ['#EEEEEE']
            }
          },
          axisLine: {
            lineStyle: {
              color: '#999999'
            }
          },          
          axisTick: false
        }
      ],
      series: [
        {
          name: 'bot',
          type: 'bar',
          data: [310, 460, 325, 360, 380, 310, 320, 200, 280, 370, 410, 410],
          color: '#F2C94C',
          barWidth: 10,
          barGap: '-100%',
          itemStyle: {
            normal: {
              barBorderRadius: [50, 50, 0 ,0 ]
            }
          }

        },

        {
          name: 'top',
          type: 'bar',
          data: [250, 360, 270, 280, 320, 190, 260, 170, 220, 295, 340, 340],
          color: '#2F80ED',
          barWidth: 10,
          barGap: '-100%',
          itemStyle: {
            normal: {
              barBorderRadius: [50, 50, 0 ,0 ]
            }
          }
        },
      ]
    }
  }),
}
</script>

<style lang="scss" scoped>
  .chartSection {
    padding: 20px 30px 20px 30px;
    
    .chart_top {
      display: grid;
      grid-template-columns: 1fr 40px;

      .headers {
        text-align: left;
        .header {
          font-size: 14px;
          line-height: 16px;
          color: #000000;
          margin-bottom: 7px;
        }
        .subheader{
          font-size: 12px;
          line-height: 14px;
          color: #999999;
        }

      }
      .btnMore {
        background: #EEEEEE;
        border-radius: 10px;
        height: 40px;
        width: 40px;
        outline: none;
        border: none;
        cursor: pointer;

        .icon {
          font-size: 1.2rem;
        }
      }
    }

    .chartArea {
      height: 270px;
      margin-top: 20px;
      .eCharts {
        width: 100%;
        height: 100%;
      }
    }
  }


</style>
