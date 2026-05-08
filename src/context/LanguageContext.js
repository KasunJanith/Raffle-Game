import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

export const translations = {
  si: {
    // Common
    langLabel: "භාෂාව",
    welcome: "සාදරයෙන් පිළිගනිමු",
    home: "මුල් පිටුව",
    next: "ඊළඟ",
    back: "ආපසු",
    submit: "පිළිතුර යොමු කරන්න",
    save: "සුරකින්න",
    cancel: "අවලංගු කරන්න",
    close: "වසන්න",
    yes: "ඔව්",
    no: "නැහැ",
    ok: "හරි",
    loading: "පූරණය වෙමින්...",
    success: "සාර්ථකයි",
    error: "දෝෂයක් ඇතිවිය",
    retry: "නැවත උත්සාහ කරන්න",
    reset: "නැවත සකසන්න",
    resetMsg: "සැසිය මකා දමන ලදී",

    // Welcome page
    tagline: "අවුරුදු ක්‍රීඩා කරමු. තෑගි දිනමු.",
    nameLabel: "ඔබගේ නම",
    namePlaceholder: "ඔබගේ නම ඇතුළත් කරන්න",
    mobileLabel: "දුරකථන අංකය",
    mobilePlaceholder: "07XXXXXXXX",
    start: "▶ ක්‍රීඩා ආරම්භ කරන්න",
    starting: "ආරම්භ කරමින්...",
    enterBoth: "කරුණාකර නම සහ දුරකථන අංකය ඇතුළත් කරන්න",
    invalidPhone: "වලංගු ජංගම දුරකථන අංකයක් ඇතුළත් කරන්න (07XXXXXXXX)",
    welcomeMsg: "සාදරයෙන් පිළිගනිමු! 🎉",
    err: "යම් දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න.",

    // Game common
    playNow: "දැන් ක්‍රීඩා කරන්න",
    playAgain: "නැවත ක්‍රීඩා කරන්න",
    startGame: "ක්‍රීඩාව ආරම්භ කරන්න",
    gameStartIn: "ක්‍රීඩාව ආරම්භ වන්නේ",
    ready: "සූදානම්ද?",
    score: "ලකුණු",
    finalScore: "අවසාන ලකුණු",
    timeLeft: "ඉතිරි කාලය",
    seconds: "තත්පර",
    gameOver: "ක්‍රීඩාව අවසන්!",
    completed: "සම්පූර්ණයි",
    yourScore: "ඔබගේ ලකුණු",
    totalScore: "මුළු ලකුණු",
    correctAnswer: "නිවැරදි පිළිතුර",
    wrongAnswer: "වැරදි පිළිතුර",
    selectAnswer: "පිළිතුරක් තෝරන්න",
    noAnswerSelected: "කරුණාකර පිළිතුරක් තෝරන්න",
    answerSubmitted: "පිළිතුර යොමු කරන ලදී",
    timesUp: "කාලය අවසන්!",
    currentQuestion: "වත්මන් ප්‍රශ්නය",
    question: "ප්‍රශ්නය",
    of: "න්",
    level: "මට්ටම",
    attempt: "උත්සාහය",
    triesLeft: "ඉතිරි උත්සාහයන්",
    instructions: "උපදෙස්",
    tapToStart: "ආරම්භ කිරීමට තට්ටු කරන්න",
    tapFast: "ඉක්මනින් තට්ටු කරන්න",
    catchNow: "දැන් අල්ලන්න",
    hitNow: "දැන් පහර දෙන්න",
    bonusRound: "අතිරේක වටය",
    bonusChance: "අමතර අවස්ථාව",
    winner: "ජයග්‍රාහකයා",
    congratulations: "සුභ පැතුම්!",
    betterLuck: "ඊළඟ වතාවේ වඩා හොඳින් කරමු",

    // Result / modal
    viewResults: "ප්‍රතිඵල බලන්න",
    continue: "ඉදිරියට යන්න",
    finish: "අවසන් කරන්න",
    done: "අවසන්",
    claimGift: "තෑග්ග ලබාගන්න",
    thanksForPlaying: "ක්‍රීඩා කළාට ස්තූතියි",
    seeYouAgain: "නැවත හමුවෙමු",
    leaderboard: "ප්‍රමුඛ ලැයිස්තුව",
    rank: "ස්ථානය",

    // Registration / player
    playerDetails: "ක්‍රීඩක විස්තර",
    playerName: "ක්‍රීඩක නම",
    phoneNumber: "දුරකථන අංකය",
    languageSelected: "තෝරාගත් භාෂාව",
    sessionExpired: "සැසිය කල් ඉකුත් වී ඇත",
    sessionRestored: "පෙර සැසිය නැවත ලබාගන්නා ලදී",

    // Extra messages
    networkError: "ජාල දෝෂයක් ඇතිවිය",
    somethingWentWrong: "යමක් වැරදී ඇත",
    tryAgainLater: "කරුණාකර පසුව නැවත උත්සාහ කරන්න",
    dataSaved: "දත්ත සුරකින ලදී",
    submitting: "යොමු කරමින්...",
    pleaseWait: "කරුණාකර රැඳී සිටින්න",
    locked: "අගුළු දමා ඇත",
    unlocked: "විවෘතයි",
    newGame: "නව ක්‍රීඩාව",
    selected: "තෝරාගත්",
  },

  ta: {
    // Common
    langLabel: "மொழி",
    welcome: "வரவேற்கிறோம்",
    home: "முகப்பு",
    next: "அடுத்து",
    back: "பின்னுக்கு",
    submit: "பதிலை சமர்ப்பிக்கவும்",
    save: "சேமிக்கவும்",
    cancel: "ரத்து செய்யவும்",
    close: "மூடவும்",
    yes: "ஆம்",
    no: "இல்லை",
    ok: "சரி",
    loading: "ஏற்றப்படுகிறது...",
    success: "வெற்றி",
    error: "பிழை ஏற்பட்டது",
    retry: "மீண்டும் முயற்சிக்கவும்",
    reset: "மீட்டமைக்கவும்",
    resetMsg: "அமர்வு நீக்கப்பட்டது",

    // Welcome page
    tagline: "புத்தாண்டு விளையாட்டுகளை விளையாடுவோம். பரிசுகளை வெல்வோம்.",
    nameLabel: "உங்கள் பெயர்",
    namePlaceholder: "உங்கள் பெயரை உள்ளிடவும்",
    mobileLabel: "தொலைபேசி எண்",
    mobilePlaceholder: "07XXXXXXXX",
    start: "▶ விளையாட தொடங்கவும்",
    starting: "தொடங்குகிறது...",
    enterBoth: "தயவுசெய்து உங்கள் பெயரும் தொலைபேசி எண்ணும் உள்ளிடவும்",
    invalidPhone: "சரியான மொபைல் எண்ணை உள்ளிடவும் (07XXXXXXXX)",
    welcomeMsg: "வரவேற்கிறோம்! 🎉",

    err: "ஏதோ தவறு ஏற்பட்டுள்ளது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்..",
    // Game common
    playNow: "இப்போது விளையாடுங்கள்",
    playAgain: "மீண்டும் விளையாடுங்கள்",
    startGame: "விளையாட்டை தொடங்கவும்",
    gameStartIn: "விளையாட்டு தொடங்கும் நேரம்",
    ready: "தயாரா?",
    score: "மதிப்பெண்",
    finalScore: "இறுதி மதிப்பெண்",
    timeLeft: "மீதமுள்ள நேரம்",
    seconds: "விநாடிகள்",
    gameOver: "விளையாட்டு முடிந்தது!",
    completed: "முடிந்தது",
    yourScore: "உங்கள் மதிப்பெண்",
    totalScore: "மொத்த மதிப்பெண்",
    correctAnswer: "சரியான பதில்",
    wrongAnswer: "தவறான பதில்",
    selectAnswer: "ஒரு பதிலை தேர்ந்தெடுக்கவும்",
    noAnswerSelected: "தயவுசெய்து ஒரு பதிலை தேர்ந்தெடுக்கவும்",
    answerSubmitted: "பதில் சமர்ப்பிக்கப்பட்டது",
    timesUp: "நேரம் முடிந்தது!",
    currentQuestion: "தற்போதைய கேள்வி",
    question: "கேள்வி",
    of: "இல்",
    level: "நிலை",
    attempt: "முயற்சி",
    triesLeft: "மீதமுள்ள முயற்சிகள்",
    instructions: "வழிமுறைகள்",
    tapToStart: "தொடங்க தொடவும்",
    tapFast: "வேகமாக தொடவும்",
    catchNow: "இப்போது பிடிக்கவும்",
    hitNow: "இப்போது அடிக்கவும்",
    bonusRound: "போனஸ் சுற்று",
    bonusChance: "கூடுதல் வாய்ப்பு",
    winner: "வெற்றியாளர்",
    congratulations: "வாழ்த்துக்கள்!",
    betterLuck: "அடுத்த முறை நல்ல அதிர்ஷ்டம்",

    // Result / modal
    viewResults: "முடிவுகளை பார்க்கவும்",
    continue: "தொடரவும்",
    finish: "முடிக்கவும்",
    done: "முடிந்தது",
    claimGift: "பரிசை பெறவும்",
    thanksForPlaying: "விளையாடியதற்கு நன்றி",
    seeYouAgain: "மீண்டும் சந்திப்போம்",
    leaderboard: "முன்னணி பட்டியல்",
    rank: "தரவரிசை",

    // Registration / player
    playerDetails: "விளையாட்டு வீரர் விவரங்கள்",
    playerName: "வீரர் பெயர்",
    phoneNumber: "தொலைபேசி எண்",
    languageSelected: "தேர்ந்தெடுக்கப்பட்ட மொழி",
    sessionExpired: "அமர்வு காலாவதியானது",
    sessionRestored: "முந்தைய அமர்வு மீட்டெடுக்கப்பட்டது",

    // Extra messages
    networkError: "இணைய பிழை ஏற்பட்டது",
    somethingWentWrong: "ஏதோ தவறு ஏற்பட்டது",
    tryAgainLater: "பின்னர் மீண்டும் முயற்சிக்கவும்",
    dataSaved: "தரவு சேமிக்கப்பட்டது",
    submitting: "சமர்ப்பிக்கப்படுகிறது...",
    pleaseWait: "தயவுசெய்து காத்திருக்கவும்",
    locked: "பூட்டப்பட்டுள்ளது",
    unlocked: "திறந்துள்ளது",
    newGame: "புதிய விளையாட்டு",
    selected: "தேர்ந்தெடுக்கப்பட்டது",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("si");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("appLanguage", lang);

    const savedPlayer = localStorage.getItem("player");
    if (savedPlayer) {
      const parsedPlayer = JSON.parse(savedPlayer);
      const updatedPlayer = { ...parsedPlayer, language: lang };
      localStorage.setItem("player", JSON.stringify(updatedPlayer));
    }
  };

  const t = useMemo(
    () => translations[language] || translations.si,
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
