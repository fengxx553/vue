//引入vue
import Vue from "vue";
//引入vuex
import Vuex from "vuex";
Vue.use(Vuex);
import { constantRouterMap } from "../router/index";
import { routerlist } from "../uitll/index";
import { getadmininfo,getLongitude } from "@/api";
import { setSession,getSession } from "@/uitll/session.js";
//实例化vuex
//创建vuex实例
const store = new Vuex.Store({
  state: {
    routers: constantRouterMap, //存储路由
    userinfo: getSession("userinfo"),
    longitudes:getSession("longitudes"),
  },
  actions: {
    async getadmininfo({ commit }) {
      let res = await getadmininfo();
      if (res.status == 200) {
        commit("GETADMININFO", res.data.data);
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
      // state.userinfo = data;
      setSession("userinfo", data.data);
    },
    GETLONGITUDE(state, data) {
      // state.longitudes = data;
      setSession("longitudes", data);
    }
  }
});

export default store;
