<template>
    <div class="transaction-confirmation">
        <h3>交易确认</h3>
        <h-card :border="false" style="margin-bottom: 20px" dis-hover>
            <div class="info-section">
                <Alert type="info" show-icon>
                    <p style="font-family:黑体;font-weight: bolder">
                        系统自动处理前一交易日的交易申请，确认申购和赎回请求。
                    </p>
                </Alert>
            </div>

            <div class="button-section">
                <Button v-if="activeTab === 'purchaseOrders'" type="primary" @click="confirmPurchaseTransactions"
                    :disabled="purchaseConfirmed" :loading="loading">
                    启动申购确认
                </Button>
                <Button v-if="activeTab === 'redemptionOrders'" type="primary" @click="confirmRedemptionTransactions"
                    :disabled="redemptionConfirmed" :loading="loading">
                    启动赎回确认
                </Button>
            </div>

            <h-tabs v-model="activeTab">
                <h-tab-pane label="申购订单" name="purchaseOrders">
                    <Table :columns="columns" :data="currentData1"></Table>
                </h-tab-pane>
                <h-tab-pane label="赎回订单" name="redemptionOrders">
                    <Table :columns="columns" :data="currentData2"></Table>
                </h-tab-pane>
            </h-tabs>
            <div v-if="activeTab === 'purchaseOrders'" :key="redemptionKey" style="position: fixed;bottom: 5%;">
                <h-page :total="total1" :page-size="pageSize" @on-change="handlePageChange1" show-total></h-page>
            </div>
            <div v-if="activeTab === 'redemptionOrders'" :key="redemptionKey" style="position: fixed;bottom: 5%;">
                <h-page :total="total2" :page-size="pageSize" @on-change="handlePageChange2" show-total></h-page>
            </div>

        </h-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            redemptionKey: 0,
            pageSize: 10,
            currentPage1: 1,
            currentPage2: 1,
            activeTab: "purchaseOrders",
            loading: false,
            purchaseConfirmed: false,
            redemptionConfirmed: false,
            purchaseOrders: [],
            redemptionOrders: [],
            columns: [
                { title: "交易ID", key: "transaction_id" },
                { title: "账户ID", key: "account_id" },
                { title: "基金ID", key: "fund_id" },
                { title: "交易类型", key: "transaction_type" },
                { title: "交易金额", key: "transaction_amount" },
                { title: "交易份额", key: "transaction_share" },
                { title: "交易日期", key: "transaction_date" },
                { title: "客户ID", key: "customer_id" },
                { title: "交易状态", key: "transaction_state" },
            ],
        };
    },
    watch: {
        activeTab(newVal) {
            if (newVal === 'redemptionOrders') {
                this.currentPage1 = 1;
                this.currentPage2 = 1;
                this.redemptionKey += 1;
            } else if (newVal === 'purchaseOrders') {
                this.currentPage1 = 1;
                this.currentPage2 = 1;
                this.redemptionKey += 1;
            }
        }
    }
    ,
    methods: {
        confirmPurchaseTransactions() {
            this.loading = true;
            setTimeout(() => {
                this.purchaseOrders.forEach(order => {
                    order.transaction_state = "已确认";
                });
                this.purchaseConfirmed = true;
                this.loading = false;
            }, 2000);
        },
        confirmRedemptionTransactions() {
            this.loading = true;
            setTimeout(() => {
                this.redemptionOrders.forEach(order => {
                    order.transaction_state = "已确认";
                });
                this.redemptionConfirmed = true;
                this.loading = false;
            }, 2000);
        },
        handlePageChange1(page1) {
            this.currentPage1 = page1;
        },
        handlePageChange2(page2) {
            this.currentPage2 = page2;
        },
        loadTransactionData() {
            // 模拟加载数据
            this.purchaseOrders = [
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_share: "0.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认"
                },
                // 更多模拟数据...
            ];

            this.redemptionOrders = [
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                {
                    transaction_id: "000097",
                    account_id: "930000000097",
                    fund_id: "093001",
                    transaction_type: "sell",
                    transaction_amount: "0.00",
                    transaction_share: "500.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000292",
                    transaction_state: "未确认"
                },
                // 更多模拟数据...
            ];
        }
    },
    mounted() {
        this.loadTransactionData();
    },
    computed: {
        total1() {
            return this.purchaseOrders.length;
        },
        total2() {
            return this.redemptionOrders.length;
        },
        currentData1() {
            const start = (this.currentPage1 - 1) * this.pageSize;
            const end = this.currentPage1 * this.pageSize;
            return this.purchaseOrders.slice(start, end);
        },
        currentData2() {
            const start = (this.currentPage2 - 1) * this.pageSize;
            const end = this.currentPage2 * this.pageSize;
            return this.redemptionOrders.slice(start, end);
        },
    }
};
</script>

<style scoped>
.transaction-confirmation {
    margin: 10px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 91vh;
}

h3 {
    margin-bottom: 20px;
}

.info-section {
    margin-bottom: 30px;
}

.button-section {
    margin-bottom: 20px;
}

h-tabs {
    margin-top: 20px;
}

h-tab-pane {
    padding: 10px;
}

.table {
    margin-top: 20px;
}
</style>
