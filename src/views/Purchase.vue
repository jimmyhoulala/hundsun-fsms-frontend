<template>
  <div class="purchase-container">
    <!-- 上半部分：查询客户信息 -->
    <div class="query-section">
      <el-form :model="searchForm" ref="searchForm" inline>
        <el-row :gutter="0" justify="start">
          <el-col :span="8">
            <el-form-item label="委托方式">
              <el-select v-model="searchForm.delegateType" placeholder="请选择委托方式">
                <el-option label="柜台委托" value="1"></el-option>
                <el-option label="在线委托" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用户账号" class="inline-form-item">
              <el-input v-model="searchForm.accountNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" 
                @mousedown.native="handleMouseDown" 
                @mouseup.native="handleMouseUp" 
                @click="searchCustomer"
                class="query-button">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <transition name="fade">
      <!-- 中间部分：显示客户信息 -->
      <el-card class="info-card">
        <el-form :model="customerInfo" ref="customerForm" label-width="120px" class="info-form">
          <el-row :gutter="20">
            <el-col :span="24" :md="12">
              <el-form-item label="客户姓名">
                <el-input 
                  v-model="customerInfo.name" 
                  :style="getDynamicStyle('name')" 
                  placeholder="——" 
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="客户邮箱">
                <el-input 
                  v-model="customerInfo.email" 
                  :style="getDynamicStyle('email')" 
                  placeholder="——" 
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="证件号码">
                <el-input 
                  v-model="customerInfo.idNumber" 
                  :style="getDynamicStyle('idNumber')" 
                  placeholder="——" 
                  readonly
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24" :md="12">
              <el-form-item label="客户电话">
                <el-input 
                  v-model="customerInfo.phone" 
                  :style="getDynamicStyle('phone')" 
                  placeholder="——" 
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="证件类型">
                <el-input 
                  v-model="customerInfo.idType" 
                  :style="getDynamicStyle('idType')" 
                  placeholder="——" 
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="客户类别">
                <el-input 
                  v-model="customerInfo.category" 
                  :style="getDynamicStyle('category')" 
                  placeholder="——" 
                  readonly
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="风险等级">
                    <el-input 
                      v-model="customerInfo.riskLevel" 
                      :style="getDynamicStyle('riskLevel')" 
                      placeholder="——" 
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="客户账号">
                    <el-input 
                      v-model="customerInfo.accountNumber" 
                      :style="getDynamicStyle('accountNumber')" 
                      placeholder="——" 
                      readonly
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </transition>
    <!-- 下半部分：基金申购表单 -->
<el-card class="purchase-card">
  <el-form :model="purchaseForm" class="purchase-form">
    <el-row :gutter="20">
      <!-- 第一行 -->
      <el-col :span="12">
        <el-form-item label="基金代码">
            <el-input v-model="purchaseForm.fundCode" placeholder="请输入基金代码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="购买金额">
          <el-input v-model="purchaseForm.amount" placeholder="请输入购买金额"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!-- 第二行 -->
      <el-col :span="12">
        <el-form-item label="银行卡号">
          <el-input v-model="purchaseForm.bankCardNumber" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="支持币种">
          <el-select v-model="purchaseForm.currency" placeholder="请选择币种">
            <el-option label="人民币" value="CNY"></el-option>
            <el-option label="美元" value="USD"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!-- 第三行 -->
      <el-col :span="12">
        <el-form-item label="可用金额">
          <el-input v-model="purchaseForm.availableAmount" placeholder="请输入可用金额" disabled></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="用户账号">
          <el-input v-model="purchaseForm.accountNumber" placeholder="请输入用户账号" disabled></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="submit-button">
      <el-button type="primary" 
            @mousedown.native="handleMouseDown" 
            @mouseup.native="handleMouseUp" 
            @click="purchaseFund"
            class="purchase-button">申购</el-button>
    </el-form-item>
  </el-form>
</el-card>


  </div>
</template>

<script>

export default {
   
  data() {
    return {
      searchForm: {
        delegateType: '',
        accountNumber: '',
      },
      customerInfo: {
        name: '',
        email: '',
        idNumber: '',
        phone: '',
        idType: '',
        category: '',
        riskLevel: '',
        accountNumber: '',
      },
      searchTriggered: false,
      purchaseForm: {
        fundCode: '',
        amount: '',
        bankCardNumber: '',
        currency: 'CNY',
        availableAmount: '10000',
        accountNumber: '',
      },
    };
  },
  methods: {
  created() {
  console.log(this.searchForm);
}
,
    searchCustomer() {
      // 模拟查询到的客户信息
      this.customerInfo = {
        name: '张三',
        email: 'zhangsan@example.com',
        idNumber: '444444444444',
        phone: '13800138000',
        idType: '身份证',
        category: '普通客户',
        riskLevel: '0',
        accountNumber: '2022091600001',
      };

      // 将客户账号填入申购表单
      this.purchaseForm.accountNumber = this.customerInfo.accountNumber;

      // 设置搜索已触发
      this.searchTriggered = true;
    },
    purchaseFund() {
      // 申购基金逻辑
      this.$message.success('基金申购成功！');
    },
    handleMouseDown(event) {
      // 改变按钮的颜色或添加点击样式
      event.target.classList.add('clicked');
    },
    handleMouseUp(event) {
      // 移除按钮的点击样式
      event.target.classList.remove('clicked');
    },
    getDynamicStyle(field) {
      return this.searchTriggered ? { color: 'red', fontWeight: 'bold' } : {};
    },
  },
};

</script>

<style scoped>
.query-section {
  margin-bottom: 10px; /* 上半部分与中间部分的间距 */
  padding: 20px; /* 上半部分的内边距 */
  border: 1px solid #dcdfe6; /* 边框样式 */
  border-radius: 12px; /* 边框圆角 */
  background-color: #ffffff; /* 背景颜色 */
}
.purchase-card {
  padding: 20px;
  border: 1px solid #dcdfe6; /* 边框样式 */
  border-radius: 8px; /* 边框圆角，增加到 8px */
  background-color: #ffffff; /* 背景颜色 */
}
.purchase-form .el-form-item {
  margin-bottom: 0; /* 去除下边距 */
}

.purchase-form .el-form-item__label {
  width: 120px; /* 设置标签宽度，使标签对齐 */
}

.purchase-form .el-input,
.purchase-form .el-select {
  width: 100%; /* 确保输入框和选择框占满列宽 */
}

/* 确保每一行的内容垂直对齐 */
.purchase-form .el-row {
  display: flex;
}

.purchase-form .el-col {
  display: flex;
  align-items: center; /* 垂直对齐 */
}

.purchase-form .el-form-item {
  flex: 1; /* 让表单项占据可用空间 */
}


.purchase-container {
  width: 100%; /* 确保容器宽度占满页面 */
  max-width: 1200px;
  margin: 0 auto;
  padding: 7px;
}

.query-section, .purchase-card {
  margin: 0; /* 去除外边距 */
  padding: 0; /* 去除内边距 */
  box-sizing: border-box; /* 包括边框和内边距在宽度计算中 */
}

.info-card {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px; /* 调整内边距 */
  width: 100%; /* 使宽度占满父容器 */
  box-sizing: border-box; /* 包括边框和内边距在宽度计算中 */
}



.el-col {
  padding: 0; /* 去除列的内边距 */
  margin: 0; /* 去除列的外边距 */
}

.el-form-item {
  margin-bottom: 10px; /* 增加表单项之间的间距 */
}

.el-input {
  width: 100%; /* 使输入框宽度占满父容器 */
  box-sizing: border-box;
}

.inline-form-item .el-form-item__label {
  margin-right: 5px; /* 缩小标签与输入框之间的距离 */
}

.submit-button {
  text-align: center; /* 将按钮居中对齐 */
  margin-top: 18px;
}

/* 按钮默认样式 */
.purchase-button, .query-button {
  background-color: #007bff; /* 默认按钮颜色 */
  border-color: #007bff;
  color: #fff; /* 按钮文本颜色 */
  transition: background-color 0.3s ease, border-color 0.3s ease; /* 平滑过渡 */
}

/* 鼠标悬停时的样式 */
.purchase-button:hover, .query-button:hover {
  background-color: #0056b3; /* 悬停时的颜色 */
  border-color: #0056b3;
}

/* 按钮点击时的样式 */
.purchase-button:active, .query-button:active {
  background-color: #003d7a; /* 点击时的颜色 */
  border-color: #003d7a;
}

/* 使按钮颜色在点击后恢复 */
.purchase-button, .query-button {
  background-color: #007bff; /* 恢复颜色 */
  border-color: #007bff;
}
</style>
