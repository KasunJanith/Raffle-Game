let bgAudio = null;

export const startBgMusic = (music) => {
  if (!bgAudio) {
    bgAudio = new Audio(music);
    bgAudio.loop = true;
    bgAudio.volume = 0.9;
  }

  bgAudio.play().catch(() => {});
};

export const stopBgMusic = () => {
  if (bgAudio) {
    bgAudio.pause();
    bgAudio.currentTime = 0;
    bgAudio = null;
  }
};

export const setVolume = (value) => {
  if (bgAudio) {
    bgAudio.volume = value;
  }
};