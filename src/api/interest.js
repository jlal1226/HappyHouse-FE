import api from "./index.js"

async function insertInterest(data, success, fail) {
    await api.post("/interest/insert", data).then(success).catch(fail);
}

async function deleteInterest(data, success, fail){
    await api.delete("/interest/delete/", {data} ).then(success).catch(fail);
}
    
async function getInterests(user, success, fail){
    await api.post("/interest/getInterests", user).then(success).catch(fail);
}

async function getInterestStatList(user, success, fail){
    await api.post("/interest/list", user).then(success).catch(fail);
}

export { insertInterest, deleteInterest, getInterests, getInterestStatList }