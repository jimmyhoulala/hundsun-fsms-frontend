<template>
    <div class="cancel-order-container">
        <h3>撤单申请</h3>
        <h-card :border="false" style="margin-bottom:20px" dis-hover>
            <h-form :inline="true" label-width="100px">
                <h-form-item label="交易单号">
                    <h-input v-model="searchParams.transaction_id" />
                </h-form-item>
                <h-form-item label="用户ID">
                    <h-input v-model="searchParams.customer_id" />
                </h-form-item>
                <h-form-item label="用户证件号码">
                    <h-input v-model="searchParams.customer_creditcard_id" />
                </h-form-item>
                <h-form-item label="账号">
                    <h-input v-model="searchParams.account_id" />
                </h-form-item>
                <h-form-item label="产品ID">
                    <h-input v-model="searchParams.fund_id" />
                </h-form-item>

                <h-form-item label="交易类型">
                    <h-select v-model="searchParams.transaction_type">
                        <h-option label="申购" value="buy"></h-option>
                        <h-option label="赎回" value="sell"></h-option>
                    </h-select>
                </h-form-item>
                <h-form-item label="交易状态">
                    <h-select v-model="searchParams.transaction_state">
                        <h-option label="未确认" value=0></h-option>
                        <h-option label="已撤单" value=2></h-option>
                    </h-select>
                </h-form-item>
                <h-form-item label="交易日期">
                    <h-date-picker v-model="searchParams.transaction_date" type="date" />
                </h-form-item>
                <h-form-item style="margin-top:33px">
                    <h-button type="primary" @click="onSearch">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </h-form-item>
            </h-form>
        </h-card>
        <!-- 表格显示 -->
        <h-table :columns="columns" :data="currentData">
        </h-table>
        <h-msg-box v-model="modal1" :escClose="true" title="交易撤单" @on-cancel="cancel" :loading="true"
            :beforeOkClose="beforeOkClose">
            <p>是否确认撤销该订单</p>
        </h-msg-box>
        <div style="position: fixed;bottom: 5%;">
            <h-page :total="total" :page-size="pageSize" @on-change="handlePageChange" show-total></h-page>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchParams: {
                customer_id: '',
                customer_creditcard_id: '',
                transaction_id: '',
                account_id: '',
                fund_id: '',
                transaction_type: '',
                transaction_date: '',
                creditcard_id: '',
                transaction_state: '',
            },
            columns: [
                { title: "交易单号", key: "transaction_id" },
                { title: "用户ID", key: "customer_id" },
                { title: "账号", key: "account_id" },
                { title: "产品ID", key: "fund_id" },
                { title: "交易类型", key: "transaction_type" },
                { title: "交易金额", key: "transaction_amount" },
                { title: "交易日期", key: "transaction_date" },
                { title: "订单状态", key: "transaction_state" },
                {
                    title: "操作",
                    key: "action",
                    width: 150,
                    fixed: "right",
                    render: (h, params) => {
                        console.log(params.row.transaction_state);
                        const isDisabled = params.row.transaction_state === "已撤单";
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small",
                                        disabled: isDisabled, // 根据状态禁用按钮
                                    },
                                    on: {
                                        click: () => {
                                            if (!isDisabled) { // 只有在按钮未禁用时才执行
                                                this.modal1 = true;
                                                this.selectOrder = params.row;
                                            }
                                        },
                                    },
                                },
                                "撤单"
                            ),
                        ]);
                    },
                },

            ],
            selectOrder: '',
            orders: [],
            modal1: false,
            pageSize: 10,
            currentPage: 1,
        };
    },
    created() {
        this.modal1 = false
        this.loadOrders();
    },
    methods: {
        beforetest() {
            return true;
        },
        cancel() {
            this.$hMessage.info("订单未撤销");
        },
        loadOrders() {
            this.orders = [
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                }, {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },
                {
                    transaction_id: "000096",
                    account_id: "930000000096",
                    fund_id: "093000",
                    transaction_type: "buy",
                    transaction_amount: "10000.00",
                    transaction_date: "2021-11-25",
                    customer_id: "20211117000291",
                    transaction_state: "未确认",
                },

                // 其他订单...
            ];
        },
        beforeOkClose() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.$hMessage.info("订单已撤销");
                    console.log("撤单请求:", this.selectOrder);
                    this.selectOrder.transaction_state = "已撤单";
                    resolve(true);
                }, 2000);
            })
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
    },
    computed: {
        total() {
            return this.orders.length;
        },
        currentData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = this.currentPage * this.pageSize;
            return this.orders.slice(start, end);
        },
    }
};
</script>

<style scoped>
h3 {
    margin-bottom: 20px;
}

.h-form {
    margin-bottom: 20px;
}

.cancel-order-container {
    margin: 10px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 91vh;
}
</style>