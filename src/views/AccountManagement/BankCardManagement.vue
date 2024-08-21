<template>
  <div class="bank-card-management">
    <h3>客户银行卡管理</h3>
    <h-card :border="false" style="margin-bottom:2px; margin-top:-10px;" dis-hover>
      <div class="search-section">
        <h-input v-model="search.cardNumber" placeholder="输入卡号" />
        <h-input v-model="search.accountId" placeholder="输入账户ID" />
        <h-input v-model="search.bankName" placeholder="输入银行名称" />
        <h-button type="primary" @click="searchCards">查找</h-button>
        <h-button @click="resetSearch" style="margin-left: 3px;">重置</h-button>
        <h-button type="primary" @click="addCards">添加银行卡</h-button>
      </div>
    </h-card>
    <h-card :border="false" style="margin-bottom:2px; margin-top:-20px;" dis-hover>
      <h4>银行卡列表</h4>
      <div class="card-list">
        <h-table :columns="columns" :data="currentData"></h-table>
      </div>
    </h-card>
    <div style="position: fixed;bottom: 5%;">
      <h-page :total="total" :page-size="pageSize" @on-change="handlePageChange" show-total></h-page>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 9,
      currentPage: 1,
      search: {
        cardNumber: '',
        accountId: '',
        bankName: '',
      },
      cards: [
        // 示例数据
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        { cardNumber: '1234567890123456', accountId: 'ID001', bankName: '银行A', balance: 10000, showBalance: false },
        { cardNumber: '2345678901234567', accountId: 'ID002', bankName: '银行B', balance: 20000, showBalance: false },
        // 更多银行卡数据...
      ],
      filteredCards: [],
      rechargeAmount: 0, // 用于存储用户输入的充值金额
      columns: [
        { title: '卡号', key: 'cardNumber' },
        { title: '账户ID', key: 'accountId' },
        { title: '银行名称', key: 'bankName' },
        {
          title: '余额',
          key: 'balance',
          render: (h, params) => {
            return h('div', [
              h("h-button", {
                props: {
                  type: "primary",
                  size: "small",
                },
                on: {
                  click: () => {
                    params.row.showBalance = !params.row.showBalance;
                  },
                },
              }, "查看"),
              h('span', {
                style: {
                  marginLeft: '10px'
                }
              }, params.row.showBalance ? params.row.balance : '******')
            ]);
          }
        },
        {
          title: '操作',
          key: 'actions',
          render: (h, params) => {
            return h('div', [
              h("h-button", {
                props: {
                  type: "default",
                  size: "small",
                },
                on: {
                  click: () => {
                    this.recharge(params.row.cardNumber);
                  },
                },
              }, "充值"),
              h("h-button", {
                props: {
                  type: "error",
                  size: "small",
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.confirmDelete(params.row.cardNumber);
                  },
                },
              }, "删除")
            ]);
          }
        }
      ]
    };
  },
  methods: {
    addCards(){
      this.$router.push({ name: 'AccountManagement-AddCreditcard'});
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    searchCards() {
      this.filteredCards = this.cards.filter(card => {
        return (
          (!this.search.cardNumber || card.cardNumber.includes(this.search.cardNumber)) &&
          (!this.search.accountId || card.accountId.includes(this.search.accountId)) &&
          (!this.search.bankName || card.bankName.includes(this.search.bankName))
        );
      });
    },
    resetSearch() {
      this.search.cardNumber = '';
      this.search.accountId = '';
      this.search.bankName = '';
      this.filteredCards = this.cards;
      this.currentPage = 1; // 重置分页
    },
    recharge(cardNumber) {
      this.$hMsgBox.confirm({
        title: "输入密码",
        render: (h) => {
          return h('div', [
            h('p', `请输入卡号 ${cardNumber} 的密码`),
            h('Input', {
              props: {
                type: 'password',
                autofocus: true,
                placeholder: "请输入密码...",
              },
              on: {
                input: (val) => {
                  this.password = val;
                },
              },
            }),
          ]);
        },
        onOk: () => {
          if (this.password === "123") {  // 替换成你的密码验证逻辑
            this.$hMsgBox.confirm({
              title: "充值",
              render: (h) => {
                return h('div', [
                  h('p', `为卡号 ${cardNumber} 充值`),
                  h('Input', {
                    props: {
                      value: this.rechargeAmount,
                      autofocus: true,
                      placeholder: "请输入充值金额...",
                    },
                    on: {
                      input: (val) => {
                        this.rechargeAmount = val;
                      },
                    },
                  }),
                ]);
              },
              onOk: () => {
                if (this.rechargeAmount > 0) {
                  this.$hMessage.success(`卡号 ${cardNumber} 充值 ${this.rechargeAmount} 成功`);
                  this.rechargeAmount = 0; // 重置充值金额
                } else {
                  this.$hMessage.error("请输入有效的充值金额");
                }
              },
              onCancel: () => {
                this.$hMessage.info("取消充值");
                this.rechargeAmount = 0; // 重置充值金额
              },
            });
          } else {
            this.$hMessage.error("密码错误，请重试");
          }
          this.password = ''; // 重置密码输入
        },
        onCancel: () => {
          this.$hMessage.info("取消操作");
          this.password = ''; // 重置密码输入
        },
      });
    },


    confirmDelete(cardNumber) {
      this.$hMsgBox.confirm({
        title: "确认删除",
        content: "<p>您确定要删除这张银行卡吗？</p>",
        onOk: () => {
          this.deleteCard(cardNumber);
        },
        onCancel: () => {
          this.$hMessage.info("取消删除");
        },
      });
    },
    deleteCard(cardNumber) {
      this.cards = this.cards.filter(card => card.cardNumber !== cardNumber);
      this.filteredCards = this.cards;
      this.$hMessage.success("银行卡已删除");
    }
  },
  mounted() {
    this.filteredCards = this.cards;
  },
  computed: {
    total() {
      return this.filteredCards.length;
    },
    currentData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.filteredCards.slice(start, end);
    },
  },
};
</script>

<style scoped>
.bank-card-management {
  margin: 5px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 91vh;
}

.search-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 20px;
}

.card-list {
  margin-top: 5px;
}
</style>
