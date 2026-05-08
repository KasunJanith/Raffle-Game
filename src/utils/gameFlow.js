export const getNextGameRoute = (games) => {
  const progress = JSON.parse(localStorage.getItem("gamesPlayed") || "{}");

  // map old → new keys (IMPORTANT for your current setup)
  const keyMap = {
    game_quiz_done: "quiz",
    game_kavum_done: "kavum_count",
    game_lamps_done: "hidden_lamps",
    game_rabana_done: "rabana",
    game_catch_kavum_done: "catch_kavum",
    game_break_pot_done: "break_pot",
  };

  for (let game of games) {
    const cleanKey = keyMap[game.key] || game.key;
    const isDone = progress?.[cleanKey]?.completed;

    if (!isDone) {
      return game.route; // 🎯 next game
    }
  }

  return null; // all completed
};