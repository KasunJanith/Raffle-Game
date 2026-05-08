import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});


// ===============================
// CHECK USER REGISTERED
// ===============================
export const checkUser = (mobile) => {
  return API.get(`/check-user/${mobile}`);
};


// ===============================
// SUBMIT GAME 1
// ===============================
export const submitGame1 = (data) => {
  return API.post("/game1/submit", data);
};


// ===============================
// SUBMIT GAME 2
// ===============================
export const submitGame2 = (data) => {
  return API.post("/game2/submit", data);
};


// ===============================
// SUBMIT GAME 3
// ===============================
export const submitGame3 = (data) => {
  return API.post("/game3/submit", data);
};


// ===============================
// CHECK IF USER ALREADY PLAYED
// ===============================
export const checkPlayed = (game, mobile) => {
  return API.get(`/check-played/${game}/${mobile}`);
};


// ===============================
// GET LEADERBOARD
// ===============================
export const getLeaderboard = () => {
  return API.get("/leaderboard");
};

