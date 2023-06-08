//引入vue
import Vue from "vue";
//引入vuex
import Vuex from "vuex";
Vue.use(Vuex);
import { constantRouterMap } from "../router/index";
import { routerlist } from "../uitll/index";
import { getadmininfo,getLongitude } from "@/api";
//实例化vuex
//创建vuex实例
const store = new Vuex.Store({
  state: {
    routers: constantRouterMap, //存储路由
    userinfo: {},
    longitudes:{},
  },
  actions: {
    async getadmininfo({ commit }) {
      let res = await getadmininfo();
      if (res.status == 200) {
        commit("GETADMININFO", res.data);
      }
    },
    async getLongitude({ commit }) {
      let res = await getLongitude();
      if (res.status == 200) {
        commit("GETLONGITUDE", res.data);
      }
    }
  },

  getters: {
    routerslist(state) {
      return routerlist(state.routers);
    }
  },
  mutations: {
    GETADMININFO(state, data) {
      state.userinfo = data;
    },
    GETLONGITUDE(state, data) {
      state.longitudes = data;
    }
  }
});

export default store;
