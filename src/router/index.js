import Vue from "vue";
import Router from "vue-router";
import login from "@/pages/login";
import store from "@/store";
Vue.use(Router);
export const icon = [
  {
    name: "数据管理",
    icon: 'el-icon-s-order'
  },
  {
    name: "添加数据",
    icon: 'el-icon-plus'
  },
  {
    name: "图表",
    icon: 'el-icon-star-on'
  },
  {
    name: "编辑",
    icon: 'el-icon-edit'
  },
  {
    name: "设置",
    icon: 'el-icon-s-tools'
  }
]
export const constantRouterMap = [
  {
    path: "/",
    component: () =>import("@/components/home"),
    //重定向
    redirect: "/userslist",
    name: "home",
    //子路由
    children: [
      {
        //子路由
        path: "userslist",
        component: () =>import("@/pages/userslist"),
        name: "userslist",
        meta: {
          title: "用户列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "businesslist",
        component: () =>import("@/pages/Businesslist"),
        name: "businesslist",
        meta: {
          title: "商家列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "foodlist",
        component: import("@/pages/foodlist"),
        name: "foodlist",
        meta: {
          title: "食品列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "orderlist",
        component: () =>import("@/pages/orderlist"),
        name: "orderlist",
        meta: {
          title: "订单列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "adminlist",
        component:() => import("@/pages/adminlist"),
        name: "adminlist",
        meta: {
          title: "管理员列表",
          type: "数据管理"
        }
      },
      {
        //子路由
        path: "addshop",
        component: () =>import("@/pages/addshop"),
        name: "addshop",
        meta: {
          title: "添加商铺",
          type: "添加数据"
        }
      },
      {
        //子路由
        path: "addgoods",
        component:() => import("@/pages/addgoods"),
        name: "addgoods",
        meta: {
          title: "添加商品",
          type: "添加数据"
        }
      },
      {
        //子路由
        path: "bingtu",
        component:() => import("@/pages/bingtu"),
        name: "bingtu",
        meta: {
          title: "用户分布",
          type: "图表"
        }
      },
      {
        //子路由
        path: "bianjikuang",
        component:() =>import("@/pages/bianjikuang"),
        name: "bianjikuang",
        meta: {
          title: "文本编辑",
          type: "编辑"
        }
      },
      {
        //子路由
        path: "shezhi",
        component:() => import("@/pages/shezhi"),
        name: "shezhi",
        meta: {
          title: "管理员设置",
          type: "设置"
        }
      },
    ]
  },
  {
    path: "/login",
    component: login,
    name: "login"
  },
  
];

export const router = new Router({
  routes: constantRouterMap
});
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach((to, from,next) => {
  if(store.state.userinfo != null||store.state.userinfo != undefined){
      if(to.name=="login"){
        next({path:"/"})
      }else{
        next()
      }
  }else{
   if(to.name != "login"){
    next({path:'/login'})
   }else{
    next()
   }
  }
})

