import { apiInstance } from "./index.js"

const api = apiInstance();

async function insertInterest(data, success, fail) {
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.post("/interest/insert", data).then(success).catch(fail);
}

async function deleteInterest(data, success, fail){
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.delete("/interest/delete/", {data} ).then(success).catch(fail);
}
    
async function getInterests(user, success, fail){
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.post("/interest/getInterests", user).then(success).catch(fail);
}

async function getInterestStatList(user, success, fail){
    api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
    await api.post("/interest/list", user).then(success).catch(fail);
}

export { insertInterest, deleteInterest, getInterests, getInterestStatList }