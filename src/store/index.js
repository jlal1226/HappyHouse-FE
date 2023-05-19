import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/axios/axios-common.js'
import Constant from '@/util/Constant'
//모든 컴포넌트에서 Vuex를 사용할 수 있게 설정.
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      regions : [],
      searched : [],
      dealList : [],
      aptCode : String,
      aptName : String
    },
    actions: {
      [Constant.ALL_REGION] : (store) => {
        http.get("/allregion")
            .then((response) => {
              store.commit(Constant.ALL_REGION, response.data)
            });
      },
      [Constant.SEARCH_KEYWORD] : (store, keyword) => {
        http.get("/list/" + keyword)
          .then((response) => {
            store.commit(Constant.SEARCH_KEYWORD, response.data);
          });
      },
      [Constant.SEARCH_REGION] : (store, payload) => {
        http.post("/search/", payload)
          .then((response) => {
            store.commit(Constant.SEARCH_REGION, response.data);
          });
      },
      [Constant.SET_APT_CODE_NAME] : (store, payload) => {
        store.commit(Constant.SET_APT_CODE_NAME, payload);
      },
      [Constant.SET_SIDEBAR] : (store, payload) => {
        http.get("/deallist/" + payload)
          .then((response) => {
            store.commit(Constant.SET_SIDEBAR, response.data);
            console.log(response.data);
          });
      } 
    },
    mutations: {
      [Constant.ALL_REGION] : (state, payload) => {
        state.regions = payload;
      },
      [Constant.SEARCH_KEYWORD] : (state, payload) => {
        state.searched = payload;
      },
      [Constant.SEARCH_REGION] : (state, payload) => {
        state.searched = payload;
      },
      [Constant.SET_APT_CODE_NAME] : (state, payload) => {
        state.aptCode = payload.aptCode;
        state.aptName = payload.title;
      },
      [Constant.SET_SIDEBAR] : (state, payload) => {
        state.dealList = payload;
        console.log(store.deallist);
      }
    }
});

export default store;


