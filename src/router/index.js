import Vue from "vue";
import Router from "vue-router";
import home from "@/components/Home";
import userslist from "@/pages/userslist";
import businesslist from "@/pages/Businesslist";
import login from "@/pages/login";
import foodlist from '@/pages/foodlist'
import orderlist from '@/pages/orderlist'
import adminlist from '@/pages/adminlist'
import addshop from '@/pages/addshop'
Vue.use(Router);
export const icon = [
  {
    name: "数据管理",
    icon: 'el-icon-s-order'
  },
  {
    name: "添加数据",
    icon: 'el-icon-plus'
  }
]
export const constantRouterMap = [
  {
    path: "/",
    component: home,
    //重定向
    redirect: "/userslist",
    name: "home",
    //子路由
    children: [
      {
        //子路由
        path: "userslist",
        component: userslist,
        name: "userslist",
        meta: {
          title: "用户列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "businesslist",
        component: businesslist,
        name: "businesslist",
        meta: {
          title: "商家列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "foodlist",
        component: foodlist,
        name: "foodlist",
        meta: {
          title: "食品列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "orderlist",
        component: orderlist,
        name: "orderlist",
        meta: {
          title: "订单列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "adminlist",
        component: adminlist,
        name: "adminlist",
        meta: {
          title: "管理员列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "addshop",
        component: addshop,
        name: "addshop",
        meta: {
          title: "添加商铺",
          type: "添加数据"
        }
      },
    ]
  },
  {
    path: "/login",
    component: login,
    name: "login"
  }
];

export const router = new Router({
  routes: constantRouterMap
});

