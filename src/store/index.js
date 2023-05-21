import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/axios/axios-common.js'
import Constant from '@/util/Constant'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      regions : [],
      searched : [],
      dealList : [],
      aptCode : String,
      aptName : String,
      interests : []
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
      },
      [Constant.INSERT_INTEREST] : (store, payload) => {
        http.post("/interest/insert", payload) 
          .then((response) => {
            console.log(response.data);
            if (response.data == 1) alert("관심 목록에 추가했습니다.");
            else alert("관심 목록에 추가하지 못했습니다.");
            store.dispatch(Constant.GET_INTERESTS);
          })

      },
      [Constant.DELETE_INTEREST] : (store, payload) => {
        http.delete("/interest/delete/" + payload) 
        .then((response) => {
            console.log(response.data);
            if (response.data == 1) alert("관심 목록에서 삭제했습니다.");
            else alert("관심 목록에서 삭제하지 못했습니다.");
            store.dispatch(Constant.GET_INTERESTS);
          })
      },
      [Constant.GET_INTERESTS] : (store) => {
        http.get("/interest/show")
          .then((response) => {
            store.commit(Constant.GET_INTERESTS, response.data);
          })
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
      },
      [Constant.GET_INTERESTS] : (state, payload) => {
        state.interests = payload;
      }
    }
});

export default store;


