<template>
    <div style="overflow: hidden;">
      <h-card :border="false" class="fund-details-card">
        <h3>新增基金产品</h3>
        <h-row type="flex" justify="start">
          <!-- 基金信息输入 -->
          <h-col :span="24">
            <h-form label-width="120px">
              <h-form-item label="产品名" class="compact-form-item">
                <h-input v-model="newFund.fund_name" placeholder="输入产品名" />
              </h-form-item>
              <h-form-item label="产品ID" class="compact-form-item">
                <h-input v-model="newFund.fund_id" placeholder="输入产品ID" />
              </h-form-item>
              <h-form-item label="产品类型" class="compact-form-item">
                <h-input v-model="newFund.fund_type" placeholder="输入产品类型" />
              </h-form-item>
              <h-form-item label="初始净值" class="compact-form-item">
                <h-input v-model="newFund.fund_nav" placeholder="输入初始净值" />
              </h-form-item>
              <h-form-item label="产品发布时间" class="compact-form-item">
                <h-date-picker 
                  v-model="newFund.fund_est_date" 
                  type="date" 
                  placeholder="选择发布日期" 
                />
              </h-form-item>
              <h-form-item label="风险等级" class="compact-form-item">
                <h-select v-model="newFund.fund_risk_level" placeholder="选择风险等级">
                  <h-option v-for="(level, index) in riskLevels" :key="index" :value="level">{{ level }}</h-option>
                </h-select>
              </h-form-item>
              <h-form-item label="基金经理姓名" class="compact-form-item">
                <h-input v-model="newFund.fund_manager_name" placeholder="输入基金经理姓名" />
              </h-form-item>
              <h-form-item label="产品状态" class="compact-form-item">
                <h-select v-model="newFund.fund_state" placeholder="选择产品状态">
                  <h-option v-for="(status, index) in fundStates" :key="index" :value="status">{{ status }}</h-option>
                </h-select>
              </h-form-item>
            </h-form>
          </h-col>
        </h-row>
  
        <div class="action-buttons">
          <h-button type="default" @click="goBack">返回</h-button>
          <h-button type="primary" @click="showConfirmation">保存</h-button>
        </div>
      </h-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        riskLevels: ['低风险', '中低风险', '中风险', '中高风险', '高风险'],
        fundStates: ['正常', '暂停', '已关闭'],
        newFund: {
          fund_id: '',
          fund_name: '',
          fund_type: '',
          fund_nav: '',
          fund_est_date: '',
          fund_risk_level: '',
          fund_manager_name: '',
          fund_state: '',
        },
      };
    },
    methods: {
      showConfirmation() {
        // 检查必填信息是否完整
        if (!this.newFund.fund_name || !this.newFund.fund_id) {
          this.$hMessage.info('请填写所有必填信息');
          return;
        }
  
        // 弹出确认对话框
        this.$hMsgBox.confirm({
          title: "确认新增",
          content: "<p>你确定要新增这个产品吗？</p>",
          onOk: () => {
            this.confirmCreate();
          },
          onCancel: () => {
            this.$hMessage.info("已取消新增");
          },
        });
      },
      confirmCreate() {
        // 发送请求到后端以保存新产品
        axios.post('/api/fund', this.newFund)
          .then(response => {
            this.$hMessage.info('新增成功');
            // 跳转到产品管理界面
            this.$router.push({ name: 'ProductManagement-ProductManage'});
          })
          .catch(error => {
            console.error('Create failed', error);
            this.$hMessage.error('新增失败');
          });
      },
      goBack() {
        this.$router.push({ name: 'ProductManagement-ProductManage'});
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
  
  .action-buttons {
    text-align: right;
    margin-top: 20px;
    padding-right: 5px;
    padding-bottom: 10px;
  }
  </style>
  