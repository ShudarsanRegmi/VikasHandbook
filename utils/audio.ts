// Create a synthesized page turn sound using Web Audio API
// This avoids loading external files and provides instant feedback
export const playPageTurnSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const duration = 0.4;
    
    // Create white noise buffer
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // Noise Source
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter to make it sound like paper (Lowpass)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + duration);

    // Gain envelope (Attack and release)
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05); // Attack
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration); // Decay

    // Connect
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Play
    noise.start();
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};