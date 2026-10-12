// Procedural Audio Synthesizer for Antigravity Motion Design
// Generates clean 16-bit mono 44.1kHz WAV sound effects and soundtrack.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SR = 44100;
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sfx");
mkdirSync(OUT, { recursive: true });

function wav(samples) {
  const n = samples.length;
  const buf = Buffer.alloc(44 + n * 2);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 2, 4);
  buf.write("WAVE", 8);
  buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // Mono
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2);
  }
  return buf;
}

const secs = (s) => Math.round(s * SR);

// Deterministic noise generator
let seed = 42;
const rnd = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647 - 0.5;
};

// 1. Whoosh (sweeping lowpassed noise)
{
  const N = secs(0.4);
  const out = new Float32Array(N);
  let lp = 0;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const env = Math.sin(Math.PI * Math.pow(t, 0.7)) ** 2;
    const cutoff = 0.05 + 0.3 * Math.sin(Math.PI * t);
    lp += cutoff * (rnd() * 2 - lp);
    out[i] = lp * env * 0.9;
  }
  writeFileSync(join(OUT, "whoosh.wav"), wav(out));
}

// 2. Bass thump (low sub-bass hit)
{
  const N = secs(0.5);
  const out = new Float32Array(N);
  let phase = 0;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const f = 90 - 45 * t;
    phase += (2 * Math.PI * f) / SR;
    out[i] = Math.sin(phase) * Math.exp(-t * 5.5) * 0.95;
  }
  writeFileSync(join(OUT, "bass.wav"), wav(out));
}

// 3. Pop (quick bubbly click)
{
  const N = secs(0.12);
  const out = new Float32Array(N);
  let phase = 0;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const f = 750 - 450 * t;
    phase += (2 * Math.PI * f) / SR;
    out[i] = Math.sin(phase) * Math.exp(-t * 12) * 0.8;
  }
  writeFileSync(join(OUT, "pop.wav"), wav(out));
}

// 4. Tick (terminal key typing & counter blip)
{
  const N = secs(0.04);
  const out = new Float32Array(N);
  let phase = 0;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    phase += (2 * Math.PI * 2200) / SR;
    out[i] = Math.sin(phase) * Math.exp(-t * 22) * 0.6;
  }
  writeFileSync(join(OUT, "tick.wav"), wav(out));
}

// 5. Riser (exponential building tension)
{
  const N = secs(1.2);
  const out = new Float32Array(N);
  let phase = 0;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const f = 120 + 700 * (t ** 2.2);
    phase += (2 * Math.PI * f) / SR;
    const noise = rnd() * 0.35 * t;
    out[i] = (Math.sin(phase) * 0.65 + noise) * (t ** 1.5) * 0.85;
  }
  writeFileSync(join(OUT, "riser.wav"), wav(out));
}

// 6. Impact boom (climactic cinematic landing)
{
  const N = secs(0.9);
  const out = new Float32Array(N);
  let phase = 0;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const f = 65 - 35 * Math.min(1, t * 4);
    phase += (2 * Math.PI * f) / SR;
    const transient = rnd() * Math.exp(-t * 20) * 0.5;
    out[i] = (Math.sin(phase) * 0.85 + transient) * Math.exp(-t * 4) * 0.95;
  }
  writeFileSync(join(OUT, "impact.wav"), wav(out));
}

// 7. Full Electronic Background Soundtrack (15.5s @ 120 BPM)
{
  const DUR = 15.5;
  const N = Math.floor(SR * DUR);
  const out = new Float32Array(N);

  const add = (start, dur, fn) => {
    const s0 = Math.floor(start * SR);
    const n = Math.floor(dur * SR);
    for (let i = 0; i < n && s0 + i < N; i++) out[s0 + i] += fn(i / SR, i / n);
  };

  const kick = (t) =>
    add(t, 0.28, (ts, p) => {
      const f = 130 - 85 * Math.min(1, ts * 10);
      return Math.sin(2 * Math.PI * f * ts) * Math.exp(-p * 7) * 0.85;
    });

  const hat = (t) =>
    add(t, 0.04, (ts, p) => rnd() * 2 * Math.exp(-p * 12) * 0.12);

  const bass = (t, f, dur = 0.22) =>
    add(t, dur, (ts, p) => {
      const env = Math.min(1, ts * 80) * Math.exp(-p * 4.2);
      return (
        (Math.sin(2 * Math.PI * f * ts) + Math.sin(2 * Math.PI * f * 2 * ts) / 3.0) *
        env *
        0.32
      );
    });

  // Cosmic ambient pad drone (D minor / F / A chords)
  add(0, DUR, (ts, p) => {
    const attack = Math.min(1, ts / 1.5);
    const release = Math.min(1, (DUR - ts) / 1.5);
    const d1 = Math.sin(2 * Math.PI * 146.83 * ts); // D3
    const d2 = Math.sin(2 * Math.PI * 174.61 * ts); // F3
    const d3 = Math.sin(2 * Math.PI * 220.00 * ts); // A3
    const d4 = Math.sin(2 * Math.PI * 293.66 * ts); // D4
    return (d1 + d2 + d3 + d4) * 0.038 * attack * release;
  });

  const FPB = 0.5; // 120 BPM => 0.5s per beat

  // Kick groove:
  // Starts on terminal drop at 2.5s (beat 5) through 12.0s
  for (let b = 5; b <= 24; b++) {
    kick(b * FPB);
  }

  // Hi-hats on offbeats (2.75s to 12.0s)
  for (let b = 5; b < 24; b++) {
    hat(b * FPB + 0.25);
  }

  // Bassline progression (synced to 8th notes)
  const bassNotes = [73.42, 73.42, 87.31, 98.0, 73.42, 110.0, 87.31, 65.41]; // D2, F2, G2, A2
  for (let e = 20; e < 96; e++) {
    const t = e * 0.125;
    if (t >= 2.5 && t < 12.0) {
      bass(t, bassNotes[e % bassNotes.length], 0.11);
    }
  }

  // Climactic boom at Scene 5 entry (11.5s)
  add(11.5, 1.2, (ts, p) => {
    const f = 60 - 30 * Math.min(1, ts * 3);
    return Math.sin(2 * Math.PI * f * ts) * Math.exp(-p * 3.5) * 0.9;
  });

  // Normalize
  let peak = 0;
  for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(out[i]));
  const g = 0.88 / (peak || 1);
  for (let i = 0; i < N; i++) out[i] *= g;

  writeFileSync(join(OUT, "track.wav"), wav(out));
}

console.log("Procedural SFX and Track synthesized successfully in", OUT);
