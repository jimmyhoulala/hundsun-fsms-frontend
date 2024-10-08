<template>
    <div class="product-management-container">
        <h3>产品管理</h3>
        <h-card :border="false" style="margin-bottom:20px" dis-hover>
            <h-form :inline="true" label-width="100px">
                <!-- 搜索表单 -->
                <h-form-item label="产品ID">
                    <h-input v-model="searchParams.fund_id" />
                </h-form-item>
                <h-form-item label="产品名称">
                    <h-input v-model="searchParams.fund_name" />
                </h-form-item>
                <h-form-item label="产品类型">
                    <h-input v-model="searchParams.fund_type" />
                </h-form-item>
                <h-form-item label="风险等级">
                    <h-select v-model="searchParams.fund_risk_level">
                        <h-option label="低风险" value="1"></h-option>
                        <h-option label="中低风险" value="2"></h-option>
                        <h-option label="中风险" value="3"></h-option>
                        <h-option label="中高风险" value="4"></h-option>
                        <h-option label="高风险" value="5"></h-option>
                    </h-select>
                </h-form-item>
                <h-form-item label="产品状态">
                    <h-select v-model="searchParams.fund_state">
                        <h-option label="正常" value="1"></h-option>
                        <h-option label="暂停" value="2"></h-option>
                        <h-option label="已关闭" value="3"></h-option>
                    </h-select>
                </h-form-item>
                <h-form-item style="margin-top:33px">
                    <h-button type="primary" @click="onSearch">查询</h-button>
                    <h-button @click="onReset">重置</h-button>
                </h-form-item>
            </h-form>
        </h-card>
        <!-- 表格显示 -->
        <h-table class="product-table" :columns="columns" :data="currentData">
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
                fund_id: '',      
                fund_name: '',
                fund_type: '',
                fund_risk_level: '',
                fund_state: '',
            },
            columns: [
                { title: "产品ID", key: "fund_id" },
                { title: "产品名称", key: "fund_name" },
                { title: "产品类型", key: "fund_type" },
                {
                    title: "风险等级",
                    key: "fund_risk_level",
                    render: (h, params) => {
                        const riskLevelMap = {
                            1: "低风险",
                            2: "中低风险",
                            3: "中风险",
                            4: "中高风险",
                            5: "高风险",
                        };
                        return h("span", riskLevelMap[params.row.fund_risk_level]);
                    },
                },
                {
                    title: "产品状态",
                    key: "fund_state",
                    render: (h, params) => {
                        const stateMap = {
                            1: "正常",
                            2: "暂停",
                            3: "已关闭",
                        };
                        return h("span", stateMap[params.row.fund_state]);
                    },
                },
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
            products: [],
            pageSize: 9,
            currentPage: 1,
        };
    },
    created() {
        this.loadProducts();
    },
    methods: {
        loadProducts() {
            this.products = [
                {
                    fund_id: "001",
                    fund_name: "稳健成长基金",
                    fund_type: "股票型",
                    fund_risk_level: 3,  
                    fund_state: 1,  
                },
                {
                    fund_id: "002",
                    fund_name: "保守收益基金",
                    fund_type: "债券型",
                    fund_risk_level: 1,  
                    fund_state: 1,  
                },
                {
                    fund_id: "003",
                    fund_name: "高增长基金",
                    fund_type: "混合型",
                    fund_risk_level: 5, 
                    fund_state: 2,  
                },
                {
                    fund_id: "004",
                    fund_name: "稳定收益基金",
                    fund_type: "货币型",
                    fund_risk_level: 2, 
                    fund_state: 1,  
                },
            ];
        },
        onSearch() {
            // 实现查询逻辑
            console.log("查询参数:", this.searchParams);
        },
        onReset() {
            this.searchParams = {
                fund_id: '',
                fund_name: '',
                fund_type: '',
                fund_risk_level: '',
                fund_state: '',
            };
        },
        viewDetails(product) {
            // 实现查看详细信息逻辑
            console.log("查看/编辑产品详细信息:", product);
            this.$router.push({ name: 'ProductManagement-ProductDetails', query: { fund_id: product.fund_id } });
        },
        confirmDelete(product) {
            this.$hMsgBox.confirm({
                title: "删除确认",
                content: `<p>确定要删除产品 <b>${product.fund_name}</b> 吗？</p>`,
                onOk: () => {
                    this.deleteProduct(product);
                },
                onCancel: () => {
                    this.$hMessage.info("取消删除");
                },
            });
        },
        deleteProduct(product) {
            // 实现删除产品逻辑
            this.products = this.products.filter(p => p.fund_id !== product.fund_id);
            this.$hMessage.info(`产品 ${product.fund_name} 已删除`);
            console.log("删除产品:", product.fund_id);
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
    },
    computed: {
        total() {
            return this.products.length;
        },
        currentData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = this.currentPage * this.pageSize;
            return this.products.slice(start, end);
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

.product-management-container {
    margin: 10px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 91vh;
}

.product-table {
    margin-top: -60px;  
}
</style>
