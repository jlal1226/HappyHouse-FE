import { insertInterest, deleteInterest, getInterests, getInterestStatList } from "@/api/interest"
import Constant from "@/util/Constant.js"
import router from "@/router" 

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
        async insert({ dispatch, rootState }, payload) {
            await insertInterest(
                payload,
                ({ data }) => {
                    if (data === 1) alert("관심 목록에 추가했습니다.");
                    dispatch(Constant.GET_INTERESTS, payload.userInfo)
                },
                async () => {
                    await dispatch("authenticate");
                    if (rootState.memberStore.isValidToken) await dispatch("insert", payload);
                }
            )
        },
        async del({ dispatch, rootState }, payload){
            await deleteInterest(
                payload,
                ( { data }) => {
                    if (data === 1) alert("관심 목록에서 삭제했습니다.");
                    else alert("관심 목록에서 삭제하지 못했습니다.");
                    dispatch(Constant.GET_INTERESTS, payload.userInfo)
                },
                async () => {
                    await dispatch("authenticate");
                    if (rootState.memberStore.isValidToken) await dispatch("del", payload);
                }
            )
        },
        async getStatList({ commit, dispatch, rootState}, userInfo) {
            await getInterestStatList(
                userInfo,
                ({ data }) => {
                    commit(Constant.GET_INTEREST_LIST, data);
                },
                async () => {
                    await dispatch("authenticate");
                    if (rootState.memberStore.isValidToken) await dispatch("getStatList", userInfo);
                }
            );
        },
        async getInterestDTOList({ commit, dispatch, rootState }, userInfo) {
            await getInterests(
                userInfo,
                ({ data }) => {
                    commit(Constant.GET_INTERESTS, data);
                },
                async () => {
                    await dispatch("authenticate");
                    if (rootState.memberStore.isValidToken) await dispatch("getInterestDTOList", userInfo);
                }
            );
        } ,
        authenticate : async ({ dispatch, rootGetters }) => {
            const checkUserInfo = rootGetters["memberStore/checkUserInfo"];
            const checkToken = rootGetters["memberStore/checkToken"];
            let token = sessionStorage.getItem("access-token");
            if (checkUserInfo != null && token) {
                await dispatch("memberStore/getUserInfo", token, {root : true});
            }
            if (!checkToken || checkUserInfo === null) {
                router.push({ name: "login" });
                alert("로그인이 필요한 서비스입니다.");
            } 
        }
    },
}

export default interestStore;