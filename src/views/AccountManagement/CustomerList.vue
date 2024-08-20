<template>
    <div class="customer-management-container">
        <h3>用户管理</h3>
        <h-card :border="false" style="margin-bottom:20px" dis-hover>
            <h-form :inline="true" label-width="100px">
                <!-- 搜索表单 -->
                <h-form-item label="用户ID">
                    <h-input v-model="searchParams.customer_id" />
                </h-form-item>
                <h-form-item label="用户姓名">
                    <h-input v-model="searchParams.customer_name" />
                </h-form-item>
                <h-form-item label="用户类型">
                    <h-select v-model="searchParams.customer_type">
                        <h-option label="个人" value="individual"></h-option>
                        <h-option label="机构" value="organization"></h-option>
                    </h-select>
                </h-form-item>
                <h-form-item label="手机号">
                    <h-input v-model="searchParams.customer_phone" />
                </h-form-item>
                <h-form-item style="margin-top:33px">
                    <h-button type="primary" @click="onSearch">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </h-form-item>
            </h-form>
        </h-card>
        <!-- 表格显示 -->
        <h-table class="customer-table" :columns="columns" :data="currentData">
        </h-table>
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
                customer_name: '',
                customer_type: '',
                customer_phone: '',
            },
            columns: [
                { title: "用户ID", key: "customer_id" },
                { title: "用户姓名", key: "customer_name" },
                { title: "用户类型", key: "customer_type" },
                { title: "手机号", key: "customer_phone" },
                {
                    title: "操作",
                    key: "action",
                    width: 200,
                    fixed: "right",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small",
                                    },
                                    on: {
                                        click: () => {
                                            this.viewDetails(params.row);
                                        },
                                    },
                                },
                                "查看/编辑详细信息"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small",
                                    },
                                    style: {
                                        marginLeft: '10px',
                                    },
                                    on: {
                                        click: () => {
                                            this.confirmDelete(params.row);
                                        },
                                    },
                                },
                                "删除"
                            ),
                        ]);
                    },
                },
            ],
            customers: [],
            pageSize: 9,
            currentPage: 1,
        };
    },
    created() {
        this.loadCustomers();
    },
    methods: {
        loadCustomers() {
            this.customers = [
                {
                    customer_id: "C001",
                    customer_name: "张三",
                    customer_type: "个人",
                    customer_phone: "13800000001",
                },
                {
                    customer_id: "C002",
                    customer_name: "李四",
                    customer_type: "机构",
                    customer_phone: "13800000002",
                },
                {
                    customer_id: "C003",
                    customer_name: "王五",
                    customer_type: "个人",
                    customer_phone: "13800000003",
                },
                {
                    customer_id: "C004",
                    customer_name: "赵六",
                    customer_type: "机构",
                    customer_phone: "13800000004",
                },
                {
                    customer_id: "C001",
                    customer_name: "张三",
                    customer_type: "个人",
                    customer_phone: "13800000001",
                },
                {
                    customer_id: "C002",
                    customer_name: "李四",
                    customer_type: "机构",
                    customer_phone: "13800000002",
                },
                {
                    customer_id: "C003",
                    customer_name: "王五",
                    customer_type: "个人",
                    customer_phone: "13800000003",
                },
                {
                    customer_id: "C004",
                    customer_name: "赵六",
                    customer_type: "机构",
                    customer_phone: "13800000004",
                },
                {
                    customer_id: "C001",
                    customer_name: "张三",
                    customer_type: "个人",
                    customer_phone: "13800000001",
                },
                {
                    customer_id: "C002",
                    customer_name: "李四",
                    customer_type: "机构",
                    customer_phone: "13800000002",
                },
                {
                    customer_id: "C003",
                    customer_name: "王五",
                    customer_type: "个人",
                    customer_phone: "13800000003",
                },
                {
                    customer_id: "C004",
                    customer_name: "赵六",
                    customer_type: "机构",
                    customer_phone: "13800000004",
                },
                {
                    customer_id: "C001",
                    customer_name: "张三",
                    customer_type: "个人",
                    customer_phone: "13800000001",
                },
                {
                    customer_id: "C002",
                    customer_name: "李四",
                    customer_type: "机构",
                    customer_phone: "13800000002",
                },
                {
                    customer_id: "C003",
                    customer_name: "王五",
                    customer_type: "个人",
                    customer_phone: "13800000003",
                },
                {
                    customer_id: "C004",
                    customer_name: "赵六",
                    customer_type: "机构",
                    customer_phone: "13800000004",
                },
            ];
        },
        onSearch() {
            // 实现查询逻辑
            console.log("查询参数:", this.searchParams);
        },
        onReset() {
            this.searchParams = {
                customer_id: '',
                customer_name: '',
                customer_type: '',
                customer_phone: '',
            };
        },
        viewDetails(customer) {
            // 实现查看详细信息逻辑
            console.log("查看/编辑用户详细信息:", customer);
            this.$router.push({ name: 'AccountManagement-CustomerDetails', query: { customer_id: customer.customer_id } });
        },
        confirmDelete(customer) {
            this.$hMsgBox.confirm({
                title: "删除确认",
                content: `<p>确定要删除用户 <b>${customer.customer_name}</b> 吗？</p> <p>此操作将同时删除该用户下的所有账户，请谨慎操作！</p>`,
                onOk: () => {
                    this.deleteCustomer(customer);
                },
                onCancel: () => {
                    this.$hMessage.info("取消删除");
                },
            });
        },
        deleteCustomer(customer) {
            // 实现删除用户逻辑
            this.customers = this.customers.filter(c => c.customer_id !== customer.customer_id);
            this.$hMessage.info(`用户 ${customer.customer_name} 已删除`);
            console.log("删除用户:", customer.customer_id);
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
    },
    computed: {
        total() {
            return this.customers.length;
        },
        currentData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = this.currentPage * this.pageSize;
            return this.customers.slice(start, end);
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

.customer-management-container {
    margin: 10px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 91vh;
}

.customer-table {
    margin-top: -60px;  
}
</style>
