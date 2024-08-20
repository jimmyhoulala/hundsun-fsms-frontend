<template>
    <div class="bank-card-management">
      <h3>客户银行卡管理</h3>
      <h-card :border="false" style="margin-bottom:2px; margin-top:-10px;" dis-hover>
        <div class="search-section">
          <h-input v-model="search.cardNumber" placeholder="输入卡号" />
          <h-input v-model="search.accountId" placeholder="输入账户ID" />
          <h-input v-model="search.bankName" placeholder="输入银行名称" />
          <h-button type="primary" @click="searchCards">查找</h-button>
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
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
          { cardNumber: '3456789012345678', accountId: 'ID003', bankName: '银行C', balance: 30000, showBalance: false },
        ],
        filteredCards: [],
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
                      console.log(111)
                      params.row.showBalance = !params.row.showBalance;
                    },
                  },
                },
                  "查看"),
                h('span', {
                  style: {
                    marginLeft: '10px'
                  }
                }, params.row.showBalance ? params.row.balance : '******')
              ]);
            }
          }
        ]
      };
    },
    methods: {
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
    },
    mounted() {
      this.filteredCards = this.cards;
      console.log(this.filteredCards.length)
      console.log(this.pageSize)
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
  }
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