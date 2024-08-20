<template>
  <div style="overflow: hidden;">
    <h-card :border="false" class="fund-details-card">
      <h3>基金详情</h3>
      <h-row type="flex" justify="space-between">
        <!-- 左侧基金详情信息 -->
        <h-col :span="11">
          <h-form label-width="120px">
            <h-form-item label="产品名" class="compact-form-item">
              <h-input v-model="editableFund.fund_name" :disabled="!isEditing" />
            </h-form-item>
            <h-form-item label="产品ID" class="compact-form-item">
              <h-input v-model="editableFund.fund_id" disabled />
            </h-form-item>
            <h-form-item label="产品类型" class="compact-form-item">
              <h-input v-model="editableFund.fund_type" :disabled="!isEditing" />
            </h-form-item>
            <h-form-item label="产品当天净值" class="compact-form-item">
              <h-input v-model="editableFund.fund_nav" :disabled="!isEditing" />
            </h-form-item>
            <h-form-item label="产品发布时间" class="compact-form-item">
              <h-date-picker 
                v-model="editableFund.fund_est_date"
                type="date" 
                placeholder="选择日期"
                :disabled="!isEditing" 
              />
            </h-form-item>
            <h-form-item label="风险等级" class="compact-form-item">
              <h-select v-model="editableFund.fund_risk_level" :disabled="!isEditing">
                <h-option v-for="(level, index) in riskLevels" :key="index" :value="level">{{ level }}</h-option>
              </h-select>
            </h-form-item>
            <h-form-item label="基金经理姓名" class="compact-form-item">
              <h-input v-model="editableFund.fund_manager_name" :disabled="!isEditing" />
            </h-form-item>
            <h-form-item label="产品状态" class="compact-form-item">
              <h-select v-model="editableFund.fund_state" :disabled="!isEditing">
                <h-option v-for="(status, index) in fundStates" :key="index" :value="status">{{ status }}</h-option>
              </h-select>
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
        <h-button type="primary" v-if="!isEditing" @click="enableEditing">编辑</h-button>
        <h-button type="primary" v-if="isEditing" @click="saveFundDetails">保存</h-button>
        <h-button type="default" v-if="isEditing" @click="cancelEditing">取消</h-button>
      </div>
    </h-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      isEditing: false,
      riskLevels: ['低风险', '中低风险', '中风险', '中高风险', '高风险'],
      fundStates: ['正常', '暂停', '已关闭'],
      originalFund: {
        fund_id: '001',
        fund_name: '稳健成长基金',
        fund_type: '股票型',
        fund_nav: '1.2345',
        fund_est_date: '2021-06-30',
        fund_risk_level: '中风险',
        fund_manager_name: '张三',
        fund_state: '正常',
      },
      editableFund: {},
    };
  },
  mounted() {
    this.initializeData();
    this.initChart();
  },
  methods: {
    initializeData() {
      this.editableFund = { ...this.originalFund };
    },
    initChart() {
      const chartDom = document.getElementById('echarts-main');
      const myChart = echarts.init(chartDom);
      let base = +new Date(1988, 9, 3);
      const oneDay = 24 * 3600 * 1000;
      let data = [[base, Math.random() * 300]];
      for (let i = 1; i < 20000; i++) {
        let now = new Date((base += oneDay));
        data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
      }
      
      const option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: '净值走势图'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20
          },
          {
            start: 0,
            end: 20
          }
        ],
        series: [
          {
            name: 'Data',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: data
          }
        ]
      };

      myChart.setOption(option);
    },
    enableEditing() {
      this.isEditing = true;
    },
    saveFundDetails() {
      // 这里可以调用API保存数据
      console.log('保存产品信息:', this.editableFund);
      this.originalFund = { ...this.editableFund };
      this.isEditing = false;
    },
    cancelEditing() {
      this.initializeData();
      this.isEditing = false;
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
  margin: 10px;
  padding-bottom: 50px; 
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
  margin-top: 20px;
  padding-right: 5px;
  padding-bottom: 10px; 
}
</style>
