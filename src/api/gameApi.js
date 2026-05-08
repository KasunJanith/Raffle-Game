import axios from "axios";

const API_BASE = "http://localhost:5000";
const PLAYER_API_BASE = `${API_BASE}/api`;
/* ================= LOCAL STORAGE HELPERS ================= */

// Save game completion
export const markGameCompleted = (gameKey, data = {}) => {
  const existing = JSON.parse(localStorage.getItem("gamesPlayed") || "{}");

  existing[gameKey] = {
    completed: true,
    completedAt: new Date().toISOString(),
    ...data, // optional score, time, etc
  };

  localStorage.setItem("gamesPlayed", JSON.stringify(existing));
};

// Get all game progress
export const getGamesProgress = () => {
  return JSON.parse(localStorage.getItem("gamesPlayed") || "{}");
};

/* ================= COMMON FUNCTIONS ================= */
const postRequest = async (url, payload) => {
  try {
    console.log("POST:", url, payload);

    const res = await axios.post(url, payload);
    return res.data;
  } catch (err) {
    console.error(`Error in ${url}:`, err);
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong",
    };
  }
};

const getRequest = async (url) => {
  try {
    console.log("GET:", url);

    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(`Error in ${url}:`, err);
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong",
    };
  }
};
const sendGameResult = async (endpoint, payload) => {
  try {
    console.log(endpoint, payload);

    const res = await axios.post(`${API_BASE}/${endpoint}`, payload);
    return res.data;
  } catch (err) {
    console.error(`Error in ${endpoint}:`, err);
    return {
      success: false,
      message: err?.response?.data?.message || "Something went wrong",
    };
  }
};

/* ================= PLAYER ENDPOINTS ================= */

// Check if player already exists / played before
export const checkPlayer = (data) => {
  return postRequest(`${PLAYER_API_BASE}/player/check`, data);
};

// Check + create if not exists + login
export const checkOrLoginPlayer = (data) => {
  return postRequest(`${PLAYER_API_BASE}/player/check-or-login`, data);
};

// Mark player as played after finishing a game
export const markPlayerAsPlayed = (data) => {
  return postRequest(`${PLAYER_API_BASE}/player/mark-played`, data);
};

/* ================= GAME ENDPOINTS ================= */

// 1️⃣ Quiz Game
export const submitQuizGame = (data) => {
  return postRequest(`${API_BASE}/game1/submit`, data);
};

// 2️⃣ Kavum Count Game
export const submitKavumCountGame = (data) => {
  return postRequest(`${API_BASE}/game2/submit`, data);
};

// 3️⃣ Hidden Lamps Game
export const submitHiddenLampsGame = (data) => {
  return postRequest(`${API_BASE}/game3/submit`, data);
};

// 4️⃣ Rabana Game
export const submitRabanaGame = (data) => {
  return postRequest(`${API_BASE}/game4/submit`, data);
};

// 5️⃣ Catch Kavum Game
export const submitCatchKavumGame = (data) => {
  return postRequest(`${API_BASE}/game5/submit`, data);
};

// 6️⃣ Break Pot Game
export const submitBreakPotGame = (data) => {
  return postRequest(`${API_BASE}/game6/submit`, data);
};

export const submitSpinResult = (data) => {
  return sendGameResult("spin-result/submit", data);
};
/* ================= EXTRA HELPERS ================= */

// Check whether user already played a specific game
export const checkPlayedGame = (game, mobile) => {
  return getRequest(`${API_BASE}/check-played/${game}/${mobile}`);
};

// Leaderboard
export const getLeaderboard = () => {
  return getRequest(`${API_BASE}/leaderboard`);
};

// Old registered user check from Users sheet
export const checkRegisteredUser = (mobile) => {
  return getRequest(`${API_BASE}/check-user/${mobile}`);
};

export const saveGameSummary = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/save-game-summary",
      data,
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

/* ================= SPIN ================= */

// 🔥 play spin (MAIN API)
export const playSpin = async (payload) => {
  try {
    const res = await axios.post(`${API_BASE}/spin`, payload);
    return res.data;
  } catch (err) {
    console.error("Spin Error:", err);
    return {
      success: false,
      prize: "TRY_AGAIN",
    };
  }
};

// optional (if you want config from backend)
export const getSpinConfig = async () => {
  try {
    const res = await axios.get(`${PLAYER_API_BASE}/spin-config`);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};



export const getSpinResults = async () => {
  try {
    const res = await axios.get(`${PLAYER_API_BASE}/spin-results`);
    return res.data;
  } catch (err) {
    console.error("Get Spin Results Error:", err);
    return [];
  }
};

/* ================= FILTER RESULTS ================= */

export const getSpinResultsFiltered = async ({ date, phone }) => {
  try {
    const params = {};

    if (date) params.date = date;
    if (phone) params.phone = phone;

    const res = await axios.get(`${PLAYER_API_BASE}/spin-results`, { params });

    return res.data;
  } catch (err) {
    console.error("Filtered Results Error:", err);
    return [];
  }
};