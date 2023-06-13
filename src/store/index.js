//引入vue
import Vue from "vue";
//引入vuex
import Vuex from "vuex";
Vue.use(Vuex);
import { constantRouterMap, icon,router } from "@/router";
import { routerlist } from "../uitll/index";
import { getadmininfo, getLongitude, outuser } from "@/api";
import { setSession, getSession } from "@/uitll/session.js";
//实例化vuex
//创建vuex实例
const store = new Vuex.Store({
  state: {
    userinfo: getSession("userinfo"),
    longitudes: getSession("longitudes"),
    routerslist: [],
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
    },
    initrouters({ commit, state }) {
      state.routerslist = [];
      let res = routerlist(constantRouterMap, icon)
      commit("INITROUTERS", res)
    },
    async outuser({ commit }) {
      commit("OUTUSER")
    },},

    getters: {},
    mutations: {
      OUTUSER(state) {
        sessionStorage.clear();
        location.reload();
        router.push({path:"/login"})
      },
      GETADMININFO(state, data) {
        state.userinfo = data.data;
        setSession("userinfo", data.data);
        router.push({path:"/"})
      },
      GETLONGITUDE(state, data) {
        state.longitudes = data;
        setSession("longitudes", data);
      },
      INITROUTERS(state, data) {
        state.routerslist = data;
      }
    }
  });

export default store;
