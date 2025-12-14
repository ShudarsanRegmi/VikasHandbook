// Play page turn sound using local flip.mp3 file
export const playPageTurnSound = () => {
  try {
    const audio = new Audio('/flip.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => {
      console.error("Audio playback failed", e);
    });
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};