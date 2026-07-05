# midnight-neporrex

> A scroll-driven 3D manifesto. Storm included. Built loud on a broken white background, with no apologies.

This is my take on the cinematic scroll-jacking thing SBS did with "The Boat", but stripped down and rebuilt with a stormy twist. Black ink on bone. Hard edges. No gradients. No rounded corners. A camera flies forward through six scenes while you scroll, the sky breaks open, lightning fires the text, a lighthouse beam sweeps the dark, code rain falls in the archive, and the cubes bend with the wind.

## what it is

A single-page Next.js site where:

- An epileptic warning overlay locks the page on first visit. Visitors accept or leave. The choice is remembered for the session.
- The 3D canvas is pinned to the viewport (position fixed) while a 700vh virtual scroll container does the work underneath.
- GSAP ScrollTrigger maps scroll progress (0 to 1) to the camera's Z position. The camera flies forward through a long corridor.
- Six scenes are stacked along the Z axis:
  1. **THE TITLE** - smaller, readable extruded 3D "MANIFESTO" text with floating cubes and accent bars. When lightning strikes elsewhere, a "FIRED BY THE STORM" text rises up beneath it.
  2. **THE STORM** - a wireframe water floor with waves, a wireframe ceiling, and cubes/spheres that get pushed around by wind. Storm clouds roll in, rain falls diagonally, lightning bolts crack open the sky, and a full-screen flash fires the text.
  3. **THE BEACON** (new) - a wireframe lighthouse tower with a rotating spotlight beam. Cubes orbit around it and only light up when the beam sweeps over them. Two ring guides on the floor.
  4. **RAW CREATION** - a glassmorphism brutalist panel slides in from the right while monospace letters swirl around in the 3D background.
  5. **THE ARCHIVE** (new) - matrix-style code rain. Vertical streams of glyphs fall and shuffle, with a typewriter quote that types and loops. Background shifts toward deep archive black.
  6. **THE DROP** - a giant black cube scales up to swallow the screen, then hands off to the contact footer.
- The navbar auto-hides when you scroll down and snaps back when you scroll up. The old "ONLINE" pill is gone.
- A thin gradient scroll progress bar on the right.
- Retro scanlines and a film grain overlay sit on top of everything for a vintage feel.
- Two human touches: a "NOW BUILDING" widget bottom-left that cycles through projects I am currently working on, and a "THOUGHT" ticker at the very bottom that rotates through short opinions about code.

## the stack

- **Next.js 16** (App Router, TypeScript)
- **React Three Fiber + @react-three/drei** for the 3D layer
- **GSAP ScrollTrigger** for the scroll-jacking
- **Tailwind CSS 4** for the overlay UI
- **three.js** under the hood (custom shaders for the water floor)

## design system

This time around I mixed five styles. They shouldn't work together, but they do.

- **Neo-brutalism** - the bones. Hard borders, solid shadows, zero radius.
- **Brutalism** - the typography. Massive Archivo Black headlines, raw JetBrains Mono labels.
- **Glassmorphism** - the navbar and the manifesto panel. Frosted, blurred, but still outlined in ink.
- **Doodle** - hand-drawn SVG underlines on key headlines. Slightly off, slightly human.
- **Retro** - scanlines and film grain over everything. CRT vibes.

### palette

Softer this time. The pure red/blue was killing eyes.

- Background: bone `#F5F1E8`
- Ink: deep black `#1A1A1A` (not pure black)
- Storm: deep navy `#1D3557`
- Fire: warm coral `#E76F51`
- Ember: amber `#F4A261`
- Sage: muted teal `#2A9D8F`
- Warning: red `#E63946` (used sparingly)

## run it locally

```bash
bun install
bun run dev
```

Then open http://localhost:3000 and scroll slowly. The storm kicks in around 20% scroll.

If you want to lint:

```bash
bun run lint
```

## how the scroll works

There's a single ScrollTrigger instance pinned to the tall virtual container. On every update it writes `progress` into a plain mutable object (`scrollState`). The R3F `useFrame` loop reads that same object every frame and lerps the camera's Z position toward the target. No React state, no re-renders, just a number flying between two systems.

Each scene has its own `useFrame` that fades itself in and out based on `smoothstep` windows over `progress`. So the title is visible from 0% to about 25%, the storm from 22% to 52%, the letters from 50% to 77%, and the drop from 72% to 100%.

## how the storm works

A second mutable object (`stormState`) holds `flashIntensity` and `strikeCount`. A `StormTrigger` component inside the Canvas decides when to fire lightning based on storminess (a smoothstep window over scroll progress). When it fires, it sets `flashIntensity` to ~1.0. The `useFrame` loop calls `decayFlash(dt)` every frame to bring it back to 0 over ~0.6s.

The `LightningOverlay` HTML component reads `stormState.flashIntensity` every rAF tick and writes directly to the DOM via refs (no React state, no re-renders). Three layered divs handle the flash: a flat white overlay, a soft top-down glow, and a warm coral wash at the bottom.

Inside the 3D scene, the `StormLight` point light also reads `flashIntensity` and brightens the clouds when lightning fires. And the `TitleScene` reads it too, scaling up the "FIRED BY THE STORM" text whenever the flash is active.

## file layout

```
src/
  app/
    globals.css         # tailwind + brutalist + glass + doodle + retro tokens
    layout.tsx          # fonts + metadata
    page.tsx            # the whole composition: canvas + scroll container + overlays
  components/
    scene3d/
      Scene3DCanvas.tsx # the pinned R3F Canvas, fog rig, camera rig (6 scenes), storm trigger
      ScrollSetup.tsx   # GSAP ScrollTrigger glue
      TitleScene.tsx    # scene 1: extruded 3D text + fire text reveal
      GridScene.tsx     # scene 2: water floor + wind-blown cubes
      StormScene.tsx    # clouds, lightning bolts, rain particles, storm light
      BeaconScene.tsx   # scene 3: lighthouse tower + rotating spotlight beam + swept cubes
      LettersScene.tsx  # scene 4: swirling monospace letters
      ArchiveScene.tsx  # scene 5: matrix code rain + typewriter quote
      DropScene.tsx     # scene 6: the giant scaling cube
    ui-overlay/
      Navbar.tsx        # glassmorphism, auto-hide on scroll
      ScrollProgress.tsx# thin gradient bar
      StickyPanel.tsx   # the glass "RAW CREATION" card
      ContactFooter.tsx # bio + stack + socials
      LightningOverlay.tsx # the HTML flash overlay
      EpilepticWarning.tsx # the seizure warning gate
      NowBuilding.tsx   # bottom-left widget, cycles through current projects
      ThoughtTicker.tsx # bottom ticker, rotates through short opinions
      Overlays.tsx      # retro scanlines + film grain
  lib/
    scroll-state.ts     # the shared mutable scroll object + helpers
    storm-state.ts      # the shared mutable storm object + lightning trigger
public/
  fonts/
    helvetiker_bold.typeface.json   # used by drei's Text3D
```

## me

I'm neporrex_. I work in HTML, CSS, JS, Roblox Lua, Python, Node and TypeScript. My main experience is in HTML, CSS, Lua, Python and TypeScript.

- GitHub: https://github.com/Neporrex
- X: https://x.com/neporrex_
- Discord: neporrex_

Inspired by SBS's "The Boat" scroll experience. The 3D scroll-jacking pattern is theirs. The storm, the fire, and the aesthetic are mine.
