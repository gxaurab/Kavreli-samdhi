// Web Audio API Synthesizer for Kavreli Samdhi sound FX and Selo rhythm

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private engineGain: GainNode | null = null;
  private engineOsc: OscillatorNode | null = null;
  private isEngineRunning = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a classic Nepali Tipper / Bus Horn (Dual frequency air horn)
  playTipperHorn() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';

    // Classic twin tone truck horn frequencies (approx 370Hz and 460Hz)
    osc1.frequency.setValueAtTime(370, now);
    osc2.frequency.setValueAtTime(465, now);

    // Horn pitch bend like air pressure pulse
    osc1.frequency.exponentialRampToValueAtTime(355, now + 0.6);
    osc2.frequency.exponentialRampToValueAtTime(450, now + 0.6);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.05);
    gain.gain.setValueAtTime(0.35, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.75);
    osc2.stop(now + 0.75);
  }

  // Play Pulsar 220 Engine Rev sound
  playPulsarRev() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);

    // RPM rev up curve
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.3);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.8);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.8);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.95);
  }

  // Play a Damphu Drum Hit (traditional Tamang percussion)
  playDamphu(pitchModifier = 1) {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140 * pitchModifier, now);
    osc.frequency.exponentialRampToValueAtTime(45 * pitchModifier, now + 0.18);

    // Warm drum skin resonance snap
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Play Janti Whistle
  playWhistle() {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.linearRampToValueAtTime(2400, now + 0.15);
    osc.frequency.linearRampToValueAtTime(2200, now + 0.3);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.38);
  }

  private loopIntervalId: number | null = null;
  private isLooping = false;

  // Start continuous Tamang Selo melody & Damphu beat loop
  startSeloLoop(songTempo = 1) {
    this.initCtx();
    if (!this.ctx) return;

    this.stopSeloLoop();
    this.isLooping = true;

    // Immediately play first pattern
    this.playSeloMelody();

    // Loop every 2.4 seconds
    const interval = Math.max(1200, 2400 / songTempo);
    this.loopIntervalId = window.setInterval(() => {
      if (this.isLooping) {
        this.playSeloMelody();
      }
    }, interval);
  }

  // Stop continuous music loop
  stopSeloLoop() {
    this.isLooping = false;
    if (this.loopIntervalId !== null) {
      clearInterval(this.loopIntervalId);
      this.loopIntervalId = null;
    }
  }

  // Play "Paan Mitho Chunama" synth hook snippet
  playSeloMelody() {
    this.initCtx();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.15 }, // C5
      { f: 587.33, d: 0.15 }, // D5
      { f: 659.25, d: 0.25 }, // E5
      { f: 659.25, d: 0.15 },
      { f: 587.33, d: 0.15 },
      { f: 523.25, d: 0.3 },
      { f: 440.00, d: 0.2 },  // A4
      { f: 523.25, d: 0.4 },  // C5
    ];

    let startTime = this.ctx.currentTime;

    notes.forEach((note) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, startTime);

      gain.gain.setValueAtTime(0.25, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(startTime);
      osc.stop(startTime + note.d);

      // Add Damphu beat background on key notes
      if (note.f === 659.25 || note.f === 523.25) {
        this.playDamphu(1);
      }

      startTime += note.d + 0.05;
    });
  }

  // Continuous Highway Engine & Wind Rumble toggle
  toggleHighwayAmbience(enable: boolean) {
    this.initCtx();
    if (!this.ctx) return;

    if (enable && !this.isEngineRunning) {
      const now = this.ctx.currentTime;
      this.engineOsc = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(160, now);

      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(55, now); // Low RPM rumble

      this.engineGain.gain.setValueAtTime(0, now);
      this.engineGain.gain.linearRampToValueAtTime(0.08, now + 1);

      this.engineOsc.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc.start(now);
      this.isEngineRunning = true;
    } else if (!enable && this.isEngineRunning && this.engineGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.engineGain.gain.linearRampToValueAtTime(0, now + 0.5);
      setTimeout(() => {
        this.engineOsc?.stop();
        this.isEngineRunning = false;
      }, 550);
    }
  }
}

export const audioSynth = new SoundSynthesizer();
