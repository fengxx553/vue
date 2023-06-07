//引入vue
import Vue from "vue";
//引入vuex
import Vuex from "vuex";
Vue.use(Vuex);
import { constantRouterMap } from "../router/index";
import { routerlist } from "../uitll/index";
import { getadmininfo } from "@/api";
//实例化vuex
//创建vuex实例
const store = new Vuex.Store({
  state: {
    routers: constantRouterMap, //存储路由
    userinfo:{}
  },
  actions: {
   async getadmininfo({commit}){
 let res= await getadmininfo()
 if(res.status==200){
    console.log(res)
    commit('GETADMININFO',res.data)
    }
  }
  },

  getters: {
    routerslist(state) {
      return routerlist(state.routers);
    }
  },
  mutations: {
    GETADMININFO(state,data){
      state.userinfo=data
    }
  }
});

export default store;
