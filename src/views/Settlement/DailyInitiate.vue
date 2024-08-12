<template>
    <div class="daily-initialization">
        <h3>日初始化</h3>
        <h-card :border="false" style="margin-bottom:20px" dis-hover>
            <div style="margin-bottom:30px">
                <Alert type="info" show-icon>
                    <p style="font-family:黑体;font-weight: bolder">
                        启动日初始化功能，更新系统当前工作日并生成产品净值数据。当前操作员工：员工A；当前日期：<strong>{{
                            currentWorkDay }}</strong></p>
                </Alert>
            </div>
            <div style="margin-bottom: 30px;">
                <Button type="primary" @click="startInitialization" :loading="loading1"
                    :disabled="initializationDone">启动日初始化</Button>
                <Button type="success" @click="confirmInitialization" :loading="loading2"
                    :disabled="confirmDone">确认日初始化</Button>
            </div>
            <div title="日初始化结果" :footer-hide="true">
                <p style="font-family:黑体;font-weight: bolder;margin-bottom: 30px;">新工作日: <strong>{{ newWorkDay
                        }}</strong></p>
                <Table :columns="columns" :data="currentData"></Table>
            </div>
            <div style="position: fixed;bottom: 5%;">
                <h-page :total="total" :page-size="pageSize" @on-change="handlePageChange" show-total></h-page>
            </div>
        </h-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageSize: 10,
            currentPage: 1,
            newWorkDay: '',
            loading1: false,
            loading2: false,
            initializationDone: false,
            confirmDone: true,
            netValues: this.generateNetValues(),
            currentWorkDay: new Date().toISOString().split('T')[0].replace(/-/g, '/'), // 只取年月日，并替换为斜杠格式

            columns: [
                {
                    title: '产品ID',
                    key: 'productId',
                },
                {
                    title: '前一工作日净值',
                    key: 'previousNetValue',
                },
                {
                    title: '当日净值',
                    key: 'newNetValue',
                    render: (h, params) => {
                        return h('span', {}, params.row.newNetValue || '未初始化');
                    }
                },
            ],
        };
    },
    methods: {
        startInitialization() {
            this.loading1 = true;

            setTimeout(() => {
                // 模拟初始化逻辑
                this.newWorkDay = this.calculateNewWorkDay(this.currentWorkDay);
                console.log(this.currentWorkDay)
                console.log(this.newWorkDay)
                this.netValues = this.generateNetValues(true);
                this.confirmDone = false;

                this.loading1 = false;
            }, 2000);
        },
        confirmInitialization() {
            this.loading2 = true;
            this.initializationDone = true;

            setTimeout(() => {
                this.confirmDone = true;
                this.loading2 = false;
            }, 2000);
        },
        calculateNewWorkDay(currentDate) {
            // 假设计算新工作日的逻辑
            let newDate = new Date(currentDate);
            console.log(newDate)
            console.log(newDate.getDay())
            // 如果是周末，跳过到下一个工作日
            while (newDate.getDay() === 0) {
                newDate.setDate(newDate.getDate() + 1);
            }
            while (newDate.getDay() === 6) {
                newDate.setDate(newDate.getDate() + 2);
            }
            console.log(newDate)
            var hour = newDate.getHours() + 8
            newDate.setHours(hour)
            return newDate.toISOString().split('T')[0].replace(/-/g, '/');
        },
        generateNetValues(initialized = false) {
            // 假设生成新的净值数据
            let products = [
                { productId: '001', previousNetValue: 100.00 },
                { productId: '002', previousNetValue: 105.50 },
                { productId: '003', previousNetValue: 98.75 },
                { productId: '004', previousNetValue: 98.75 },
                { productId: '005', previousNetValue: 98.75 },
                { productId: '006', previousNetValue: 98.75 },
                { productId: '007', previousNetValue: 98.75 },
                { productId: '008', previousNetValue: 98.75 },
                { productId: '009', previousNetValue: 98.75 },
                { productId: '010', previousNetValue: 98.75 },
                { productId: '011', previousNetValue: 98.75 },
                { productId: '012', previousNetValue: 98.75 },
                { productId: '013', previousNetValue: 98.75 },
                { productId: '014', previousNetValue: 98.75 },
                { productId: '015', previousNetValue: 98.75 },
            ];

            return products.map(product => {
                let newNetValue = initialized ? (product.previousNetValue * (0.9 + Math.random() * 0.2)).toFixed(2) : '';
                return {
                    productId: product.productId,
                    previousNetValue: product.previousNetValue.toFixed(2),
                    newNetValue,
                };
            });
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
    },
    computed: {
        total() {
            return this.netValues.length;
        },
        currentData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = this.currentPage * this.pageSize;
            return this.netValues.slice(start, end);
        },
    }
};
</script>

<style scoped>
.daily-initialization {
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
    margin-bottom: 20px;
    text-align: center;
}

.button-section {
    text-align: center;
}
</style>
