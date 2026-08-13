/**
 * Speeda Test 360 - Interactive Web Audio Sound Engine
 * Synthesizes real-time engine acceleration & sci-fi turbo audio using HTML5 Web Audio API.
 */

let audioCtx = null;
let engineOsc = null;
let subOsc = null;
let engineGain = null;
let isAudioEnabled = true;

// Initialize Web Audio Context on user interaction
export function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Auto-unlock Web Audio context on first user click/touch anywhere on site
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    } else if (!audioCtx) {
      getAudioContext();
    }
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  };
  window.addEventListener('click', unlockAudio, { once: true });
  window.addEventListener('touchstart', unlockAudio, { once: true });
  window.addEventListener('keydown', unlockAudio, { once: true });
}

export function setAudioEnabled(enabled) {
  isAudioEnabled = enabled;
  if (!enabled) {
    stopEngineSound();
  }
}

export function getAudioEnabled() {
  return isAudioEnabled;
}

/**
 * Start sports car engine acceleration sound during test
 */
export function startEngineSound() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  try {
    stopEngineSound();

    // Main Engine Pitch Oscillator (Sawtooth wave for engine rumble)
    engineOsc = ctx.createOscillator();
    engineOsc.type = 'sawtooth';
    engineOsc.frequency.setValueAtTime(70, ctx.currentTime);

    // Sub-Bass Turbo Oscillator (Sine wave)
    subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(50, ctx.currentTime);

    // Lowpass Filter for smooth engine tone
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);

    // Master Gain
    engineGain = ctx.createGain();
    engineGain.gain.setValueAtTime(0.12, ctx.currentTime);

    engineOsc.connect(filter);
    subOsc.connect(filter);
    filter.connect(engineGain);
    engineGain.connect(ctx.destination);

    engineOsc.start();
    subOsc.start();
  } catch (err) {
    console.warn('Audio synthesis warning:', err);
  }
}

/**
 * Dynamically pitch engine audio based on current Mbps speed
 */
export function updateEngineRPM(currentSpeed, maxSpeed = 200) {
  if (!isAudioEnabled || !engineOsc || !audioCtx) return;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  const ratio = Math.min(Math.max(currentSpeed / maxSpeed, 0), 1);
  const targetFreq = 75 + ratio * 290; // Pitch shifts from 75Hz up to 365Hz RPM
  const subFreq = 50 + ratio * 170;

  try {
    engineOsc.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.05);
    subOsc.frequency.setTargetAtTime(subFreq, audioCtx.currentTime, 0.05);
  } catch (e) {}
}

/**
 * Stop engine audio loop
 */
export function stopEngineSound() {
  if (engineOsc) {
    try {
      engineOsc.stop();
      engineOsc.disconnect();
    } catch (e) {}
    engineOsc = null;
  }
  if (subOsc) {
    try {
      subOsc.stop();
      subOsc.disconnect();
    } catch (e) {}
    subOsc = null;
  }
}

/**
 * Play a crisp victory chime when test completes
 */
export function playCompletionSound() {
  if (!isAudioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  try {
    const now = ctx.currentTime;
    
    // First Chime Tone (Cyan Note)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5 note
    gain1.gain.setValueAtTime(0.14, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);

    // Second Chime Tone (High Victory Note)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.12); // E5 note
    gain2.gain.setValueAtTime(0.16, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.6);
  } catch (err) {
    console.warn('Completion sound warning:', err);
  }
}
