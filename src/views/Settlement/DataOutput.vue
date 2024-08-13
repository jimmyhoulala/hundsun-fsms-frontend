<template>
    <div class="output-main">
        <h3>数据导出</h3>

        <h-card :border="false" style="margin-bottom:20px" dis-hover>

            <div class="info-section">
                <Alert type="info" show-icon>
                    <p style="font-family:黑体;font-weight: bolder">
                        选择日期范围并导出每日交易申请数据。
                    </p>
                </Alert>
            </div>

            <!-- 日期选择和文件格式选择 -->
            <div class="export-options">
                <h-date-picker v-model="dateRange" @on-change="onDateChange" type="daterange" placeholder="选择日期范围"
                    style="width: 300px;"></h-date-picker>
                <h-select v-model="fileFormat" placeholder="选择文件格式" style="width: 200px; margin-left: 20px;">
                    <h-option value="csv">CSV</h-option>
                    <h-option value="excel">Excel</h-option>
                </h-select>
                <h-button :disabled="!dateRangeOutput" type="primary" @click="loadData" style="margin-left: 20px;"
                    :loading="loading">加载数据</h-button>
                <h-button v-if="filteredData.length" type="primary" @click="exportData"
                    style="margin-left: 20px;">导出数据</h-button>
            </div>

            <!-- 数据展示 -->
            <div v-if="filteredData.length" class="data-table">
                <h-table :columns="columns" :data="currentData"></h-table>
                <div style="position: fixed;bottom: 5%;">
                    <h-page :total="total" :page-size="pageSize" @on-change="handlePageChange" show-total></h-page>
                </div>
            </div>
        </h-card>
    </div>

</template>

<script>
export default {
    data() {
        return {
            dateselect: 0,
            dateRange: null,
            dateRangeOutput: null,
            fileFormat: null,
            loading: false,
            columns: [
                {
                    title: "交易ID",
                    key: "transaction_id",
                },
                {
                    title: "客户ID",
                    key: "customer_id",
                },
                {
                    title: "基金ID",
                    key: "fund_id",
                },
                {
                    title: "交易类型",
                    key: "transaction_type",
                },
                {
                    title: "交易金额",
                    key: "transaction_amount",
                },
                {
                    title: "交易份额",
                    key: "transaction_share",
                },
                {
                    title: "交易日期",
                    key: "transaction_date",
                },
            ],
            data: [
                {
                    transaction_id: 'T001',
                    customer_id: 'C001',
                    fund_id: 'F001',
                    transaction_type: '申购',
                    transaction_amount: 10000,
                    transaction_share: 100,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                {
                    transaction_id: 'T002',
                    customer_id: 'C002',
                    fund_id: 'F002',
                    transaction_type: '赎回',
                    transaction_amount: 5000,
                    transaction_share: 50,
                    transaction_date: '2024-08-12',
                },
                // 这里添加更多假数据
            ],
            filteredData: [],
            currentPage: 1,
            pageSize: 10,
        };
    },
    computed: {
        total() {
            return this.filteredData.length;
        },
        currentData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredData.slice(start, end);
        },
    },
    methods: {
        onDateChange(value) {
            console.log(value)
            this.dateRangeOutput = value
            if (value.length) {
                this.dateselect = 1
            }
        },
        loadData() {
            // 假数据
            this.loading = true;
            setTimeout(() => {
                this.filteredData = this.data
                this.loading = false;
            }, 2000);
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
        exportData() {
            if (this.filteredData.length && this.fileFormat) {
                const fileName = `transaction_data_${this.dateRangeOutput[0]}_to_${this.dateRangeOutput[1]}.${this.fileFormat === 'csv' ? 'csv' : 'xlsx'}`;

                if (this.fileFormat === 'csv') {
                    this.exportToCSV(fileName);
                } else if (this.fileFormat === 'excel') {
                    this.exportToExcel(fileName);
                }
            } else {
                this.$hMessage.info("请选择文件格式");
            }
        },
        exportToCSV(fileName) {
            let csvContent = "data:text/csv;charset=utf-8,"
                + this.columns.map(col => col.title).join(",") + "\n"
                + this.filteredData.map(row => {
                    return this.columns.map(col => row[col.key]).join(",");
                }).join("\n");

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            this.exportStatus = `数据导出成功！文件名: ${fileName}`;
        },
        exportToExcel(fileName) {
            // 使用xlsx.js或其他库实现Excel文件导出
            const XLSX = require('xlsx');
            const ws = XLSX.utils.json_to_sheet(this.filteredData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Transactions");
            XLSX.writeFile(wb, fileName);

            this.exportStatus = `数据导出成功！文件名: ${fileName}`;
        },
    },
};
</script>

<style scoped>
.output-main {
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

.export-data-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-section {
    margin-bottom: 30px;
}


.export-options {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.data-table {
    margin-top: 80px;
}

.status-section {
    text-align: center;
    margin-top: 20px;
}
</style>
