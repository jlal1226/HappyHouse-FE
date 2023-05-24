import { insertInterest, deleteInterest, getInterests, getInterestStatList } from "@/api/interest"
import Constant from "@/util/Constant.js"

const interestStore = {
    namespaced : true,
    state : {
        interests: [],
        interestList : []
    },
    mutations: {
        [Constant.GET_INTERESTS]: (state, payload) => {
            state.interests = payload;
        },
        [Constant.GET_INTEREST_LIST]: (state, payload) => {
            state.interestList = payload;
        },
    },
    actions: {
        async insert({ dispatch }, payload) {
            await insertInterest(
                payload,
                ({ data }) => {
                    if (data === 1) alert("관심 목록에 추가했습니다.");
                    else alert("관심 목록에 추가하지 못했습니다.");
                    dispatch(Constant.GET_INTERESTS, payload.userInfo)
                },
                (error) => {
                    alert("관심 목록에 추가할 수 없습니다. error: " + error);
                }
            )
        },
        async del({ dispatch }, payload){
            await deleteInterest(
                payload,
                ( { data }) => {
                    if (data === 1) alert("관심 목록에서 삭제했습니다.");
                    else alert("관심 목록에서 삭제하지 못했습니다.");
                    dispatch(Constant.GET_INTERESTS, payload.userInfo)
                },
                (error) => {
                    alert("관심 목록에서 삭제할 수 없습니다. error: " + error);
                }
            )
        },
        async getStatList({ commit }, userInfo) {
            await getInterestStatList(
                userInfo,
                ({ data }) => {
                    commit(Constant.GET_INTEREST_LIST, data);
                },
                (error) => {
                    alert("관심 목록을 조회할 수 없습니다. error: " + error);
                }
            );
        },
        async getInterestDTOList({ commit }, userInfo) {
            await getInterests(
                userInfo,
                ({ data }) => {
                    commit(Constant.GET_INTERESTS, data);
                },
                (error) => {
                    alert("error: " + error);
                }
            );
        }
    }
}

export default interestStore;