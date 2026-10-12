// src/Root.tsx — Main Composition combining 5-Layer Stack, Scenes, and Synchronized Audio
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

import { BgMesh, Grade, Grain, Vignette, ZeroGParticles } from "./components/Layers";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Terminal } from "./scenes/Scene2Terminal";
import { Scene3Bento } from "./scenes/Scene3Bento";
import { Scene4Arsenal } from "./scenes/Scene4Arsenal";
import { Scene5CTA } from "./scenes/Scene5CTA";

// Load Google Fonts
loadDisplay("normal", { ignoreTooManyRequestsWarning: true });
loadBody("normal", { ignoreTooManyRequestsWarning: true });
loadMono("normal", { ignoreTooManyRequestsWarning: true });

export const FPS = 30;

// Scene Durations in Frames (derived strictly from 30 FPS)
export const SCENE_DURATIONS = {
  hook: 75,      // 0.0s – 2.5s
  terminal: 90,  // 2.5s – 5.5s
  bento: 90,     // 5.5s – 8.5s
  arsenal: 90,   // 8.5s – 11.5s
  cta: 105,      // 11.5s – 15.0s
};

export const TOTAL_FRAMES =
  SCENE_DURATIONS.hook +
  SCENE_DURATIONS.terminal +
  SCENE_DURATIONS.bento +
  SCENE_DURATIONS.arsenal +
  SCENE_DURATIONS.cta; // 450 frames = 15.0 seconds

const AntigravityPromo: React.FC = () => {
  const s1 = 0;
  const s2 = s1 + SCENE_DURATIONS.hook;
  const s3 = s2 + SCENE_DURATIONS.terminal;
  const s4 = s3 + SCENE_DURATIONS.bento;
  const s5 = s4 + SCENE_DURATIONS.arsenal;

  return (
    <AbsoluteFill style={{ backgroundColor: "#07080D" }}>
      {/* ================= LAYER 1: Background Mesh ================= */}
      <BgMesh />

      {/* ================= LAYER 2: Zero-G Particles ================= */}
      <ZeroGParticles count={36} />

      {/* ================= LAYER 3: Scene Sequences ================= */}
      <Sequence from={s1} durationInFrames={SCENE_DURATIONS.hook}>
        <Scene1Hook duration={SCENE_DURATIONS.hook} />
      </Sequence>

      <Sequence from={s2} durationInFrames={SCENE_DURATIONS.terminal}>
        <Scene2Terminal duration={SCENE_DURATIONS.terminal} />
      </Sequence>

      <Sequence from={s3} durationInFrames={SCENE_DURATIONS.bento}>
        <Scene3Bento duration={SCENE_DURATIONS.bento} />
      </Sequence>

      <Sequence from={s4} durationInFrames={SCENE_DURATIONS.arsenal}>
        <Scene4Arsenal duration={SCENE_DURATIONS.arsenal} />
      </Sequence>

      <Sequence from={s5} durationInFrames={SCENE_DURATIONS.cta}>
        <Scene5CTA duration={SCENE_DURATIONS.cta} />
      </Sequence>

      {/* ================= LAYER 4: Color Grade Overlay ================= */}
      <Grade />

      {/* ================= LAYER 5: Procedural Grain & Vignette ================= */}
      <Grain />
      <Vignette />

      {/* ================= SYNCHRONIZED AUDIO DESIGN ================= */}
      {/* 1. Main Electronic Bed */}
      <Audio src={staticFile("sfx/track.wav")} volume={0.32} />

      {/* 2. Scene 1 SFX */}
      <Sequence from={0}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.6} />
      </Sequence>
      <Sequence from={30}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.7} />
      </Sequence>

      {/* 3. Scene 2 Terminal Landing SFX (2 frames before visual landing) */}
      <Sequence from={s2 - 2}>
        <Audio src={staticFile("sfx/bass.wav")} volume={0.85} />
      </Sequence>
      {/* Typing ticks */}
      <Sequence from={s2 + 6}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={s2 + 14}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={s2 + 22}>
        <Audio src={staticFile("sfx/tick.wav")} volume={0.4} />
      </Sequence>

      {/* 4. Scene 3 Bento Transition SFX */}
      <Sequence from={s3 - 2}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.65} />
      </Sequence>
      <Sequence from={s3 + 6}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={s3 + 12}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>
      <Sequence from={s3 + 18}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.5} />
      </Sequence>

      {/* 5. Scene 4 Arsenal Transition & Riser */}
      <Sequence from={s4 - 2}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.65} />
      </Sequence>
      <Sequence from={s4 + 40}>
        <Audio src={staticFile("sfx/riser.wav")} volume={0.55} />
      </Sequence>

      {/* 6. Scene 5 Grand Finale Impact Boom */}
      <Sequence from={s5 - 2}>
        <Audio src={staticFile("sfx/impact.wav")} volume={0.9} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="AntigravityPromo"
        component={AntigravityPromo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
