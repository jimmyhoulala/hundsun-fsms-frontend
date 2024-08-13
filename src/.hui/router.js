import { initRouter, initRouterLayout } from '@hsui/core'

export default initRouter(
  [
    {
      path: '/',
      component: initRouterLayout((layout) => {
        return import('@/layouts/' + layout + '.vue')
      }),
      children: [
        {
          name: 'index',
          path: '',
          component: Index,
        },
        {
          name: 'AccountSettlement',
          path: 'AccountSettlement',
          component: AccountSettlement,
        },
        {
          name: 'BankCardManagement',
          path: 'BankCardManagement',
          component: BankCardManagement,
        },
        {
          name: 'Consult',
          path: 'Consult',
          component: Consult,
        },
        {
          name: 'CreateAccount',
          path: 'CreateAccount',
          component: CreateAccount,
        },
        {
          name: 'Home',
          path: 'Home',
          component: Home,
        },
        {
          name: 'ProductManagement',
          path: 'ProductManagement',
          component: ProductManagement,
          children: [
            {
              name: 'ProductManagement-ProductAdd',
              path: 'ProductAdd',
              component: ProductManagementProductAdd,
            },
            {
              name: 'ProductManagement-ProductManage',
              path: 'ProductManage',
              component: ProductManagementProductManage,
            },
          ],
        },
        {
          name: 'Purchase',
          path: 'Purchase',
          component: Purchase,
        },
        {
          name: 'Redemption',
          path: 'Redemption',
          component: Redemption,
        },
        {
          name: 'TeamIntroduction',
          path: 'TeamIntroduction',
          component: TeamIntroduction,
        },
        {
          name: 'BusinessQuery-CancelOrder',
          path: 'BusinessQuery/CancelOrder',
          component: BusinessQueryCancelOrder,
        },
        {
          name: 'BusinessQuery-TransactionQuery',
          path: 'BusinessQuery/TransactionQuery',
          component: BusinessQueryTransactionQuery,
        },
        {
          name: 'Settlement-DailyInitiate',
          path: 'Settlement/DailyInitiate',
          component: SettlementDailyInitiate,
        },
        {
          name: 'Settlement-DataOutput',
          path: 'Settlement/DataOutput',
          component: SettlementDataOutput,
        },
        {
          name: 'Settlement-SettlementLog',
          path: 'Settlement/SettlementLog',
          component: SettlementSettlementLog,
        },
        {
          name: 'Settlement-TransactionConfirm',
          path: 'Settlement/TransactionConfirm',
          component: SettlementTransactionConfirm,
        },
        {
          name: '__404__',
          path: '*',
          component: __404__,
        },
      ],
    },
  ],
  { base: '/', mode: 'hash' }
)

function Index() {
  return import(/* webpackChunkName: "index" */ '@/views/index.vue')
}
function AccountSettlement() {
  return import(
    /* webpackChunkName: "AccountSettlement" */ '@/views/AccountSettlement.vue'
  )
}
function BankCardManagement() {
  return import(
    /* webpackChunkName: "BankCardManagement" */ '@/views/BankCardManagement.vue'
  )
}
function Consult() {
  return import(/* webpackChunkName: "Consult" */ '@/views/Consult.vue')
}
function CreateAccount() {
  return import(
    /* webpackChunkName: "CreateAccount" */ '@/views/CreateAccount.vue'
  )
}
function Home() {
  return import(/* webpackChunkName: "Home" */ '@/views/Home.vue')
}
function ProductManagement() {
  return import(
    /* webpackChunkName: "ProductManagement" */ '@/views/ProductManagement.vue'
  )
}
function ProductManagementProductAdd() {
  return import(
    /* webpackChunkName: "ProductManagement-ProductAdd" */ '@/views/ProductManagement/ProductAdd.vue'
  )
}
function ProductManagementProductManage() {
  return import(
    /* webpackChunkName: "ProductManagement-ProductManage" */ '@/views/ProductManagement/ProductManage.vue'
  )
}
function Purchase() {
  return import(/* webpackChunkName: "Purchase" */ '@/views/Purchase.vue')
}
function Redemption() {
  return import(/* webpackChunkName: "Redemption" */ '@/views/Redemption.vue')
}
function TeamIntroduction() {
  return import(
    /* webpackChunkName: "TeamIntroduction" */ '@/views/TeamIntroduction.vue'
  )
}
function BusinessQueryCancelOrder() {
  return import(
    /* webpackChunkName: "BusinessQuery-CancelOrder" */ '@/views/BusinessQuery/CancelOrder.vue'
  )
}
function BusinessQueryTransactionQuery() {
  return import(
    /* webpackChunkName: "BusinessQuery-TransactionQuery" */ '@/views/BusinessQuery/TransactionQuery.vue'
  )
}
function SettlementDailyInitiate() {
  return import(
    /* webpackChunkName: "Settlement-DailyInitiate" */ '@/views/Settlement/DailyInitiate.vue'
  )
}
function SettlementDataOutput() {
  return import(
    /* webpackChunkName: "Settlement-DataOutput" */ '@/views/Settlement/DataOutput.vue'
  )
}
function SettlementSettlementLog() {
  return import(
    /* webpackChunkName: "Settlement-SettlementLog" */ '@/views/Settlement/SettlementLog.vue'
  )
}
function SettlementTransactionConfirm() {
  return import(
    /* webpackChunkName: "Settlement-TransactionConfirm" */ '@/views/Settlement/TransactionConfirm.vue'
  )
}
function __404__() {
  return import(/* webpackChunkName: "__404__" */ '@/views/__404__.vue')
}
