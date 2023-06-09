import api from "./index.js";

async function login(user, success, fail) {
  console.log(user);
  await api.post(`/user/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function join(user, success, fail) {
  console.log("회원가입: " + user);
  await api.post(`/user/join`, user).then(success).catch(fail);
}

async function checkId(userid, success, fail) {
  await api.get(`/user/${userid}`).then(success).catch(fail);
}

async function modifyUserInfo(user, success, fail) {
  await api.put(`/user`, user).then(success).catch(fail);
}

async function deleteUser (userId, success, fail) {
  await api.delete(`/user/${userId}`).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout, join, checkId, modifyUserInfo, deleteUser };
