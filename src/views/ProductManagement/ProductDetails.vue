<template>
    <div>
      <h-card :border="false" class="fund-details-card">
        <h3>基金详情</h3>
        <h-row type="flex" justify="space-between">
          <!-- 左侧基金详情信息 -->
          <h-col :span="11">
            <h-form label-width="120px">
              <h-form-item label="产品名" class="compact-form-item">
                <h-input v-model="fundDetails.fund_name" disabled />
              </h-form-item>
              <h-form-item label="产品ID" class="compact-form-item">
                <h-input v-model="fundDetails.fund_id" disabled />
              </h-form-item>
              <h-form-item label="产品类型" class="compact-form-item">
                <h-input v-model="fundDetails.fund_type" disabled />
              </h-form-item>
              <h-form-item label="产品净值" class="compact-form-item">
                <h-input v-model="fundDetails.fund_nav" disabled />
              </h-form-item>
              <h-form-item label="产品发布时间" class="compact-form-item">
                <h-input v-model="fundDetails.fund_est_date" disabled />
              </h-form-item>
              <h-form-item label="风险等级" class="compact-form-item">
                <h-input v-model="fundDetails.fund_risk_level" disabled />
              </h-form-item>
              <h-form-item label="基金经理姓名" class="compact-form-item">
                <h-input v-model="fundDetails.fund_manager_name" disabled />
              </h-form-item>
              <h-form-item label="产品状态" class="compact-form-item">
                <h-input v-model="fundDetails.fund_state" disabled />
              </h-form-item>
            </h-form>
          </h-col>
  
           <!-- 右侧净值走势图 -->
        <h-col :span="12">
          <div class="chart-placeholder">
            <!-- ECharts图表容器 -->
            <div id="echarts-main" style="width: 100%; height: 500px;"></div>
          </div>
        </h-col>
      </h-row>
  
        <div class="action-buttons">
          <h-button type="default" @click="goBack">返回</h-button>
        </div>
      </h-card>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    data() {
      return {
        fundDetails: {
        fund_id: '001',
        fund_name: '稳健成长基金',
        fund_type: '股票型',
        fund_nav: '1.2345',
        fund_est_date: '2021-06-30',
        fund_risk_level: '中风险',
        fund_manager_name: '张三',
        fund_state: '正常',
        },
      };
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        var chartDom = document.getElementById('echarts-main');
        var myChart = echarts.init(chartDom);
        var option;
  
        function randomData() {
          now = new Date(+now + oneDay);
          value = value + Math.random() * 21 - 10;
          return {
            name: now.toString(),
            value: [
              [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
              Math.round(value)
            ]
          };
        }
  
        let data = [];
        let now = new Date(1997, 9, 3);
        let oneDay = 24 * 3600 * 1000;
        let value = Math.random() * 1000;
        for (var i = 0; i < 1000; i++) {
          data.push(randomData());
        }
  
        option = {
          title: {
            text: '净值走势图'
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0];
              var date = new Date(params.name);
              return (
                date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear() +
                ' : ' +
                params.value[1]
              );
            },
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'time',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          series: [
            {
              name: 'Fake Data',
              type: 'line',
              showSymbol: false,
              data: data
            }
          ]
        };
  
        setInterval(function () {
          for (var i = 0; i < 5; i++) {
            data.shift();
            data.push(randomData());
          }
          myChart.setOption({
            series: [
              {
                data: data
              }
            ]
          });
        }, 1000);
  
        option && myChart.setOption(option);
      },
      goBack() {
        this.$router.go(-1);
      },
    },
  };
  </script>
  
  
  <style scoped>
  .fund-details-card {
    position: relative;
    top: 10px;
    left: 10px;
  }
  
  .compact-form-item {
    margin-bottom: 8px;
  }
  
  .chart-placeholder {
    height: 500px; 
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px; 
  }
  
  .action-buttons {
    text-align: right;
    margin-top: 5px;
    padding-right: 5px;
  }
  </style>
  