import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/axios/axios-common.js'
import Constant from '@/util/Constant'
//모든 컴포넌트에서 Vuex를 사용할 수 있게 설정.
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      regions : [],
    },
    actions: {
      [Constant.ALL_REGION] : (store) => {
        http.get("/allregion")
            .then((response) => {
              store.commit(Constant.ALL_REGION, response.data)
            });
      }
    },
    mutations: {
      [Constant.ALL_REGION] : (state, payload) => {
        state.regions = payload;
      }
    }
});

export default store;


