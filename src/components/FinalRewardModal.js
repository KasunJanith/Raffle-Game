import { Modal, Button } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import WINWAYLogo from "../assets/WIN WAY English Logo- PNG.png";
import { useLanguage } from "../context/LanguageContext";

export default function FinalRewardModal({
  open,
  alreadyPlayed,
  onClose,
  onSpin,
}) {
  const { language } = useLanguage();

  const finalModalContent = {
    si: {
      title: "🎉 තරගයට සහභාගි වූවාට ස්තූතියි",
      description:
        "ත්‍යාග සඳහා සුදුසුකම් ලැබීමට WIN WAY සමග Register සිටීම අනිවාර්ය වේ.",

      eligibilityTitle: "🎁 ත්‍යාග සඳහා සුදුසුකම්",
      rewards: [
        "🏆 තෝරාගත් Register වූ පාරිභෝගිකයන් 100 කට වටිනා Wallet top-ups",
        "💰 WIN WAY වෙතින් ටිකට්පත් 5ක් හෝ ඊට වඩා මිලදී ගත්තොත් රු. 100,000ක් දක්වා මුදල් තෑගි දිනාගන්න අවස්ථාවක්!",
      ],

      spinInfo:
        "මෙම ත්‍යාගය ඔබට Spin Wheel හරහා ලැබුණු එකක් වන අතර පැය 48ක් ඇතුළත ඔබගේ WIN WAY Wallet එකට එක් කරනු ලැබේ.",

      registerBtn: "දැන්ම Register වෙන්න",
      spinBtn: "🎡 Spin Wheel",
    },

    ta: {
      title: "🎉 போட்டியில் கலந்து கொண்டதற்கு நன்றி",
      description:
        "பரிசுகளுக்கு தகுதி பெற WIN WAY உடன் பதிவு செய்திருக்க வேண்டும்.",

      eligibilityTitle: "🎁 பரிசு தகுதி",
      rewards: [
        "🏆 தேர்ந்தெடுக்கப்பட்ட 100 பதிவு செய்யப்பட்ட வாடிக்கையாளர்களுக்கு மதிப்புள்ள WIN WAY Wallet top-ups",
        "💰 WIN WAY மூலம் 5 அல்லது அதற்கு மேற்பட்ட டிக்கெட்டுகளை வாங்கினால் ரூ.100,000 வரை பண பரிசு வெல்ல வாய்ப்பு!",
      ],

      spinInfo:
        "இந்த பரிசு ஸ்பின் வீல் மூலம் கிடைத்தது. இது 48 மணி நேரத்திற்குள் உங்கள் வாலெட்டில் சேர்க்கப்படும்.",

      registerBtn: "இப்போது பதிவு செய்யுங்கள்",
      spinBtn: "🎡 ஸ்பின் வீல்",
    },
  };
  const t = finalModalContent[language] || finalModalContent.si;
  const spinPrize = localStorage.getItem("spinPrize");

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={420}
      styles={{
        mask: { background: "rgba(0,0,0,0.6)" },
        content: {
          borderRadius: 26,
          padding: 0,
          overflow: "hidden",
        },
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          background: "#f6e9d7",
          padding: "30px 24px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* subtle glow */}
        <div
          style={{
            position: "absolute",
            top: -40,
            left: -40,
            width: 140,
            height: 140,
            background:
              "radial-gradient(circle, rgba(255,215,0,0.25), transparent)",
            borderRadius: "50%",
          }}
        />

        {/* LOGO */}
        <img
          src={WINWAYLogo}
          alt="WinWay"
          style={{
            width: 110,
            marginBottom: 14,
          }}
        />

        {/* TITLE */}
        <h2
          style={{
            color: "#7a3e0e",
            fontWeight: 900,
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          {t.title}
        </h2>

        {/* DESCRIPTION */}
        <p
          style={{
            color: "#6b6b6b",
            fontSize: 14,
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          {t.description}
        </p>

        {/* 🎁 HERO PRIZE */}
        <AnimatePresence>
          {spinPrize && (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 160,
                  height: 160,
                  margin: "0 auto",
                  borderRadius: "50%",
                  background:
                    spinPrize === "No Chance"
                      ? "linear-gradient(135deg, #ff7875, #ff4d4f)"
                      : "linear-gradient(135deg, #facc15, #f59e0b)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  boxShadow:
                    spinPrize === "No Chance"
                      ? "0 20px 50px rgba(255,77,79,0.35)"
                      : "0 20px 50px rgba(250,204,21,0.4)",
                }}
              >
                {spinPrize === "No Chance" ? (
                  <></>
                ) : (
                  <>
                    <div style={{ fontSize: 14 }}>Rs.</div>
                    <div
                      style={{
                        fontSize: 30,
                        fontWeight: 900,
                        marginTop: 4,
                      }}
                    >
                      {spinPrize}.00
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {spinPrize && spinPrize !== "No Chance" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              margin: 10,
              padding: "10px 14px",
              borderRadius: 12,
              
              fontSize: 15,
              color: "#000000",
              lineHeight: 1.5,
              textAlign: "center",
            }}
          > {t.spinInfo}
          </motion.div>
        )}
        {/* CTA BUTTON */}
       
        {!spinPrize && (
          <div
            style={{
              background: "linear-gradient(135deg, #fff7e6, #fff1cc)",
              borderRadius: 18,
              padding: 18,
              textAlign: "left",
              marginBottom: 24,
              border: "1px solid #FFD700",
              boxShadow: "0 10px 25px rgba(255,215,0,0.2)",
            }}
          >
            {/* TITLE */}
            <div
              style={{
                fontWeight: 800,
                marginBottom: 10,
                color: "#ad6800",
                fontSize: 15,
              }}
            >
              {t.eligibilityTitle}
            </div>

            {/* LIST */}
            {t.rewards.map((item, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 8,
                  fontSize: 14,
                  color: "#5a3e1b",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
       
        {!alreadyPlayed && (
          <Button
            onClick={onSpin}
            style={{
              marginTop: 12,
              width: "100%",
              height: 48,
              borderRadius: 40,
              fontWeight: "bold",
              background: "#fff",
              border: "2px solid #facc15",
              color: "#7a3e0e",
            }}
          >
            {t.spinBtn}
          </Button>
        )}
      </motion.div>
    </Modal>
  );
}
