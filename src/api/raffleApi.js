import axios from "axios";

const API_BASE = "http://localhost:5000";
const RAFFLE_API = `${API_BASE}/api/raffle`;

// ========================
// RAFFLE PARTICIPANT APIs
// ========================

/**
 * Fetch all participants for the raffle draw
 */
export const fetchParticipants = async () => {
  try {
    const response = await axios.get(`${RAFFLE_API}/participants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching participants:", error);
    return {
      success: false,
      message: error.message,
      participants: [],
    };
  }
};

/**
 * Save the winner to the spreadsheet
 */
export const saveWinner = (winner) => {
  return fetch("http://localhost:5000/api/raffle/save-winner", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      participantName: winner.name,
      participantPhone: winner.phone,
      timestamp: new Date().toISOString(),
    }),
  });
};

/**
 * Get list of previous winners
 */
export const fetchPreviousWinners = async () => {
  try {
    const response = await axios.get(`${RAFFLE_API}/winners`);
    return response.data;
  } catch (error) {
    console.error("Error fetching winners:", error);
    return {
      success: false,
      message: error.message,
      winners: [],
    };
  }
};

/**
 * Add a new participant manually
 */
export const addParticipant = async (name, phone, email = "") => {
  try {
    const response = await axios.post(`${RAFFLE_API}/add-participant`, {
      name,
      phone,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding participant:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};
