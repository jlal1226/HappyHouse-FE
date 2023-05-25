import { getAllRegions, searchKeyword, getDealList } from "@/api/deal.js"
import Constant from "@/util/Constant.js"

const dealStore= {
    namespaced : true,
    state: {
        regions: [],
        searched: [],
        dealList: [],
        aptCode: String,
        aptName: String,
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
        [Constant.REMOVE_DEALLIST] : (state) => {
            state.dealList = [];
        },
    },
    actions :{
        async getRegionInfos({ commit }){
            await getAllRegions(
                ({ data })=> {
                    commit(Constant.ALL_REGION, data);
                },
                ( error ) => {
                    alert("지역 정보를 받아오지 못했습니다. error :" + error );
                }
            )
        },
        async search({ commit }, payload) {
            await searchKeyword(
                payload,
                ( { data }) => {
                    commit(Constant.SEARCH_KEYWORD, data);
                },
                ( error ) => {
                    alert(" 검색에 실패했습니다. error: " + error);
                }
            )
        },
        async setApartment( { commit }, payload ) {
            await commit(Constant.SET_APT_CODE_NAME, payload);
        },
        async getList( { commit }, aptCode ) {
            await getDealList (
                aptCode,
                ( { data }) => {
                    commit(Constant.GET_DEALLIST, data);
                },
                ( error ) => {
                    alert("실거래 내역을 가져오지 못했습니다. error : " + error);
                }
            )
        },
        async resetDealList( { commit } ){
            await commit(Constant.REMOVE_DEALLIST);
        }
    }
}
export default dealStore;
