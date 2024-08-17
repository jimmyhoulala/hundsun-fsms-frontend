<template>
    <div class="settlement-log">
        <h3>清算日志</h3>
        <h-card :border="false" style="margin-bottom:20px" dis-hover>
            <h-card :border="false" style="margin-bottom:10px" dis-hover>
                <h5>今日清算状态</h5>
                <h-alert v-if="settlementStatus === 1" type="success" show-icon>
                    <p style="font-family:黑体;font-weight: bolder"></p>
                    今日清算已完成。处理人员: {{ handler }}，处理时间: {{ handleTime }}
                </h-alert>
                <h-alert v-else type="warning" style="margin-top:20px;margin-bottom:20px" show-icon>
                    <p style="font-family:黑体;font-weight: bolder">
                        今日尚未清算，请及时完成清算操作。</p>
                </h-alert>
                <h-button v-if="!settlementStatus" type="primary" @click="navigate('DailyInitiate')">日初始化</h-button>
                <h-button v-if="!settlementStatus" type="primary"
                    @click="navigate('TransactionConfirm')">交易确认</h-button>
            </h-card>
            <h-card :border="false" style="margin-bottom:20px" dis-hover>
                <h5>每日清算日志</h5>
                <div>
                    <h-table :columns="columns" :data="currentData"></h-table>
                </div>
                <div style="position: fixed;bottom: 5%;">
                    <h-page :total="total" :page-size="pageSize" @on-change="handlePageChange" show-total></h-page>
                </div>
            </h-card>
        </h-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            settlementStatus: 0, // 假数据，实际应从系统获取
            handler: '张三', // 假数据，实际应从系统获取
            handleTime: '2024-08-09 10:00', // 假数据，实际应从系统获取
            currentPage: 1,
            pageSize: 10,
            columns: [
                {
                    title: '清算日期',
                    key: 'date',
                },
                {
                    title: '清算状态',
                    key: 'status',
                },
                {
                    title: '处理人员',
                    key: 'handler',
                },
                {
                    title: '处理时间',
                    key: 'time',
                },
            ],
            logData: [
                {
                    date: '2024-08-09',
                    status: '未完成',
                    handler: '张三',
                    time: '2024-08-09 09:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
                {
                    date: '2024-08-08',
                    status: '已完成',
                    handler: '李华',
                    time: '2024-08-08 10:00',
                },
            ],
        };
    },
    methods: {
        navigate(dest) {
            this.$router.push(dest)
            this.$nextTick(() => {
                window.location.reload();
            });
        },
        handlePageChange(page) {
            this.currentPage = page;
        },
    },
    computed: {
        total() {
            return this.logData.length;
        },
        currentData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.logData.slice(start, end);
        },
    },
};
</script>

<style scoped>
.settlement-log {
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

.log-details {
    margin-top: 20px;
}

h4 {
    font-size: 20px;
    margin-bottom: 20px;
}

h5 {
    font-size: 18px;
    margin-bottom: 10px;
}
</style>