// Web Audio API synthesizer for zero-dependency sound effects & warm acoustic celebration background music

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmInterval: number | null = null;
  private isBgmPlaying = false;
  private userMuted = false;
  private hasInitializedListeners = false;
  private onStateChangeListeners: ((playing: boolean) => void)[] = [];

  constructor() {
    // Attempt auto-start when DOM is ready
    if (typeof window !== 'undefined') {
      this.setupAutoPlayListeners();
    }
  }

  private setupAutoPlayListeners() {
    if (this.hasInitializedListeners) return;
    this.hasInitializedListeners = true;

    const tryUnlockAudio = () => {
      if (this.userMuted) return;
      if (!this.ctx || this.ctx.state === 'suspended') {
        this.initContext();
        if (this.ctx && this.ctx.state === 'running' && !this.isBgmPlaying && !this.userMuted) {
          this.startBgm();
        }
      }
    };

    ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'].forEach((event) => {
      window.addEventListener(event, tryUnlockAudio, { once: false, passive: true });
    });
  }

  private initContext() {
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // Audio context might fail in restricted environments
    }
  }

  // Subscribe to play/stop state changes
  onStateChange(listener: (playing: boolean) => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notifyStateChange() {
    this.onStateChangeListeners.forEach((l) => l(this.isBgmPlaying));
  }

  // Play gentle chime (on heart click, button click, etc.)
  playChime(pitchMultiplier = 1) {
    try {
      this.initContext();
      if (!this.ctx || this.ctx.state !== 'running') return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25 * pitchMultiplier, this.ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5 * pitchMultiplier, this.ctx.currentTime + 0.15); // C6

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch {
      // Ignore
    }
  }

  // Play gentle candle blow puff sound
  playBlow() {
    try {
      this.initContext();
      if (!this.ctx || this.ctx.state !== 'running') return;

      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Ignore
    }
  }

  // Play celebratory fanfare (when cake candles are blown or surprise box opens)
  playFanfare() {
    try {
      this.initContext();
      if (!this.ctx || this.ctx.state !== 'running') return;

      const notes = [
        { f: 523.25, d: 0.15, wait: 0 },       // C5
        { f: 659.25, d: 0.15, wait: 0.12 },    // E5
        { f: 783.99, d: 0.18, wait: 0.24 },    // G5
        { f: 1046.50, d: 0.45, wait: 0.38 },   // C6
      ];

      notes.forEach((note) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const start = this.ctx.currentTime + note.wait;
        osc.frequency.setValueAtTime(note.f, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + note.d);
      });
    } catch {
      // Ignore
    }
  }

  // Auto-start BGM on load
  autoStartBgm() {
    if (this.userMuted) return;
    this.initContext();
    this.startBgm();
  }

  // Toggle BGM on/off
  toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.userMuted = true;
      this.stopBgm();
      return false;
    } else {
      this.userMuted = false;
      this.initContext();
      this.startBgm();
      return true;
    }
  }

  getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  private startBgm() {
    if (this.isBgmPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    this.notifyStateChange();

    // Warm, heartfelt celebration chords + melodic acoustic music-box notes
    // Chord progression: C - G/B - Am - F (warm, emotional, celebratory)
    const chords = [
      { bass: 130.81, treble: [523.25, 659.25, 783.99, 1046.50] }, // C3 + C5, E5, G5, C6
      { bass: 123.47, treble: [493.88, 587.33, 783.99, 987.77] },  // B2 + B4, D5, G5, B5
      { bass: 110.00, treble: [440.00, 523.25, 659.25, 880.00] },  // A2 + A4, C5, E5, A5
      { bass: 87.31,  treble: [349.23, 440.00, 523.25, 698.46] },  // F2 + F4, A4, C5, F5
    ];

    let chordIndex = 0;
    let step = 0;

    const playStep = () => {
      if (!this.isBgmPlaying || !this.ctx || this.ctx.state !== 'running') return;

      const currentChord = chords[chordIndex % chords.length];
      const trebleNote = currentChord.treble[step % currentChord.treble.length];

      // Play soft bass pad on the first step of each chord
      if (step === 0) {
        try {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(currentChord.bass, this.ctx.currentTime);
          bassGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
          bassGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.6);
          bassOsc.connect(bassGain);
          bassGain.connect(this.ctx.destination);
          bassOsc.start();
          bassOsc.stop(this.ctx.currentTime + 1.6);
        } catch {
          // ignore
        }
      }

      // Play music box treble chime
      try {
        const trebleOsc = this.ctx.createOscillator();
        const trebleGain = this.ctx.createGain();
        trebleOsc.type = 'sine';
        trebleOsc.frequency.setValueAtTime(trebleNote, this.ctx.currentTime);
        trebleGain.gain.setValueAtTime(0.045, this.ctx.currentTime);
        trebleGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.65);
        trebleOsc.connect(trebleGain);
        trebleGain.connect(this.ctx.destination);
        trebleOsc.start();
        trebleOsc.stop(this.ctx.currentTime + 0.65);
      } catch {
        // ignore
      }

      step++;
      if (step >= 4) {
        step = 0;
        chordIndex++;
      }
    };

    playStep();
    this.bgmInterval = window.setInterval(playStep, 450);
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      window.clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.notifyStateChange();
  }
}

export const soundManager = new SoundManager();
