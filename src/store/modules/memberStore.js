import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  login,
  findById,
  tokenRegeneration,
  logout,
  join,
  checkId,
  modifyUserInfo,
  deleteUser,
} from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: null,
    userInfo: null,
    isValidToken: false,
    isValidId: null,
    isJoin: false,
    isJoinError: false,
    isModified: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
    checkValidId: function (state) {
      return state.isValidId;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_IS_VALID_ID: (state, isValidId) => {
      state.isValidId = isValidId;
    },
    SET_IS_JOIN: (state, isJoin) => {
      state.isJoin = isJoin;
    },
    SET_IS_JOIN_ERROR: (state, isJoinError) => {
      state.isJoinError = isJoinError;
    },
    SET_IS_MODIFIED: (state, isModified) => {
      state.isModified = isModified;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          console.log("data : " + data);
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            console.log(
              "login success token created!!!! >> ",
              accessToken,
              refreshToken
            );
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            console.log("로그인 실패");
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log(
        "토큰 재발급 >> 기존 토큰 정보 : {}",
        sessionStorage.getItem("access-token")
      );
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async userJoin({ commit }, user) {
      console.log(user);
      await join(
        user,
        ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            console.log("회원가입 성공");
            commit("SET_IS_JOIN", true);
          }
        },
        (error) => {
          commit("SET_IS_JOIN_ERROR", true);
          console.log(error);
        }
      );
    },
    async idCheck({ commit }, userId) {
      console.log("아이디 검증");
      await checkId(
        userId,
        ({ data }) => {
          if (data.message === "success") {
            console.log("사용할 수 있는 아이디");
            commit("SET_IS_VALID_ID", true);
          } else {
            console.log("사용할 수 없는 아이디");
            commit("SET_IS_VALID_ID", false);
          }
        },
        async (error) => {
          console.log("서버 오류");
          console.log(error);
        }
      );
    },
    async modifyUser({ dispatch, commit }, user) {
      await modifyUserInfo(
        user,
        async ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            const token = sessionStorage.getItem("access-token");

            console.log("회원정보 수정 성공");
            await dispatch("getUserInfo", token);
            commit("SET_IS_MODIFIED", true);
          } else {
            console.log("회원정보 수정 실패");
            commit("SET_IS_MODIFIED", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async remove({ commit }, userId) {
      console.log(typeof userId);
      await deleteUser(
        userId,
        ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
            sessionStorage.clear();
          } else {
            console.log("회원 탈퇴 실패");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default memberStore;
