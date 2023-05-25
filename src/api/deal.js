import api from "./index.js";

async function getAllRegions(success, fail){
  await api.get("/deal/allregion").then(success).catch(fail);
}

async function searchKeyword(keywords, success, fail){
  await api.post("/deal/search/", keywords).then(success).catch(fail);
}

async function getDealList(aptCode, success, fail){
  await api.get("/deal/deallist/" + aptCode).then(success).catch(fail);
}

export { getAllRegions, searchKeyword, getDealList };