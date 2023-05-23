import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/axios/axios-common.js'
import createPersistedState from "vuex-persistedstate";
import Constant from '@/util/Constant'


import memberStore from "@/store/modules/memberStore"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    memberStore,
  },
  state: {
    regions: [],
    searched: [],
    dealList: [],
    aptCode: String,
    aptName: String,
    interests: [],
    interestList: [],
  },
  actions: {
    [Constant.ALL_REGION]: (store) => {
      http.get("/deal/allregion").then((response) => {
        store.commit(Constant.ALL_REGION, response.data);
      });
    },
    [Constant.SEARCH_KEYWORD]: (store, payload) => {
      http.post("/deal/search/", payload).then((response) => {
        store.commit(Constant.SEARCH_KEYWORD, response.data);
      });
    },
    [Constant.SET_APT_CODE_NAME]: (store, aptcode) => {
      store.commit(Constant.SET_APT_CODE_NAME, aptcode);
    },
    [Constant.GET_DEALLIST]: (store, aptcode) => {
      http.get("/deal/deallist/" + aptcode).then((response) => {
        store.commit(Constant.GET_DEALLIST, response.data);
      });
    },
    [Constant.REMOVE_DEALLIST]: (store) => {
      store.commit(Constant.REMOVE_DEALLIST);
    },
    [Constant.INSERT_INTEREST]: (store, payload) => {
      http.post("/interest/insert", payload).then((response) => {
        if (response.data == 1) alert("관심 목록에 추가했습니다.");
        else alert("관심 목록에 추가하지 못했습니다.");
        store.dispatch(Constant.GET_INTERESTS, payload.userInfo);
      });
    },
    [Constant.DELETE_INTEREST]: (store, payload) => {
      http.delete("/interest/delete/", {data : payload} ).then((response) => {
        if (response.data == 1) alert("관심 목록에서 삭제했습니다.");
        else alert("관심 목록에서 삭제하지 못했습니다.");
        store.dispatch(Constant.GET_INTERESTS, payload.userInfo);
      });
    },
    [Constant.GET_INTERESTS]: (store, userInfo) => {
      http.post("/interest/getInterests", userInfo).then((response) => {
        store.commit(Constant.GET_INTERESTS, response.data);
      });
    },
    [Constant.GET_INTEREST_LIST]: (store, userInfo) => {
      http.post("/interest/list", userInfo).then((response) => {
        store.commit(Constant.GET_INTEREST_LIST, response.data);
      });
    },
  },
  mutations: {
    [Constant.ALL_REGION]: (state, payload) => {
      state.regions = payload;
    },
    [Constant.SEARCH_KEYWORD]: (state, payload) => {
      state.searched = payload;
    },
    [Constant.SET_APT_CODE_NAME]: (state, payload) => {
      state.aptCode = payload.aptCode;
      state.aptName = payload.title;
    },
    [Constant.GET_DEALLIST]: (state, payload) => {
      state.dealList = payload;
    },
    [Constant.REMOVE_DEALLIST]: (state) => {
      state.dealList = [];
    },
    [Constant.GET_INTERESTS]: (state, payload) => {
      state.interests = payload;
    },
    [Constant.GET_INTEREST_LIST]: (state, payload) => {
      state.interestList = payload;
    },
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;


